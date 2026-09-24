import test from "node:test";
import assert from "node:assert/strict";
import { resolveLeadIntent, leadNeeds } from "../src/lib/lead-intent.mjs";
import { safeLeadRedirect, sendNotificationEmail, withNotificationStatus } from "../src/lib/lead-delivery.mjs";

test("pricing and combined offers preserve the visitor's choice", () => {
  for (const [source, expected] of [
    ["tarif_dp_complete", "Declaration prealable"],
    ["tarif_raccordement_consuel", "Raccordement Enedis + Consuel"],
    ["pack-maprimerenov-cee", "MaPrimeRenov + CEE"],
    ["tarif_pilotage_complet", "Pilotage complet"],
    ["edf-oa", "EDF OA – Compte et contrat d’achat"],
    ["unknown", ""],
  ]) assert.equal(resolveLeadIntent(source), expected);
  for (const [value] of leadNeeds) assert.equal(resolveLeadIntent(value), value);
});
test("confirmation redirects cannot leave Sunelys", () => {
  assert.equal(safeLeadRedirect("/merci?source=contact"), "https://sunelys.fr/merci?source=contact");
  for (const url of ["//evil.test", "javascript:alert(1)", "https://sunelys.fr.evil.test/merci", "/contact", null]) {
    assert.equal(safeLeadRedirect(url), "https://sunelys.fr/merci");
  }
});
test("notification state preserves the comment and replaces only the system marker", () => {
  const comment = "Client: conserver les pièces\nDeuxième ligne";
  const pending = withNotificationStatus(comment, "pending", "T1");
  assert.equal(withNotificationStatus(pending, "failed", "T2"), `${comment}\n[SUNELYS_NOTIFICATION failed T2]`);
});
const init = { method: "POST", headers: { "Idempotency-Key": "lead-test-123" }, body: "{}" };
test("transient failures retry with the same idempotency key", async () => {
  const calls = []; const statuses = [429, 503, 200];
  const response = await sendNotificationEmail("https://example.test", init, {
    request: async (_, options) => { calls.push(options); return new Response("{}", { status: statuses.shift() }); }, sleep: async () => {},
  });
  assert.equal(response.status, 200); assert.equal(calls.length, 3);
  assert.ok(calls.every((call) => call.headers["Idempotency-Key"] === "lead-test-123"));
});
test("permanent failures do not retry", async () => {
  let count = 0;
  const response = await sendNotificationEmail("https://example.test", init, {
    request: async () => { count++; return new Response("{}", { status: 401 }); }, sleep: async () => {},
  });
  assert.equal(response.status, 401); assert.equal(count, 1);
});
test("network failures are bounded", async () => {
  let count = 0;
  await assert.rejects(sendNotificationEmail("https://example.test", init, { request: async () => { count++; throw Error("offline"); }, sleep: async () => {} }), /offline/);
  assert.equal(count, 3);
});
test("email retry requires an idempotency key", async () => {
  await assert.rejects(sendNotificationEmail("https://example.test", {}), /idempotency/);
});
