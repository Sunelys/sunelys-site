#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);

const options = {
  input: getArgValue("--input") || getArgValue("-i"),
  output: getArgValue("--output") || getArgValue("-o"),
  minScore: Number(getArgValue("--min-score") || 65),
};

if (!options.input) {
  console.error("Usage: npm run prospecting:score-ocean -- --input path/to/ocean-export.csv");
  process.exit(1);
}

const inputPath = path.resolve(ROOT, options.input);
const csv = await readFile(inputPath, "utf8");
const { headers, rows } = parseCsv(csv);
const scored = rows.map(scoreRow);

const outputPath = options.output
  ? path.resolve(ROOT, options.output)
  : path.join(
      ROOT,
      "outputs",
      "prospecting-score",
      `${path.basename(inputPath, path.extname(inputPath))}-scored.csv`,
    );

await mkdir(path.dirname(outputPath), { recursive: true });
const outputHeaders = [
  ...headers,
  "sunelys_score",
  "sunelys_tier",
  "sunelys_decision",
  "sunelys_angle",
  "sunelys_reason",
  "sunelys_campaign",
];
await writeFile(
  outputPath,
  stringifyCsv(outputHeaders, scored.map(({ row, qualification }) => ({ ...row, ...qualification }))),
);

const summary = summarize(scored);
console.log(`Scored ${rows.length} prospect(s).`);
console.log(`A-fit: ${summary.A} | B-fit: ${summary.B} | C-fit: ${summary.C} | Exclude: ${summary.Exclude}`);
console.log(`Recommended for first Waalaxy test (score >= ${options.minScore}): ${summary.recommended}`);
console.log(`Output: ${path.relative(ROOT, outputPath)}`);

function scoreRow(row) {
  const candidate = extractCandidate(row);
  const facts = buildFacts(candidate);
  const hardExclusions = getHardExclusions(candidate, facts);

  const companyFit = scoreCompanyFit(candidate, facts);
  const roleFit = scoreRoleFit(candidate, facts);
  const sizeFit = scoreSizeFit(candidate, facts);
  const geoFit = scoreGeoFit(candidate, facts);
  const dataFit = scoreDataFit(candidate, facts);
  const signalFit = scoreSignalFit(candidate, facts);
  const score = clamp(companyFit + roleFit + sizeFit + geoFit + dataFit + signalFit, 0, 100);

  const tier = hardExclusions.length
    ? "Exclude"
    : score >= 80
      ? "A"
      : score >= 65
        ? "B"
        : score >= 50
          ? "C"
          : "Exclude";

  const decision = tier === "A" || tier === "B"
    ? "keep_for_test"
    : tier === "C"
      ? "manual_review"
      : "do_not_contact";

  const angle = chooseAngle(candidate, facts, tier);
  const campaign = tier === "A" || tier === "B"
    ? "Dirigeants PV - test qualifie"
    : "Hors campagne V1";

  const reasonParts = [
    hardExclusions.length ? `exclusion: ${hardExclusions.join("; ")}` : "",
    `role=${roleFit}/25`,
    `company=${companyFit}/30`,
    `size=${sizeFit}/15`,
    `geo=${geoFit}/10`,
    `data=${dataFit}/10`,
    `signal=${signalFit}/10`,
  ].filter(Boolean);

  return {
    row,
    qualification: {
      sunelys_score: String(score),
      sunelys_tier: tier,
      sunelys_decision: decision,
      sunelys_angle: angle,
      sunelys_reason: reasonParts.join(" | "),
      sunelys_campaign: campaign,
    },
  };
}

function extractCandidate(row) {
  const read = (...names) => readField(row, names);
  return {
    name: read("name", "full name", "person name", "person fullname", "contact name", "first name"),
    firstName: read("first name", "firstname", "person first name", "prenom", "prénom"),
    lastName: read("last name", "lastname", "person last name", "nom"),
    title: read("job title", "title", "person title", "position", "headline", "role"),
    company: read("company", "company name", "companyname", "account", "organization", "organisation"),
    website: read("website", "company website", "companywebsite", "domain", "company domain", "url"),
    linkedin: read("linkedin", "linkedin url", "person linkedin", "person linkedin url", "profile url"),
    companyLinkedin: read("company linkedin", "company linkedin url"),
    email: read("email", "person email", "email address", "work email"),
    phone: read("phone", "person phone", "phone number", "mobile", "mobile phone"),
    country: read("country", "company country", "headquarter country", "hq country", "location country"),
    location: read("location", "person location", "company location", "headquarter location", "hq location"),
    size: read("employees", "employee count", "company size", "size", "headcount", "number of employees"),
    industry: read("industry", "industries", "ocean industry", "company industry"),
    description: read(
      "description",
      "person description",
      "company description",
      "company keywords",
      "about",
      "bio",
    ),
  };
}

