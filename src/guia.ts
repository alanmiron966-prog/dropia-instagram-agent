// Guías que el bot enlaza en los DMs de palabra clave (GET /guia/<clave>).
export const GUIAS: Record<string, string> = {
  anuncio: `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Anuncio animado con Claude · DROPIA</title>
<style>
body{font-family:system-ui,sans-serif;max-width:680px;margin:0 auto;padding:32px 16px 60px;line-height:1.6;color:#F2F4FA;background:#0A0D16}
h1{font-size:1.9rem;line-height:1.2;margin:0 0 8px}h1 em{color:#D97757;font-style:italic}
.sub{color:#8A93AB;margin:0 0 32px}
section{background:#151A28;border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:22px 22px 10px;margin:0 0 20px}
h2{font-size:1.2rem;margin:0 0 6px}.n{display:inline-flex;width:34px;height:34px;border-radius:17px;background:#D97757;color:#0A0D16;font-weight:800;align-items:center;justify-content:center;margin-right:10px}
code{background:#05070C;border:1px solid rgba(255,255,255,.1);border-radius:6px;padding:2px 7px;font-size:.95em;color:#F5B08F}
.prompt{background:#05070C;border:1px solid rgba(217,119,87,.5);border-radius:12px;padding:16px;white-space:pre-wrap;font-family:ui-monospace,monospace;font-size:.92rem;color:#F2F4FA}
button{margin:10px 0 14px;background:#D97757;color:#0A0D16;border:0;border-radius:8px;padding:10px 16px;font-weight:800;cursor:pointer}
ol{padding-left:20px}li{margin:0 0 8px}.ojo{color:#8A93AB;font-size:.92rem}
footer{margin-top:36px;color:#8A93AB;text-align:center}a{color:#D97757}
</style>
</head><body>
<h1>El anuncio de tu marca, <em>hecho con Claude</em></h1>
<p class="sub">Guía rápida de DROPIA · @drop_ia</p>

<section>
<h2><span class="n">1</span>Prepara Claude Code + Remotion</h2>
<p>Remotion convierte código en vídeo, y Claude Code escribe ese código por ti.</p>
<ol>
<li>Instala Claude Code (necesitas un plan de pago de Claude).</li>
<li>En una carpeta nueva ejecuta <code>npx create-video@latest</code> y elige la plantilla en blanco.</li>
<li>Abre Claude Code dentro de esa carpeta.</li>
</ol>
</section>

<section>
<h2><span class="n">2</span>Pega este prompt</h2>
<p>Cambia lo que está entre corchetes.</p>
<div class="prompt" id="p">Crea con Remotion un anuncio animado de 20 segundos en vertical (1080x1920) para mi marca [nombre], que [qué hace, en una frase].

Estructura, con un cambio de escena cada 2-3 segundos:
1. El problema de mi cliente: [problema], mostrado como tarjetas o notificaciones que caen y se acumulan.
2. Tres o cuatro palabras cortas que lo resumen, una a una.
3. Mi producto lo resuelve: un elemento de mi logo barre el caos y lo ordena.
4. Tres datos con contador animado: [dato 1], [dato 2], [dato 3].
5. El beneficio final en una frase: [beneficio].
6. Mi logo, grande, con el eslogan [eslogan].

Estilo: colores [hex principal] y [hex de acento], Inter para los titulares y una serif en cursiva para la palabra destacada. Animaciones con spring y easing suave, nada estático más de 2 segundos. Efectos de sonido en cada golpe y sin voz.

Cuando lo tengas, ábremelo en Remotion Studio para verlo.</div>
<button onclick="navigator.clipboard.writeText(document.getElementById('p').innerText);this.textContent='Copiado ✓'">Copiar prompt</button>
</section>

<section>
<h2><span class="n">3</span>Ajusta y exporta</h2>
<p>Pídele cambios en lenguaje normal ("más rápido", "cambia el color del fondo"). Para sacar el MP4: <code>npx remotion render</code>.</p>
</section>

<footer>¿Quieres un agente así para tu negocio? Escríbenos por DM a <a href="https://www.instagram.com/drop_ia/">@drop_ia</a></footer>
</body></html>`,
  cv: `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Claude te busca trabajo · DROPIA</title>
<style>
body{font-family:system-ui,sans-serif;max-width:680px;margin:0 auto;padding:32px 16px 60px;line-height:1.6;color:#F2F4FA;background:#0A0D16}
h1{font-size:1.9rem;line-height:1.2;margin:0 0 8px}h1 em{color:#D97757;font-style:italic}
.sub{color:#8A93AB;margin:0 0 32px}
section{background:#151A28;border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:22px 22px 10px;margin:0 0 20px}
h2{font-size:1.2rem;margin:0 0 6px}.n{display:inline-flex;width:34px;height:34px;border-radius:17px;background:#D97757;color:#0A0D16;font-weight:800;align-items:center;justify-content:center;margin-right:10px}
code{background:#05070C;border:1px solid rgba(255,255,255,.1);border-radius:6px;padding:2px 7px;font-size:.95em;color:#F5B08F}
.prompt{background:#05070C;border:1px solid rgba(217,119,87,.5);border-radius:12px;padding:16px;white-space:pre-wrap;font-family:ui-monospace,monospace;font-size:.92rem;color:#F2F4FA}
button{margin:10px 0 14px;background:#D97757;color:#0A0D16;border:0;border-radius:8px;padding:10px 16px;font-weight:800;cursor:pointer}
ol{padding-left:20px}li{margin:0 0 8px}.ojo{color:#8A93AB;font-size:.92rem}
footer{margin-top:36px;color:#8A93AB;text-align:center}a{color:#D97757}
</style>
</head><body>
<h1>Claude te busca trabajo <em>y te dice en cuál encajas</em></h1>
<p class="sub">Guía rápida de DROPIA · @drop_ia</p>

<section>
<h2><span class="n">1</span>Conecta Apify en Claude</h2>
<p>Apify es un servicio que saca datos de webs, como las ofertas de LinkedIn. Claude lo usa como herramienta.</p>
<ol>
<li>En Claude ve a <strong>Ajustes → Conectores → Añadir conector personalizado</strong>.</li>
<li>Pon de nombre <strong>Apify</strong> y de URL <code>https://mcp.apify.com</code>.</li>
<li>Pulsa conectar e inicia sesión (o créate una cuenta) en Apify.</li>
</ol>
<p class="ojo">Apify cobra por uso según lo que busques; mira su plan y sus precios antes de lanzar búsquedas grandes.</p>
</section>

<section>
<h2><span class="n">2</span>Adjunta tu CV y pega este prompt</h2>
<p>Cambia lo que está entre corchetes.</p>
<div class="prompt" id="p">Te adjunto mi CV. Usa Apify (el actor de LinkedIn Jobs) para buscar ofertas de [puesto] en [ciudad o remoto] publicadas en los últimos 7 días.

Compara cada oferta con mi CV y ponle una nota de encaje del 0 al 100, con una línea que explique por qué. Descarta las que pidan requisitos que claramente no cumplo.

Devuélveme una tabla ordenada de mayor a menor encaje con: puesto, empresa, ubicación, encaje, motivo y enlace para postular.</div>
<button onclick="navigator.clipboard.writeText(document.getElementById('p').innerText);this.textContent='Copiado ✓'">Copiar prompt</button>
</section>

<section>
<h2><span class="n">3</span>Elige y postula</h2>
<p>Revisa la tabla, abre los enlaces de las que más encajan y postula tú. Si quieres, pídele después a Claude que adapte tu CV o una carta a cada oferta.</p>
</section>

<footer>¿Quieres un agente así para tu negocio? Escríbenos por DM a <a href="https://www.instagram.com/drop_ia/">@drop_ia</a></footer>
</body></html>`,
  claude: `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>3 cosas para Claude Code · DROPIA</title>
<style>
body{font-family:system-ui,sans-serif;max-width:680px;margin:0 auto;padding:32px 16px 60px;line-height:1.6;color:#F2F4FA;background:#0A0D16}
h1{font-size:1.9rem;line-height:1.2;margin:0 0 8px}h1 em{color:#D97757;font-style:italic}
.sub{color:#8A93AB;margin:0 0 32px}
section{background:#151A28;border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:22px 22px 10px;margin:0 0 20px}
h2{font-size:1.2rem;margin:0 0 6px}.n{display:inline-flex;width:34px;height:34px;border-radius:17px;background:#D97757;color:#0A0D16;font-weight:800;align-items:center;justify-content:center;margin-right:10px}
code{background:#05070C;border:1px solid rgba(255,255,255,.1);border-radius:6px;padding:2px 7px;font-size:.95em;color:#F5B08F}
ol{padding-left:20px}li{margin:0 0 8px}.ojo{color:#8A93AB;font-size:.92rem}
footer{margin-top:36px;color:#8A93AB;text-align:center}a{color:#D97757}
</style>
</head><body>
<h1>Nunca uses Claude Code <em>sin estas 3 cosas</em></h1>
<p class="sub">Guía rápida de DROPIA · @drop_ia</p>

<section>
<h2><span class="n">1</span>Claude in Chrome: dale ojos</h2>
<p>Claude Code no ve tu pantalla. Con la extensión oficial de Anthropic puede abrir tu web en Chrome, hacer clic, rellenar formularios y comprobar que lo que ha construido funciona.</p>
<ol>
<li>Instala la extensión <strong>Claude</strong> (de Anthropic) desde la Chrome Web Store e inicia sesión con tu cuenta de Claude.</li>
<li>En Claude Code escribe <code>/chrome</code> para conectarlo con el navegador.</li>
<li>Pídele cosas como: "abre localhost:3000 y prueba el formulario de contacto".</li>
</ol>
<p class="ojo">Necesita un plan de pago de Claude.</p>
</section>

<section>
<h2><span class="n">2</span>/model: cuando llegas al límite</h2>
<p>Si un modelo se te queda sin uso, cambia a otro sin cerrar la sesión y sin perder la conversación.</p>
<ol>
<li>Dentro de Claude Code escribe <code>/model</code>.</li>
<li>Elige otro modelo con las flechas y pulsa Enter. La conversación sigue donde estaba.</li>
<li>Con <code>/usage</code> ves cuánto te queda.</li>
</ol>
<p class="ojo">Ojo: el límite de la sesión y el semanal son comunes a todos los modelos. Cambiar de modelo te salva cuando se acaba el de un modelo concreto.</p>
</section>

<section>
<h2><span class="n">3</span>Plugin frontend-design: que no parezca hecho con IA</h2>
<p>Es el plugin oficial de Anthropic para diseño. Hace que Claude piense la tipografía, la jerarquía y el estilo antes de escribir código, en vez de sacar la web morada de siempre.</p>
<ol>
<li>En Claude Code escribe <code>/plugin</code>.</li>
<li>Busca <strong>frontend-design</strong> en el marketplace oficial de Anthropic e instálalo.</li>
<li>No hay que llamarlo: se activa solo cuando le pides una web, una landing o un panel.</li>
</ol>
</section>

<footer>¿Quieres esto aplicado a tu negocio? Escríbenos por DM a <a href="https://www.instagram.com/drop_ia/">@drop_ia</a></footer>
</body></html>`,
};
