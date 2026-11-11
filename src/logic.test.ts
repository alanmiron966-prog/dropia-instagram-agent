import { test } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { FLOWS, flowText, matchKeyword } from "./flows.ts";
import { validSignature } from "./index.ts";

test("detecta la palabra clave sin importar mayúsculas, tildes ni texto alrededor", () => {
  assert.equal(matchKeyword("Nube"), "NUBE");
  assert.equal(matchKeyword("quiero la nube 🙏"), "NUBE");
  assert.equal(matchKeyword("Tv"), "TV");
  assert.equal(matchKeyword("séguro"), "SEGURO");
  assert.equal(matchKeyword("televisión increíble"), null);
  assert.equal(matchKeyword("me encanta"), null);
  assert.equal(matchKeyword("Trafing"), "TRADING");
  assert.equal(matchKeyword("Tradibg"), "TRADING");
  assert.equal(matchKeyword("Nvidia"), "NVIDIA");
  assert.equal(matchKeyword("TVS"), null);
  assert.equal(matchKeyword("cliente"), "CLIENTES");
});

test("los DMs son cortos, saludan como DROPIA y cierran con las 3 opciones", () => {
  for (const [k, f] of Object.entries(FLOWS)) {
    const text = flowText(f);
    assert.ok(text.length <= 600, `${k}: DM demasiado largo (${text.length})`);
    assert.ok(text.startsWith("Buenas, por aquí DROPIA"), `${k}: saludo`);
    if (f.options) assert.ok(text.endsWith(`¿${f.options[0]}, ${f.options[1]} o ${f.options[2]}?`), `${k}: opciones`);
    else assert.ok(text.endsWith(f.hook), `${k}: cierre`);
  }
});

test("solo acepta webhooks firmados con el secreto de la app", async () => {
  const body = '{"entry":[]}';
  const sig = "sha256=" + createHmac("sha256", "secreto").update(body).digest("hex");
  assert.equal(await validSignature(body, sig, "secreto"), true);
  assert.equal(await validSignature(body, sig, "otro"), false);
  assert.equal(await validSignature(body + " ", sig, "secreto"), false);
  assert.equal(await validSignature(body, null, "secreto"), false);
});