function buildFacts(candidate) {
  const text = normalize(
    [
      candidate.name,
      candidate.title,
      candidate.company,
      candidate.website,
      candidate.industry,
      candidate.description,
      candidate.location,
      candidate.country,
    ].join(" "),
  );
  return {
    text,
    title: normalize(candidate.title),
    company: normalize(candidate.company),
    domain: normalize(candidate.website),
    location: normalize(`${candidate.country} ${candidate.location}`),
    size: parseCompanySize(candidate.size),
  };
}

function getHardExclusions(candidate, facts) {
  const reasons = [];
  const nonDecisionTitles = [
    "responsable administratif",
    "responsable administrative",
    "directeur administratif",
    "directrice administrative",
    "daf",
    "finance",
    "financier",
    "financiere",
    "comptable",
    "assistant",
    "assistante",
    "office manager",
    "ressources humaines",
    "rh",
    "marketing",
    "communication",
    "responsable d'affaires",
    "responsable affaires",
    "charge d'affaires",
    "chargee d'affaires",
    "charge de projet",
    "chargee de projet",
    "chef de projet",
    "cheffe de projet",
    "project manager",
    "conducteur de travaux",
    "conductrice de travaux",
    "responsable travaux",
    "responsable operations",
    "responsable operationnel",
    "responsable operationnelle",
    "directeur commercial",
    "directrice commerciale",
    "responsable commercial",
    "business developer",
    "account manager",
    "key account",
    "sales",
    "commercial",
    "technicien",
  ];
  const hasNonDecisionTitle = nonDecisionTitles.some((term) => facts.title.includes(term));
  if (hasNonDecisionTitle && (!hasOwnerRole(facts.title) || !hasPvInstallerSignal(facts.text))) {
    reasons.push("poste non prioritaire pour la V1 dirigeants");
  }

  const largeAccounts = [
    "edf",
    "grdf",
    "enedis",
    "engie",
    "totalenergies",
    "total energie",
    "vinci",
    "cegelec",
    "spie",
    "eiffage",
    "bouygues",
    "veolia",
    "suez",
  ];
  if (largeAccounts.some((term) => facts.company.includes(term) || facts.domain.includes(term))) {
    reasons.push("grand compte probablement trop internalise");
  }

  if (facts.size.max && facts.size.max > 200) {
    reasons.push("taille entreprise trop elevee");
  }

  const hardOffTargetCompanies = [
    "grossiste",
    "distributeur",
    "logiciel",
    "software",
    "saas",
    "media",
    "magazine",
  ];
  if (hardOffTargetCompanies.some((term) => facts.text.includes(term))) {
    reasons.push("activite hors cible installateur PV");
  }

  const advisorySignals = ["bureau d'etudes", "bureau etudes", "conseil energetique", "consultant"];
  const installerSignals = [
    "installateur",
    "installation",
    "pose",
    "chantier",
    "travaux",
    "rge",
    "qualipv",
  ];
  if (
    advisorySignals.some((term) => facts.text.includes(term)) &&
    !installerSignals.some((term) => facts.text.includes(term))
  ) {
    reasons.push("conseil ou bureau d'etudes sans signal d'installation");
  }

  const hasFranceSignal = isFrance(facts) || facts.domain.includes(".fr");
  const hasForeignSignal =
    /\b(belgique|belgium|suisse|switzerland|maroc|morocco|canada|usa|united states|spain|espagne|italy|italie)\b/.test(
      facts.location,
    ) || /\.(be|ch|ma|ca|com\.au|es|it)\b/.test(facts.domain);
  if (!hasFranceSignal && hasForeignSignal) {
    reasons.push("hors France");
  }

  return reasons;
}

function scoreCompanyFit(candidate, facts) {
  const solarTerms = [
    "photovoltaique",
    "photovoltaic",
    "panneaux solaires",
    "panneau solaire",
    "solaire",
    "solar",
    "autoconsommation",
    "pv",
    "enr",
  ];
  const installerTerms = [
    "installateur",
    "installation",
    "pose",
    "electricite",
    "electricien",
    "energie renouvelable",
    "renovation energetique",
  ];
  const offTargetTerms = [
    "bureau d'etudes",
    "bureau etudes",
    "grossiste",
    "distributeur",
    "logiciel",
    "software",
    "financement",
    "conseil energetique",
    "consultant",
  ];

  let score = 0;
  if (solarTerms.some((term) => facts.text.includes(term))) score += 20;
  if (installerTerms.some((term) => facts.text.includes(term))) score += 8;
  if (facts.domain.endsWith(".fr") || facts.domain.includes(".fr/")) score += 2;
  if (offTargetTerms.some((term) => facts.text.includes(term))) score -= 8;
  return clamp(score, 0, 30);
}

function scoreRoleFit(candidate, facts) {
  const leadershipTerms = ["directeur", "directrice", "responsable photovoltaique", "responsable solaire"];
  if (hasOwnerRole(facts.title)) return 25;
  if (leadershipTerms.some((term) => facts.title.includes(term))) return 14;
  if (!candidate.title) return 5;
  return 2;
}

