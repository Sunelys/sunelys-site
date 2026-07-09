#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const AIRTABLE_API_URL = "https://api.airtable.com/v0";

const args = process.argv.slice(2);
await loadEnvFile(".env");
await loadEnvFile(".env.local", { override: true });

const options = {
  apply: hasFlag("--apply"),
  dryRun: !hasFlag("--apply") && !hasFlag("--no-dry-run"),
  maxRecords: Number(getArgValue("--max") || process.env.MARKETING_LEADS_MAX_RECORDS || 5000),
  view: process.env.MARKETING_LEADS_VIEW || process.env.AIRTABLE_LEADS_VIEW || "",
  liveUrl: process.env.MARKETING_AGENT_LIVE_URL || "https://sunelys.fr",
};

const token = clean(process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_TOKEN || "");
const baseId = clean(process.env.AIRTABLE_BASE_ID || "");
const tableName = clean(process.env.AIRTABLE_LEADS_TABLE || "Leads");

if (!token || !baseId) {
  console.log("Missing configuration. Add AIRTABLE_API_KEY and AIRTABLE_BASE_ID.");
  process.exit(1);
}

const fieldMap = buildFieldMap();
const records = await fetchAirtableRecords({ token, baseId, tableName, view: options.view, maxRecords: options.maxRecords });
const schemaFieldNames = resolveSchemaFieldNames(records);

const updates = [];
const skipped = [];

for (const record of records) {
  const fields = record.fields ?? {};
  const read = (role) => readAirtableField(fields, fieldMap[role] ?? []);

  const message = clean(read("message"));
  const source = clean(read("source"));
  const sourceDetail = clean(read("leadSourceDetail"));
  const rawLanding = clean(read("landingPage")) || source || sourceDetail || "";
  const volume = clean(read("volume"));
  const need = clean(read("need"));
  const serviceField = clean(read("serviceInterest")) || need || extractContextValue(message, ["Service", "Besoin", "Need"]);
  const conversionField = clean(read("conversionType"));
  const blockedField = clean(read("blockedStage"));
  const leadStageField = clean(read("leadStage"));

  const inferredLandingPage = normalizeLandingPage(rawLanding, options.liveUrl);
  const inferredConversionType = conversionField || inferConversionType({
    source,
    sourceDetail,
    service: serviceField,
    message,
    leadStage: leadStageField,
  });
  const inferredService = inferServiceFromContext(serviceField, source, sourceDetail, inferredConversionType, message);
  const inferredBlocked = blockedField || inferBlockedStageFromContext({
    service: inferredService,
    source,
    sourceDetail,
    conversionType: inferredConversionType,
    message,
  });

  const payload = {};
  const current = {
    source: source,
    landingPage: clean(read("landingPage")),
    conversionType: conversionField,
    serviceInterest: clean(read("serviceInterest")),
    blockedStage: blockedField,
    leadStage: leadStageField,
  };

  const landingField = resolveWriteField(fieldMap.landingPage);
  const conversionWriteField = resolveWriteField(fieldMap.conversionType);
  const serviceWriteField = resolveWriteField(fieldMap.serviceInterest);
  const blockedWriteField = resolveWriteField(fieldMap.blockedStage);

  if (!current.landingPage && inferredLandingPage && inferredLandingPage !== "unknown" && landingField) {
    payload[landingField] = inferredLandingPage;
  }
  if (
    !current.conversionType &&
    inferredConversionType &&
    inferredConversionType !== "lead_form" &&
    conversionWriteField
  ) {
    payload[conversionWriteField] = inferredConversionType;
  }
  if (!current.serviceInterest && inferredService && inferredService !== "unknown" && serviceWriteField) {
    payload[serviceWriteField] = inferredService;
  }
  if (!current.blockedStage && inferredBlocked && inferredBlocked !== "unknown" && blockedWriteField) {
    payload[blockedWriteField] = inferredBlocked;
  }

  const leadId = clean(fields["Lead ID"]) || record.id;
  if (Object.keys(payload).length > 0) {
    updates.push({
      id: record.id,
      leadId: leadId || record.id,
      createdTime: record.createdTime,
      existing: current,
      inferred: {
        landingPage: inferredLandingPage,
        conversionType: inferredConversionType,
        serviceInterest: inferredService,
        blockedStage: inferredBlocked,
      },
      fields: payload,
    });
  } else {
    skipped.push({ id: record.id, leadId: leadId || record.id, note: "no inference needed" });
  }
}

console.log(`Fetched ${records.length} records.`);
console.log(`Inferable updates: ${updates.length}`);
console.log(`Skipped: ${skipped.length}`);

for (const row of updates.slice(0, 10)) {
  console.log("-", row.leadId, row.existing, "=>", row.inferred);
}

if (updates.length === 0) {
  process.exit(0);
}

if (!options.apply || options.dryRun) {
  console.log("Dry-run mode (no write). Use --apply to write to Airtable.");
  process.exit(0);
}

