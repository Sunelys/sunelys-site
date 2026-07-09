#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "docs/google-ads-web-upload");
const KEYWORDS_PATH = path.join(ROOT, "docs/google-ads-search-keywords.csv");
const ASSETS_PATH = path.join(ROOT, "docs/google-ads-rsa-assets.csv");
const NEGATIVES_PATH = path.join(ROOT, "docs/google-ads-negative-keywords.csv");
const DEFAULT_DAILY_BUDGET_TOTAL = 10;
const DEFAULT_MAX_CPC = "1.50";
const CAMPAIGN_BUDGET_WEIGHTS = new Map([
  ["search_pilotage_admin_pv", 4],
  ["search_sous_traitance_dp", 3],
  ["search_consuel_raccordement", 3],
]);

const args = process.argv.slice(2);

const keywords = parseCsv(readFileSync(KEYWORDS_PATH, "utf8"));
const assets = parseCsv(readFileSync(ASSETS_PATH, "utf8"));
const negatives = parseCsv(readFileSync(NEGATIVES_PATH, "utf8"));

mkdirSync(OUT_DIR, { recursive: true });

const dailyBudgetTotal = positiveNumber(
  getArgValue("--daily-budget-total") ||
    process.env.MARKETING_ADS_DAILY_BUDGET_TOTAL ||
    DEFAULT_DAILY_BUDGET_TOTAL,
);
const campaignNames = [...new Set(keywords.map((row) => row.campaign))];
const campaignBudgets = splitDailyBudget(campaignNames, dailyBudgetTotal);

const campaignRows = campaignNames.map((campaign) => ({
  Action: "Add",
  "Campaign status": "Paused",
  Campaign: campaign,
  "Campaign type": "Search",
  Networks: "Google Search",
  Budget: formatBudget(campaignBudgets.get(campaign) ?? 0),
  "Budget type": "Daily",
  "Bid strategy type": "Manual CPC",
  Language: "fr",
  Location: "France",
  "Final URL suffix": finalUrlSuffixForCampaign(campaign),
  Label: "Sunelys lead gen test 10eur daily",
}));

const adGroupRows = [
  ...new Map(
    keywords.map((row) => [
      `${row.campaign}|||${row.ad_group}`,
      {
        Action: "Add",
        Campaign: row.campaign,
        "Ad group": row.ad_group,
        Status: "Paused",
      },
    ]),
  ).values(),
];

const keywordRows = keywords.map((row) => ({
  Action: "Add",
  "Keyword status": "Paused",
  Campaign: row.campaign,
  "Ad group": row.ad_group,
  Keyword: row.keyword,
  "Match Type": toBulkMatchType(row.match_type),
  "Default max. CPC": DEFAULT_MAX_CPC,
  "Final URL": withUtm(row.final_url, {
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: row.utm_campaign,
    utm_content: slugify(row.ad_group),
  }),
  Label: row.intent,
}));

const rsaRows = assets.map((row) => ({
  Action: "Add",
  "Ad status": "Paused",
  Campaign: row.campaign,
  "Ad group": row.ad_group,
  "Ad type": "Responsive search ad",
  "Headline 1": row.headline_1,
  "Headline 2": row.headline_2,
  "Headline 3": row.headline_3,
  "Headline 4": row.headline_4,
  "Headline 5": row.headline_5,
  "Headline 6": row.headline_6,
  "Headline 7": row.headline_7,
  "Headline 8": row.headline_8,
  "Headline 9": row.headline_9,
  "Headline 10": row.headline_10,
  Description: row.description_1,
  "Description 2": row.description_2,
  "Description 3": row.description_3,
  "Description 4": row.description_4,
  "Path 1": row.path_1,
  "Path 2": row.path_2,
  "Final URL": withUtm(row.final_url, {
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: campaignSlug(row.campaign),
    utm_content: "rsa_diagnostic",
  }),
  Label: "Diagnostic dossiers bloques",
}));

const negativeKeywordLines = [
  "# Paste these negative keywords before enabling campaigns.",
  "# Google Ads path: Campaigns > Audiences, keywords and content > Search keywords > Negative keywords.",
  "# One keyword per line:",
  "",
  ...negatives.map((row) => row.keyword),
  "",
];

writeCsv(path.join(OUT_DIR, "01-campaigns.csv"), campaignRows);
writeCsv(path.join(OUT_DIR, "02-ad-groups.csv"), adGroupRows);
writeCsv(path.join(OUT_DIR, "03-keywords.csv"), keywordRows);
writeCsv(path.join(OUT_DIR, "04-responsive-search-ads.csv"), rsaRows);
writeFileSync(path.join(OUT_DIR, "05-negative-keywords-paste.txt"), negativeKeywordLines.join("\n"));
writeFileSync(
  path.join(OUT_DIR, "README.md"),
  renderReadme({
    campaignRows,
    adGroupRows,
    keywordRows,
    rsaRows,
    negatives,
    dailyBudgetTotal,
    campaignBudgets,
  }),
);

