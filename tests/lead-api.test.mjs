import test from "node:test";
import assert from "node:assert/strict";
import { POST } from "../src/pages/api/leads.ts";

function formRequest(values) {
  const body = new FormData();
  for (const [key, value] of Object.entries(values)) body.set(key, value);
  return new Request("https://sunelys.fr/api/leads", { method: "POST", headers: { accept: "application/json" }, body });
}
const prospect = { email: "test@example.test", name: "Test Technique", need: "Raccordement Enedis + Consuel", conversion_type: "form_contact" };

test("lead API contract with mocked providers only", async (t) => {
  const originalEnv = { ...process.env };
  for (const key of Object.keys(process.env)) {
    if (/^(AIRTABLE_|RESEND_|LEAD_)/.test(key)) delete process.env[key];
  }
  Object.assign(process.env, { AIRTABLE_API_KEY: "test", AIRTABLE_BASE_ID: "test", RESEND_API_KEY: "test", LEAD_NOTIFICATION_WEBHOOK_URL: "", LEAD_ALERT_WEBHOOK_URL: "https://alert.example.test" });
  t.after(() => { for (const key of Object.keys(process.env)) if (!(key in originalEnv)) delete process.env[key]; Object.assign(process.env, originalEnv); });
  let calls = []; let emailStatus = 200;
  t.mock.method(globalThis, "fetch", async (url, init = {}) => {
    calls.push({ url: String(url), ...init });
    if (String(url).includes("api.airtable.com")) {
      if (init.method === "POST") return Response.json({ records: [{ id: "recTest" }] });
      if (init.method === "PATCH") return Response.json({ id: "recTest" });
      return Response.json({ fields: { Commentaire: "Note conservée\n[SUNELYS_NOTIFICATION pending T1]" } });
    }
    if (String(url).includes("api.resend.com")) return Response.json({ id: "mailTest" }, { status: emailStatus });
    if (String(url) === "https://alert.example.test") return Response.json({ ok: true });
    throw Error(`Unexpected network call: ${url}`);
  });
  await t.test("stores the lead, preserves combined offer, records provider acceptance", async () => {
    calls = [];
    const result = await POST({ request: formRequest(prospect) });
    assert.equal(result.status, 200);
    assert.deepEqual(await result.json(), { ok: true });
    const created = JSON.parse(calls.find(c => c.url.includes("airtable") && c.method === "POST").body);
    assert.match(created.records[0].fields.Commentaire, /Raccordement Enedis \+ Consuel/);
    assert.match(created.records[0].fields.Commentaire, /SUNELYS_NOTIFICATION pending/);
    const patch = JSON.parse(calls.find(c => c.method === "PATCH").body);
    assert.match(patch.fields.Commentaire, /Note conservée\n\[SUNELYS_NOTIFICATION email_accepted/);
  });
  await t.test("failed email keeps the lead and emits a separate warning", async () => {
    calls = []; emailStatus = 401;
    const result = await POST({ request: formRequest(prospect) });
    assert.equal(result.status, 200);
    assert.match(calls.find(c => c.method === "PATCH").body, /SUNELYS_NOTIFICATION failed/);
    assert.equal(JSON.parse(calls.find(c => c.url === "https://alert.example.test").body).event, "sunelys_lead_notification_unconfirmed");
  });
  await t.test("invalid email and honeypot never reach providers", async () => {
    calls = [];
    assert.equal((await POST({ request: formRequest({ email: "bad" }) })).status, 400);
    assert.equal((await POST({ request: formRequest({ ...prospect, website: "spam" }) })).status, 200);
    assert.equal(calls.length, 0);
  });
});
