import Anthropic from "@anthropic-ai/sdk";
import { COMMENT_REPLY, FLOWS, flowText, matchKeyword } from "./flows.ts";
import { SYSTEM_PROMPT } from "./prompt.ts";
import { PRIVACY_HTML } from "./privacy.ts";
import { GUIAS } from "./guia.ts";

export interface Env {
  STATE: KVNamespace;
  IG_USER_ID: string;
  GRAPH_VERSION: string;
  CLAUDE_MODEL: string;
  VERIFY_TOKEN: string;
  META_APP_SECRET: string;
  IG_ACCESS_TOKEN: string;
  ANTHROPIC_API_KEY: string;
  ADMIN_KEY: string;
}

type Turn = { role: "user" | "assistant"; content: string };
const DAY = 86400;

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(req.url);

    // Meta exige una URL pública de privacidad y de eliminación de datos para publicar la app.
    if (req.method === "GET" && url.pathname === "/privacidad") {
      return new Response(PRIVACY_HTML, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }

    const guia = url.pathname.match(/^\/guia\/([a-z]+)$/)?.[1];
    if (req.method === "GET" && guia && GUIAS[guia]) {
      return new Response(GUIAS[guia], { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }

    // Vídeos y portadas de la cola: Instagram los descarga de aquí al publicar.
    const media = url.pathname.match(/^\/v\/([\w.-]+\.(mp4|jpg))$/);
    if (req.method === "GET" && media) {
      const data = await env.STATE.get(`media:${media[1]}`, "arrayBuffer");
      if (!data) return new Response("not found", { status: 404 });
      return new Response(data, { headers: { "Content-Type": media[2] === "mp4" ? "video/mp4" : "image/jpeg" } });
    }

    // Estado de la cola de publicación (solo con la clave de admin).
    if (url.pathname === "/admin/cola") {
      if (!env.ADMIN_KEY || req.headers.get("x-admin-key") !== env.ADMIN_KEY) return new Response("forbidden", { status: 403 });
      if (req.method === "PUT") {
        await env.STATE.put("cola", await req.text());
        ctx.waitUntil(publicarCola(env, url.origin).catch((e) => console.error("cola", e)));
      }
      return new Response((await env.STATE.get("cola")) ?? "[]", { headers: { "Content-Type": "application/json" } });
    }

    // Comentarios con palabra clave que el bot aún no ha contestado (GET lista, POST contesta).
    if (url.pathname === "/admin/pendientes") {
      if (!env.ADMIN_KEY || req.headers.get("x-admin-key") !== env.ADMIN_KEY) return new Response("forbidden", { status: 403 });
      const pend = await pendientes(env);
      if (req.method === "POST") {
        for (const p of pend) {
          try {
            await onComment(p, env);
            p.estado = "ok";
          } catch (e) {
            p.estado = String(e).slice(0, 300);
          }
        }
      }
      return Response.json(pend.map((p) => ({ user: p.from?.username, text: p.text, at: p.timestamp, estado: p.estado })));
    }

    // Verificación del webhook desde el panel de Meta.
    if (req.method === "GET") {
      const ok =
        url.searchParams.get("hub.mode") === "subscribe" &&
        url.searchParams.get("hub.verify_token") === env.VERIFY_TOKEN;
      return ok ? new Response(url.searchParams.get("hub.challenge")) : new Response("forbidden", { status: 403 });
    }
    if (req.method !== "POST") return new Response("ok");

    const raw = await req.text();
    if (!(await validSignature(raw, req.headers.get("x-hub-signature-256"), env.META_APP_SECRET))) {
      console.warn("bad signature");
      return new Response("bad signature", { status: 401 });
    }
    // Meta pide 200 rápido: el trabajo sigue en segundo plano.
    ctx.waitUntil(handle(JSON.parse(raw), env).catch((e) => console.error("handle", e)));
    return new Response("ok");
  },

  // Cron (wrangler.toml): publica los reels de la cola cuando les llega la hora.
  async scheduled(_ev: ScheduledController, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(publicarCola(env, "https://dropia-ig-bot.dropia.workers.dev"));
  },
};

// Cola de reels en KV ("cola"). prueba: true crea el contenedor y comprueba que Instagram lo procesa, sin publicar.
type Reel = {
  id: string;
  video: string;
  portada?: string;
  caption: string;
  at: string;
  prueba?: boolean;
  estado: "pendiente" | "creado" | "publicado" | "listo-prueba" | "error";
  contenedor?: string;
  media?: string;
  error?: string;
};

export async function publicarCola(env: Env, origen: string) {
  const cola: Reel[] = JSON.parse((await env.STATE.get("cola")) ?? "[]");
  let cambios = false;
  for (const r of cola) {
    try {
      if (r.estado === "pendiente" && Date.parse(r.at) <= Date.now()) {
        const c = await graph(env, `${env.IG_USER_ID}/media`, {
          media_type: "REELS",
          video_url: `${origen}/v/${r.video}`,
          ...(r.portada ? { cover_url: `${origen}/v/${r.portada}` } : {}),
          caption: r.caption,
          share_to_feed: true,
        });
        Object.assign(r, { estado: "creado", contenedor: c.id });
        cambios = true;
      } else if (r.estado === "creado" && r.contenedor) {
        const st = await graphGet(env, `${r.contenedor}?fields=status_code,status`);
        if (st.status_code === "FINISHED") {
          if (r.prueba) r.estado = "listo-prueba";
          else Object.assign(r, { estado: "publicado", media: (await graph(env, `${env.IG_USER_ID}/media_publish`, { creation_id: r.contenedor })).id });
          cambios = true;
        } else if (st.status_code === "ERROR" || st.status_code === "EXPIRED") {
          Object.assign(r, { estado: "error", error: st.status ?? st.status_code });
          cambios = true;
        }
      }
    } catch (e) {
      Object.assign(r, { estado: "error", error: String(e).slice(0, 500) });
      cambios = true;
    }
  }
  if (cambios) await env.STATE.put("cola", JSON.stringify(cola));
}

export async function validSignature(raw: string, header: string | null, secret: string): Promise<boolean> {
  if (!header?.startsWith("sha256=")) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(raw)));
  const expected = [...mac].map((b) => b.toString(16).padStart(2, "0")).join("");
  const given = header.slice(7);
  if (given.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ given.charCodeAt(i);
  return diff === 0;
}