console.log(
  JSON.stringify(
    {
      output: path.relative(ROOT, OUT_DIR),
      dailyBudgetTotal: formatBudget(dailyBudgetTotal),
      campaignBudgets: Object.fromEntries(
        campaignNames.map((campaign) => [campaign, formatBudget(campaignBudgets.get(campaign) ?? 0)]),
      ),
      campaigns: campaignRows.length,
      adGroups: adGroupRows.length,
      keywords: keywordRows.length,
      responsiveSearchAds: rsaRows.length,
      negativeKeywords: negatives.length,
    },
    null,
    2,
  ),
);

function renderReadme({ campaignRows, adGroupRows, keywordRows, rsaRows, negatives, dailyBudgetTotal, campaignBudgets }) {
  const budgetLines = campaignRows.map((row) => `- ${row.Campaign}: ${formatBudget(campaignBudgets.get(row.Campaign) ?? 0)} EUR / jour`);
  return `# Google Ads web upload - Sunelys

Ces fichiers sont prepares pour l'import Google Ads via l'interface web Bulk Upload.
Ils restent en pause par defaut.

Budget valide: ${formatBudget(dailyBudgetTotal)} EUR / jour au total.

${budgetLines.join("\n")}

Ordre conseille:

1. Importer \`01-campaigns.csv\`, puis cliquer sur Preview.
2. Importer \`02-ad-groups.csv\`, puis cliquer sur Preview.
3. Importer \`03-keywords.csv\`, puis cliquer sur Preview.
4. Importer \`04-responsive-search-ads.csv\`, puis cliquer sur Preview.
5. Coller les negatifs de \`05-negative-keywords-paste.txt\`.
6. Ne passer en Enabled qu'apres verification conversion + facturation.

Volumes:

- Campagnes: ${campaignRows.length}
- Groupes d'annonces: ${adGroupRows.length}
- Mots-cles: ${keywordRows.length}
- Annonces responsives Search: ${rsaRows.length}
- Mots-cles negatifs: ${negatives.length}
`;
}

function campaignSlug(campaign) {
  if (campaign.includes("Pilotage")) return "search_pilotage_admin_pv";
  if (campaign.includes("Sous-traitance")) return "search_sous_traitance_dp";
  if (campaign.includes("Consuel")) return "search_consuel_raccordement";
  return slugify(campaign);
}

function finalUrlSuffixForCampaign(campaign) {
  return `utm_source=google&utm_medium=cpc&utm_campaign=${campaignSlug(campaign)}&utm_content={creative}&utm_term={keyword}`;
}

function splitDailyBudget(campaigns, total) {
  const centsTotal = Math.round(total * 100);
  const weights = campaigns.map((campaign) => CAMPAIGN_BUDGET_WEIGHTS.get(campaignSlug(campaign)) ?? 1);
  const weightTotal = weights.reduce((sum, weight) => sum + weight, 0) || campaigns.length || 1;
  const budgets = new Map();
  let allocatedCents = 0;

  campaigns.forEach((campaign, index) => {
    const cents =
      index === campaigns.length - 1
        ? centsTotal - allocatedCents
        : Math.round((centsTotal * weights[index]) / weightTotal);
    allocatedCents += cents;
    budgets.set(campaign, cents / 100);
  });

  return budgets;
}

function positiveNumber(value) {
  const number = Number.parseFloat(String(value).replace(",", "."));
  return Number.isFinite(number) && number > 0 ? number : DEFAULT_DAILY_BUDGET_TOTAL;
}

function formatBudget(value) {
  return Number(value).toFixed(2).replace(/\.00$/, "");
}

function toBulkMatchType(value) {
  const normalized = String(value || "").toLowerCase();
  if (normalized === "exact") return "Exact match";
  if (normalized === "phrase") return "Phrase match";
  if (normalized === "broad") return "Broad match";
  return value;
}

function withUtm(rawUrl, params) {
  const url = new URL(rawUrl);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function writeCsv(filePath, rows) {
  const headers = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  const lines = [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header] ?? "")).join(",")),
  ];
  writeFileSync(filePath, `${lines.join("\n")}\n`);
}

function csvEscape(value) {
  const stringValue = String(value);
  if (!/[",\n]/.test(stringValue)) return stringValue;
  return `"${stringValue.replace(/"/g, "\"\"")}"`;
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
