#!/usr/bin/env node
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const AIRTABLE_API_URL = "https://api.airtable.com/v0";

await loadEnvFile(".env");
await loadEnvFile(".env.local", { override: true });

const token = clean(process.env.AIRTABLE_API_KEY ?? process.env.AIRTABLE_TOKEN ?? "");
const baseId = clean(process.env.AIRTABLE_BASE_ID ?? "");
const tableName = clean(process.env.AIRTABLE_LEADS_TABLE ?? "Leads");
const view = clean(process.env.MARKETING_LEADS_VIEW ?? process.env.AIRTABLE_LEADS_VIEW ?? "");

console.log("Airtable leads connection test");
console.log(`AIRTABLE_API_KEY: ${token ? "present" : "missing"}`);
console.log(`AIRTABLE_BASE_ID: ${baseId ? "present" : "missing"}`);
console.log(`AIRTABLE_LEADS_TABLE: ${tableName || "missing"}`);
console.log(`AIRTABLE_LEADS_VIEW: ${view || "not set"}`);

if (!token || !baseId || !tableName) {
  console.log("");
  console.log("Missing configuration. Add AIRTABLE_API_KEY, AIRTABLE_BASE_ID and AIRTABLE_LEADS_TABLE before running the full lead report.");
  process.exitCode = 1;
} else {
  await testAirtable();
}

async function testAirtable() {
  const url = new URL(`${AIRTABLE_API_URL}/${baseId}/${encodeURIComponent(tableName)}`);
  url.searchParams.set("pageSize", "5");
  url.searchParams.set("maxRecords", "5");
  if (view) url.searchParams.set("view", view);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.log("");
    console.log(`Airtable API failed: ${response.status}`);
    console.log(String(data.error?.message ?? JSON.stringify(data)).slice(0, 600));
    process.exitCode = 1;
    return;
  }

  const records = data.records ?? [];
  const fieldNames = Array.from(new Set(records.flatMap((record) => Object.keys(record.fields ?? {})))).sort();
  console.log("");
  console.log(`Connection: ok`);
  console.log(`Records visible in test page: ${records.length}`);
  console.log(`Detected field names: ${fieldNames.length ? fieldNames.join(", ") : "none on first records"}`);
  console.log("");
  console.log("No lead values, emails, names or phone numbers were printed.");
}

async function loadEnvFile(name, { override = false } = {}) {
  const file = path.join(ROOT, name);
  if (!existsSync(file)) return;

  const text = await readFile(file, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;
    if (!override && process.env[match[1]]) continue;
    process.env[match[1]] = unquoteEnvValue(match[2]);
  }
}

function unquoteEnvValue(value) {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function clean(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}
