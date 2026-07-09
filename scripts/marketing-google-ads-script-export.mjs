#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WEB_UPLOAD_DIR = path.join(ROOT, "docs/google-ads-web-upload");
const OUT_DIR = path.join(ROOT, "docs/google-ads-scripts");

const args = process.argv.slice(2);
const target = getArgValue("--target") || "campaigns";
const mode = getArgValue("--mode") || "preview";

if (!["campaigns", "ad-groups", "keywords", "responsive-search-ads"].includes(target)) {
  throw new Error(`Unknown target: ${target}`);
}
if (!["preview", "apply"].includes(mode)) {
  throw new Error(`Unknown mode: ${mode}`);
}

mkdirSync(OUT_DIR, { recursive: true });

const sourceFile = {
  campaigns: "01-campaigns.csv",
  "ad-groups": "02-ad-groups.csv",
  keywords: "03-keywords.csv",
  "responsive-search-ads": "04-responsive-search-ads.csv",
}[target];

const rows = parseCsv(readFileSync(path.join(WEB_UPLOAD_DIR, sourceFile), "utf8"));
const columns = Object.keys(rows[0] ?? {});
const outputFile = path.join(OUT_DIR, `${target}-${mode}.js`);
writeFileSync(outputFile, renderScript({ target, mode, columns, rows }));

console.log(
  JSON.stringify(
    {
      output: path.relative(ROOT, outputFile),
      target,
      mode,
      rows: rows.length,
      columns: columns.length,
    },
    null,
    2,
  ),
);

function renderScript({ target, mode, columns, rows }) {
  const action = mode === "apply" ? "apply" : "preview";
  return `/**
 * Sunelys Google Ads bulk ${mode}: ${target}.
 * Generated locally from docs/google-ads-web-upload.
 * This script calls upload.${action}().
 */
function main() {
  const columns = ${JSON.stringify(columns, null, 2)};
  const rows = ${JSON.stringify(rows, null, 2)};
  const upload = AdsApp.bulkUploads().newCsvUpload(columns, {
    moneyInMicros: false,
    fileLocale: 'en_US'
  });

  rows.forEach(function(row) {
    upload.append(row);
  });

  upload.forCampaignManagement();
  upload.${action}();
}
`;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (quoted) {
      if (char === "\"" && next === "\"") {
        value += "\"";
        index += 1;
      } else if (char === "\"") {
        quoted = false;
      } else {
        value += char;
      }
    } else if (char === "\"") {
      quoted = true;
    } else if (char === ",") {
      row.push(value);
      value = "";
    } else if (char === "\n") {
      row.push(value);
      rows.push(row);
      row = [];
      value = "";
    } else if (char !== "\r") {
      value += char;
    }
  }

  if (value || row.length > 0) {
    row.push(value);
    rows.push(row);
  }

  const [headers, ...body] = rows.filter((candidate) => candidate.some(Boolean));
  return body.map((candidate) => Object.fromEntries(headers.map((header, index) => [header, candidate[index] || ""])));
}

function getArgValue(name) {
  const inline = args.find((arg) => arg.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}