for (let index = 0; index < updates.length; index += 10) {
  const batch = updates.slice(index, index + 10);
  const response = await fetch(`${AIRTABLE_API_URL}/${baseId}/${encodeURIComponent(tableName)}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      records: batch.map((row) => ({
        id: row.id,
        fields: row.fields,
      })),
      typecast: true,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error(`Update batch failed: ${response.status}`, String(data.error?.message ?? JSON.stringify(data)).slice(0, 600));
    process.exit(1);
  }

  console.log(`Updated ${batch.length} record(s).`);
}

console.log("Lead normalization completed.");

function normalizeText(value) {
  return clean(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function clean(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeLandingPage(value, siteUrl) {
  const landingPage = clean(value);
  if (!landingPage) return "unknown";
  try {
    const url = landingPage.startsWith("http") ? new URL(landingPage) : new URL(landingPage, siteUrl);
    return url.pathname.replace(/\/$/, "") || "/";
  } catch {
    const withoutQuery = landingPage.split("?")[0];
    return withoutQuery.startsWith("/") ? withoutQuery : `/${withoutQuery.replace(/^\//, "")}`;
  }
}

function inferConversionType({ source, sourceDetail, service, message, leadStage }) {
  const signal = normalizeText(`${source} ${sourceDetail} ${service} ${message} ${leadStage}`);
  if (signal.includes("checklist") || signal.includes("lead-magnet")) return "checklist_download";
  if (signal.includes("quiz") || signal.includes("lead_confirmed") || signal.includes("quiz_submit")) return "quiz_submit";
  if (signal.includes("booking") || signal.includes("calendly") || signal.includes("rdv")) return "booking";
  if (signal.includes("phone") || signal.includes("telephone") || signal.includes("tel")) return "phone_click";
  if (signal.includes("email") || signal.includes("mail")) return "email_click";
  if (
    signal.includes("hero") ||
    signal.includes("sticky") ||
    signal.includes("contact") ||
    signal.includes("form") ||
    signal.includes("services") ||
    signal.includes("tarif") ||
    signal.includes("pilotage") ||
    signal.includes("consuel") ||
    signal.includes("raccordement") ||
    signal.includes("declaration") ||
    signal.includes("prealable")
  ) {
    return "form_contact";
  }
  return "lead_form";
}

function inferServiceFromContext(service, source, sourceDetail, conversionType, message) {
  const normalizedService = normalizeText(service);
  if (normalizedService) return service;

  const signal = normalizeText(`${source} ${sourceDetail} ${conversionType} ${message}`);
  if (signal.includes("consuel")) return "Consuel";
  if (signal.includes("raccordement") || signal.includes("enedis")) return "Raccordement";
  if (signal.includes("declaration") || signal.includes("prealable")) return "DP";
  if (signal.includes("quiz") || signal.includes("lead-magnet") || signal.includes("checklist")) return "Pilotage complet";
  if (signal.includes("tarif") || signal.includes("gestion") || signal.includes("administratif")) return "Pilotage complet";
  return "unknown";
}

function inferBlockedStageFromContext({ service, source, sourceDetail, conversionType, message }) {
  const signal = normalizeText(`${service} ${source} ${sourceDetail} ${conversionType} ${message}`);
  if (signal.includes("lead-magnet") || signal.includes("checklist") || signal.includes("lead_magnet")) return "Avant dépôt";
  if (signal.includes("quiz")) return "Pilotage global";
  if (normalizeText(service).includes("consuel")) return "Consuel à préparer";
  if (normalizeText(service).includes("raccordement") || normalizeText(service).includes("enedis")) return "Raccordement en attente";
  if (normalizeText(service).includes("declaration") || normalizeText(service).includes("prealable") || normalizeText(service).includes("dp")) return "Avant dépôt";
  if (signal.includes("pilotage") || signal.includes("gestion") || signal.includes("administratif")) return "Pilotage global";
  return "Pilotage global";
}

function resolveSchemaFieldNames(records) {
  const names = new Set();
  for (const record of records) {
    for (const fieldName of Object.keys(record.fields ?? {})) {
      names.add(fieldName);
    }
  }
  return names;
}

function resolveWriteField(candidates) {
  for (const candidate of candidates) {
    if (schemaFieldNames.has(candidate)) return candidate;
  }
  return "";
}

function extractContextValue(text, labels) {
  const value = clean(text);
  if (!value) return "";
  const labelPattern = labels.map((label) => escapeRegExp(label)).join("|");
  const match = value.match(new RegExp(`(?:^|\\|)\\s*(?:${labelPattern})\\s*:\\s*([^|]+)`, "i"));
  return clean(match?.[1] ?? "");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildFieldMap() {
  const byRole = {
    need: fieldCandidates("AIRTABLE_FIELD_NEED", ["Besoin", "Besoin principal", "Need"]),
    message: fieldCandidates("AIRTABLE_FIELD_MESSAGE", ["Message", "Commentaire"]),
    conversionType: fieldCandidates("AIRTABLE_FIELD_CONVERSION_TYPE", ["Type conversion", "Conversion type", "Conversion", "Type de conversion"]),
    leadStage: fieldCandidates("AIRTABLE_FIELD_LEAD_STAGE", ["Etape lead", "Étape lead", "Lead stage"]),
    blockedStage: fieldCandidates("AIRTABLE_FIELD_BLOCKED_STAGE", ["Etape bloquee", "Étape bloquée", "Etape administrative bloquee", "Étape administrative bloquée", "Blocage", "Blocage administratif", "Blocked stage"]),
    serviceInterest: fieldCandidates("AIRTABLE_FIELD_SERVICE_INTEREST", ["Service interesse", "Service intéressé", "Service interest", "Besoin principal"]),
    leadSourceDetail: fieldCandidates("AIRTABLE_FIELD_LEAD_SOURCE_DETAIL", ["Detail source", "Détail source"]),
    source: fieldCandidates("AIRTABLE_FIELD_SOURCE", ["Source"]),
    firstReferrer: fieldCandidates("AIRTABLE_FIELD_FIRST_REFERRER", ["Premier referrer", "First referrer"]),
    landingPage: fieldCandidates("AIRTABLE_FIELD_LANDING_PAGE", ["Landing page", "Page d'atterrissage"]),
    utmSource: fieldCandidates("AIRTABLE_FIELD_UTM_SOURCE", ["UTM source", "utm_source"]),
    utmMedium: fieldCandidates("AIRTABLE_FIELD_UTM_MEDIUM", ["UTM medium", "utm_medium"]),
    utmCampaign: fieldCandidates("AIRTABLE_FIELD_UTM_CAMPAIGN", ["UTM campaign", "utm_campaign"]),
    utmTerm: fieldCandidates("AIRTABLE_FIELD_UTM_TERM", ["UTM term", "utm_term"]),
    utmContent: fieldCandidates("AIRTABLE_FIELD_UTM_CONTENT", ["UTM content", "utm_content"]),
    gclid: fieldCandidates("AIRTABLE_FIELD_GCLID", ["GCLID", "gclid"]),
    fbclid: fieldCandidates("AIRTABLE_FIELD_FBCLID", ["FBCLID", "fbclid"]),
    msclkid: fieldCandidates("AIRTABLE_FIELD_MSCLKID", ["MSCLKID", "msclkid"]),
    volume: fieldCandidates("AIRTABLE_FIELD_VOLUME", ["Volume", "Volume mensuel", "Volume dossiers/mois"]),
  };

  const result = {};
  for (const [key, values] of Object.entries(byRole)) {
    result[key] = values.filter(Boolean);
  }
  return result;
}

function fieldCandidates(envName, fallbackNames) {
  const envValue = clean(process.env[envName] || "");
  const candidates = new Set();
  if (envValue) candidates.add(envValue);
  for (const name of fallbackNames) candidates.add(name);
  return [...candidates];
}

function readAirtableField(fields, candidates) {
  for (const candidate of candidates) {
    if (candidate && Object.prototype.hasOwnProperty.call(fields, candidate)) {
      return stringifyAirtableValue(fields[candidate]);
    }
  }
  const normalizedCandidates = new Set(candidates.map(normalizeKey).filter(Boolean));
  for (const [fieldName, value] of Object.entries(fields)) {
    if (normalizedCandidates.has(normalizeKey(fieldName))) {
      return stringifyAirtableValue(value);
    }
  }
  return "";
}

function normalizeKey(value) {
  return clean(value).toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function stringifyAirtableValue(value) {
  if (value == null) return "";
  if (typeof value === "string") return clean(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(stringifyAirtableValue).filter(Boolean).join(", ");
  if (typeof value === "object") {
    if (typeof value.name === "string") return value.name;
    if (typeof value.email === "string") return value.email;
    return JSON.stringify(value);
  }
  return String(value);
}

async function fetchAirtableRecords({ token, baseId, tableName, view, maxRecords }) {
  const records = [];
  let offset = "";
  do {
    const url = new URL(`${AIRTABLE_API_URL}/${baseId}/${encodeURIComponent(tableName)}`);
    url.searchParams.set("pageSize", "100");
    url.searchParams.set("maxRecords", String(maxRecords));
    if (view) url.searchParams.set("view", view);
    if (offset) url.searchParams.set("offset", offset);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(`Airtable API ${response.status}: ${JSON.stringify(data).slice(0, 600)}`);
    }

    records.push(...(data.records ?? []));
    offset = data.offset ?? "";
  } while (offset && records.length < maxRecords);

  return records.slice(0, maxRecords);
}

function hasFlag(name) {
  return args.includes(name);
}

function getArgValue(name) {
  const inline = args.find((arg) => arg.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
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
    const key = match[1];
    const value = unquote(match[2]);
    if (!override && process.env[key]) continue;
    process.env[key] = value;
  }
}

function unquote(value) {
  const trimmed = value.trim();
  if ((trimmed.startsWith("'") && trimmed.endsWith("'")) || (trimmed.startsWith('"') && trimmed.endsWith('"'))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}
