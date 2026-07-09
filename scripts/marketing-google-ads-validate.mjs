#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const files = {
  assets: path.join(ROOT, "docs/google-ads-rsa-assets.csv"),
  keywords: path.join(ROOT, "docs/google-ads-search-keywords.csv"),
  negatives: path.join(ROOT, "docs/google-ads-negative-keywords.csv"),
};

const assets = parseCsv(readFileSync(files.assets, "utf8"));
const keywords = parseCsv(readFileSync(files.keywords, "utf8"));
const negatives = parseCsv(readFileSync(files.negatives, "utf8"));
const errors = [];

for (const [index, row] of assets.entries()) {
  for (const [key, value] of Object.entries(row)) {
    if (key.startsWith("headline_") && value.length > 30) {
      errors.push(`assets row ${index + 2}: ${key} has ${value.length}/30 characters: ${value}`);
    }
    if (key.startsWith("description_") && value.length > 90) {
      errors.push(`assets row ${index + 2}: ${key} has ${value.length}/90 characters: ${value}`);
    }
    if (key.startsWith("path_") && value.length > 15) {
      errors.push(`assets row ${index + 2}: ${key} has ${value.length}/15 characters: ${value}`);
    }
  }

  validateUrl(row.final_url, `assets row ${index + 2}`);
}

for (const [index, row] of keywords.entries()) {
  validateUrl(row.final_url, `keywords row ${index + 2}`);
  if (!["phrase", "exact"].includes(row.match_type)) {
    errors.push(`keywords row ${index + 2}: unexpected match_type "${row.match_type}"`);
  }
}

for (const [index, row] of negatives.entries()) {
  if (!["account", "campaign"].includes(row.level)) {
    errors.push(`negative row ${index + 2}: unexpected level "${row.level}"`);
  }
  if (!["phrase", "exact", "broad"].includes(row.match_type)) {
    errors.push(`negative row ${index + 2}: unexpected match_type "${row.match_type}"`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      validation: "ok",
      assets: assets.length,
      keywords: keywords.length,
      negatives: negatives.length,
    },
    null,
    2,
  ),
);

function validateUrl(value, label) {
  try {
    new URL(value);
  } catch {
    errors.push(`${label}: invalid final_url "${value}"`);
  }
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