function hasOwnerRole(title) {
  const ownerTerms = [
    "dirigeant",
    "gerant",
    "gerante",
    "fondateur",
    "fondatrice",
    "co-fondateur",
    "cofondatrice",
    "president",
    "presidente",
    "directeur general",
    "directrice generale",
    "ceo",
    "owner",
    "founder",
  ];
  return ownerTerms.some((term) => title.includes(term));
}

function hasPvInstallerSignal(text) {
  const terms = [
    "photovoltaique",
    "photovoltaic",
    "panneaux solaires",
    "panneau solaire",
    "solaire",
    "solar",
    "autoconsommation",
    "installateur",
    "installation",
    "qualipv",
  ];
  return terms.some((term) => text.includes(term));
}

function scoreSizeFit(candidate, facts) {
  const { min, max, unknown } = facts.size;
  if (unknown) return 6;
  if (max <= 10) return 15;
  if (max <= 50) return 13;
  if (max <= 100) return 7;
  if (max <= 200) return 3;
  return 0;
}

function scoreGeoFit(candidate, facts) {
  if (isFrance(facts)) return 10;
  if (facts.domain.endsWith(".fr") || facts.domain.includes(".fr/")) return 7;
  if (!candidate.country && !candidate.location) return 4;
  return 0;
}

function scoreDataFit(candidate, facts) {
  let score = 0;
  if (candidate.linkedin) score += 3;
  if (candidate.email && candidate.email.includes("@")) score += 3;
  if (candidate.website) score += 2;
  if (candidate.company) score += 1;
  if (candidate.title) score += 1;
  return clamp(score, 0, 10);
}

function scoreSignalFit(candidate, facts) {
  let score = 0;
  if (/\b(1.?10|11.?50|1-10|11-50)\b/.test(normalize(candidate.size))) score += 3;
  if (facts.text.includes("autoconsommation")) score += 2;
  if (facts.text.includes("rge") || facts.text.includes("qualipv")) score += 2;
  if (facts.text.includes("installation") || facts.text.includes("installateur")) score += 2;
  if (facts.text.includes("agence") || facts.text.includes("regional")) score += 1;
  return clamp(score, 0, 10);
}

function chooseAngle(candidate, facts, tier) {
  if (tier === "Exclude") return "aucun";
  if (!facts.size.unknown && facts.size.max <= 10) return "dirigeant_surcharge_admin";
  if (!facts.size.unknown && facts.size.max <= 50) return "flux_dp_chantiers";
  return "diagnostic_volume_dp";
}

function isFrance(facts) {
  return /\b(france|francais|francaise|french|reunion|guadeloupe|martinique|mayotte)\b/.test(facts.location);
}

function parseCompanySize(value) {
  const text = normalize(value);
  if (!text) return { unknown: true, min: 0, max: 0 };
  const numbers = [...text.matchAll(/\d+/g)].map((match) => Number(match[0]));
  if (!numbers.length) return { unknown: true, min: 0, max: 0 };
  if (text.includes("+")) return { unknown: false, min: numbers[0], max: Number.POSITIVE_INFINITY };
  if (numbers.length === 1) return { unknown: false, min: numbers[0], max: numbers[0] };
  return { unknown: false, min: numbers[0], max: numbers[1] };
}

function readField(row, names) {
  const wanted = names.map(normalizeHeader);
  const key = Object.keys(row).find((header) => wanted.includes(normalizeHeader(header)));
  return clean(key ? row[key] : "");
}

function parseCsv(input) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];

    if (quoted) {
      if (char === '"' && next === '"') {
        value += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        value += char;
      }
      continue;
    }

    if (char === '"') {
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

  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }

  const headers = (rows.shift() || []).map(clean);
  return {
    headers,
    rows: rows
      .filter((cells) => cells.some((cell) => clean(cell)))
      .map((cells) =>
        Object.fromEntries(headers.map((header, index) => [header, clean(cells[index])])),
      ),
  };
}

function stringifyCsv(headers, rows) {
  const lines = [headers.map(escapeCsv).join(",")];
  for (const row of rows) {
    lines.push(headers.map((header) => escapeCsv(row[header] ?? "")).join(","));
  }
  return `${lines.join("\n")}\n`;
}

function escapeCsv(value) {
  const text = String(value ?? "");
  if (/[",\n\r]/.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

function summarize(scored) {
  const summary = { A: 0, B: 0, C: 0, Exclude: 0, recommended: 0 };
  for (const item of scored) {
    const tier = item.qualification.sunelys_tier;
    summary[tier] = (summary[tier] || 0) + 1;
    if (
      item.qualification.sunelys_decision === "keep_for_test" &&
      Number(item.qualification.sunelys_score) >= options.minScore
    ) {
      summary.recommended += 1;
    }
  }
  return summary;
}

function getArgValue(name) {
  const index = args.indexOf(name);
  if (index >= 0) return args[index + 1];
  const prefix = `${name}=`;
  const match = args.find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : "";
}

function clean(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function normalize(value) {
  return clean(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function normalizeHeader(value) {
  return normalize(value).replace(/[^a-z0-9]+/g, " ").trim();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, Math.round(value)));
}