async function handle(body: any, env: Env) {
  for (const entry of body.entry ?? []) {
    for (const change of entry.changes ?? []) {
      if (change.field === "comments") await onComment(change.value, env);
    }
    for (const m of entry.messaging ?? []) await onMessage(m, env);
  }
}

// Comentario con palabra clave: primero el DM, después la respuesta pública.
async function onComment(c: any, env: Env) {
  if (!c?.id || c.from?.id === env.IG_USER_ID) return;
  const keyword = matchKeyword(c.text ?? "");
  if (!keyword || !(await firstTime(env, `c:${c.id}`))) return;

  await sendDM(env, { comment_id: c.id }, { text: flowText(FLOWS[keyword]) });
  await env.STATE.put(`origin:${c.from.id}`, keyword, { expirationTtl: 30 * DAY });
  await graph(env, `${c.id}/replies`, { message: COMMENT_REPLY });
}

async function onMessage(m: any, env: Env) {
  const msg = m.message;
  if (!msg?.mid) return;

  // Eco de un mensaje nuestro: si no lo mandó el bot, lo escribió una persona -> el bot se calla 24 h.
  if (msg.is_echo) {
    if (!(await env.STATE.get(`sent:${msg.mid}`))) {
      await env.STATE.put(`pause:${m.recipient.id}`, "1", { expirationTtl: DAY });
    }
    return;
  }
  if (!msg.text || !(await firstTime(env, `m:${msg.mid}`))) return;

  const user = m.sender.id;
  if (await env.STATE.get(`pause:${user}`)) return;

  // Primera respuesta tras el DM de la palabra clave = el dolor que eligió.
  const origin = await env.STATE.get(`origin:${user}`);
  if (origin && !(await env.STATE.get(`lead:${user}`))) {
    await env.STATE.put(`lead:${user}`, JSON.stringify({ origin, dolor: msg.text, at: Date.now() }), {
      expirationTtl: 30 * DAY,
    });
  }

  // Derecho de borrado prometido en /privacidad.
  if (msg.text.trim().toUpperCase() === "BORRAR") {
    await Promise.all(["h", "origin", "lead"].map((k) => env.STATE.delete(`${k}:${user}`)));
    await sendDM(env, { id: user }, { text: "Listo, hemos borrado tus datos de nuestro asistente." });
    return;
  }

  // Sin clave de Claude los DMs libres los contesta el equipo a mano.
  if (!env.ANTHROPIC_API_KEY) return;

  const history: Turn[] = JSON.parse((await env.STATE.get(`h:${user}`)) ?? "[]");
  history.push({ role: "user", content: msg.text });

  const reply = await askClaude(env, history, await contextFor(env, user));
  if (!reply) return;

  history.push({ role: "assistant", content: reply });
  await env.STATE.put(`h:${user}`, JSON.stringify(history.slice(-20)), { expirationTtl: 30 * DAY });
  await sendDM(env, { id: user }, { text: reply });
}

async function contextFor(env: Env, user: string): Promise<string> {
  const origin = await env.STATE.get(`origin:${user}`);
  const lead = await env.STATE.get(`lead:${user}`);
  return `Contexto de esta persona: ${origin ? `llegó comentando ${origin}` : "escribió directamente"}.${
    lead ? ` Dolor elegido: ${JSON.parse(lead).dolor}.` : ""
  }`;
}

async function askClaude(env: Env, history: Turn[], context: string): Promise<string | null> {
  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  const res = await client.beta.messages.create({
    model: env.CLAUDE_MODEL,
    max_tokens: 4000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "low" },
    system: `${SYSTEM_PROMPT}\n\n${context}`,
    messages: history,
  });
  if (res.stop_reason === "refusal") return null;
  const text = res.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("\n").trim();
  return text || null;
}

async function sendDM(env: Env, recipient: Record<string, string>, message: Record<string, unknown>) {
  const res = await graph(env, `${env.IG_USER_ID}/messages`, { recipient, message });
  if (res.message_id) await env.STATE.put(`sent:${res.message_id}`, "1", { expirationTtl: DAY });
}

async function graph(env: Env, path: string, body: unknown): Promise<any> {
  const res = await fetch(`https://graph.instagram.com/${env.GRAPH_VERSION}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.IG_ACCESS_TOKEN}` },
    body: JSON.stringify(body),
  });
  const json: any = await res.json();
  if (!res.ok) throw new Error(`Graph ${path} ${res.status}: ${JSON.stringify(json)}`);
  return json;
}

async function graphGet(env: Env, path: string): Promise<any> {
  const res = await fetch(`https://graph.instagram.com/${env.GRAPH_VERSION}/${path}`, {
    headers: { Authorization: `Bearer ${env.IG_ACCESS_TOKEN}` },
  });
  const json: any = await res.json();
  if (!res.ok) throw new Error(`Graph GET ${path} ${res.status}: ${JSON.stringify(json)}`);
  return json;
}

// Comentarios de los últimos 3 días con palabra clave y sin procesar (la marca c: de firstTime dura 3 días).
async function pendientes(env: Env): Promise<any[]> {
  const desde = Date.now() - 3 * DAY * 1000;
  const media = await graphGet(env, `${env.IG_USER_ID}/media?fields=id,timestamp&limit=15`);
  const out: any[] = [];
  for (const m of media.data ?? []) {
    const cs = await graphGet(env, `${m.id}/comments?fields=id,text,timestamp,from&limit=100`);
    for (const c of cs.data ?? []) {
      if (Date.parse(c.timestamp) < desde || c.from?.id === env.IG_USER_ID) continue;
      if (matchKeyword(c.text ?? "") && !(await env.STATE.get(`c:${c.id}`))) out.push(c);
    }
  }
  return out;
}

// Meta reintenta envíos: solo procesamos cada evento una vez.
async function firstTime(env: Env, key: string): Promise<boolean> {
  if (await env.STATE.get(key)) return false;
  await env.STATE.put(key, "1", { expirationTtl: 3 * DAY });
  return true;
}
