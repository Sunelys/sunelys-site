#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const AIRTABLE_API_URL = "https://api.airtable.com/v0";
const REPORTS_DIR = path.join(ROOT, "reports/google-ads-leads");

const CAMPAIGN_LABELS = new Map([
  ["search_pilotage_admin_pv", "Search - Pilotage admin PV"],
  ["search_sous_traitance_dp", "Search - Sous-traitance DP"],
  ["search_consuel_raccordement", "Search - Consuel Raccordement"],
]);

const args = process.argv.slice(2);
loadEnvFile(".env");
loadEnvFile(".env.local", { override: true });

const options = buildOptions();
const token = clean(process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_TOKEN || "");
const baseId = clean(process.env.AIRTABLE_BASE_ID || "");
const tableName = clean(process.env.AIRTABLE_LEADS_TABLE || "Leads");

if (!token || !baseId) {
  console.error("Missing configuration. Add AIRTABLE_API_KEY and AIRTABLE_BASE_ID.");
  process.exit(1);
}

const records = await fetchAirtableRecords({
  token,
  baseId,
  tableName,
  view: options.view,
  maxRecords: options.maxRecords,
});

const fieldMap = buildFieldMap();
const leads = records.map((record) => normalizeLeadRecord(record, fieldMap));
const leadsInRangeRaw = leads.filter((lead) => isLeadInRange(lead, options.since, options.until));
const excludedTests = options.includeTests ? 0 : leadsInRangeRaw.filter((lead) => lead.isTest).length;
const leadsInRange = options.includeTests ? leadsInRangeRaw : leadsInRangeRaw.filter((lead) => !lead.isTest);
const paidLeads = leadsInRange.filter(isPaidSearchLead);
const report = buildReport({
  generatedAt: new Date().toISOString(),
  period: { since: options.since, until: options.until, days: options.days },
  includeTests: options.includeTests,
  excludedTests,
  fetchedRecords: records.length,
  leadsInRange,
  paidLeads,
});

const reportDir = path.join(REPORTS_DIR, safeTimestamp(report.generatedAt));
mkdirSync(reportDir, { recursive: true });
writeFileSync(path.join(reportDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
writeFileSync(path.join(reportDir, "report.md"), renderMarkdownReport(report));
writeFileSync(path.join(REPORTS_DIR, "latest.json"), `${JSON.stringify(report, null, 2)}\n`);

console.log(
  JSON.stringify(
    {
      report: path.relative(ROOT, reportDir),
      period: report.period,
      includeTests: report.includeTests,
      excludedTests: report.excludedTests,
      fetchedRecords: report.fetchedRecords,
      leadsInRange: report.leadsInRange,
      paidLeads: report.totals.leads,
      qualified: report.totals.qualified,
      hot: report.totals.hot,
      averageScore: report.totals.averageScore,
      topRecommendations: report.recommendations.slice(0, 4),
    },
    null,
    2,
  ),
);

function buildOptions() {
  const days = positiveInteger(getArgValue("--days") || process.env.MARKETING_ADS_LEADS_DAYS || 30);
  const until = normalizeDate(getArgValue("--until")) || todayIsoDate();
  const since = normalizeDate(getArgValue("--since")) || addDaysIsoDate(until, -days + 1);
  return {
    days,
    since,
    until,
    maxRecords: positiveInteger(getArgValue("--max") || process.env.MARKETING_LEADS_MAX_RECORDS || 5000),
    view: clean(getArgValue("--view") || process.env.MARKETING_LEADS_VIEW || process.env.AIRTABLE_LEADS_VIEW || ""),
    includeTests: hasFlag("--include-tests"),
  };
}

function buildReport({ generatedAt, period, includeTests, excludedTests, fetchedRecords, leadsInRange, paidLeads }) {
  const totals = {
    leads: paidLeads.length,
    qualified: paidLeads.filter((lead) => lead.qualified).length,
    hot: paidLeads.filter((lead) => lead.qualitySegment === "hot").length,
    nurture: paidLeads.filter((lead) => lead.qualitySegment === "nurture").length,
    lowSignal: paidLeads.filter((lead) => lead.qualitySegment === "low_signal").length,
    disqualified: paidLeads.filter((lead) => lead.disqualified).length,
    averageScore: average(paidLeads.map((lead) => lead.qualityScore)),
    qualifiedRate: rate(paidLeads.filter((lead) => lead.qualified).length, paidLeads.length),
  };

  const qualificationGaps = {
    missingCampaign: paidLeads.filter((lead) => lead.campaign === "unknown_campaign").length,
    missingLandingPage: paidLeads.filter((lead) => lead.landingPage === "unknown").length,
    missingServiceInterest: paidLeads.filter((lead) => lead.serviceInterest === "unknown").length,
    missingBlockedStage: paidLeads.filter((lead) => lead.blockedStage === "unknown").length,
    missingVolume: paidLeads.filter((lead) => lead.volume === "unknown").length,
    missingCompany: paidLeads.filter((lead) => !lead.hasCompany).length,
    missingPhone: paidLeads.filter((lead) => !lead.hasPhone).length,
  };

  const byCampaign = aggregateLeads(paidLeads, (lead) => campaignDisplayName(lead.campaign), {
    secondary: {
      topLandingPage: (items) => topGroupLabel(items, (lead) => lead.landingPage),
      topService: (items) => topGroupLabel(items, (lead) => lead.serviceInterest),
      topVolume: (items) => topGroupLabel(items, (lead) => lead.volume),
    },
  });

  const report = {
    generatedAt,
    privacy: "No email, phone, name, company name or free-text message is included in this report.",
    period,
    includeTests,
    excludedTests,
    fetchedRecords,
    leadsInRange: leadsInRange.length,
    totals,
    qualificationGaps,
    byCampaign,
    byLandingPage: aggregateLeads(paidLeads, (lead) => lead.landingPage, {
      secondary: {
        topCampaign: (items) => topGroupLabel(items, (lead) => campaignDisplayName(lead.campaign)),
        topService: (items) => topGroupLabel(items, (lead) => lead.serviceInterest),
      },
    }).slice(0, 12),
    byAdContent: aggregateLeads(paidLeads, (lead) => lead.utmContent || "unknown_content", {
      secondary: {
        topCampaign: (items) => topGroupLabel(items, (lead) => campaignDisplayName(lead.campaign)),
        topLandingPage: (items) => topGroupLabel(items, (lead) => lead.landingPage),
      },
    }).slice(0, 12),
    byKeyword: aggregateLeads(paidLeads, (lead) => lead.utmTerm || "unknown_keyword", {
      secondary: {
        topCampaign: (items) => topGroupLabel(items, (lead) => campaignDisplayName(lead.campaign)),
        topLandingPage: (items) => topGroupLabel(items, (lead) => lead.landingPage),
      },
    }).slice(0, 12),
    byServiceInterest: aggregateLeads(paidLeads, (lead) => lead.serviceInterest, {
      secondary: {
        topCampaign: (items) => topGroupLabel(items, (lead) => campaignDisplayName(lead.campaign)),
        topLandingPage: (items) => topGroupLabel(items, (lead) => lead.landingPage),
      },
    }).slice(0, 12),
    byBlockedStage: aggregateLeads(paidLeads, (lead) => lead.blockedStage, {
      secondary: {
        topCampaign: (items) => topGroupLabel(items, (lead) => campaignDisplayName(lead.campaign)),
        topService: (items) => topGroupLabel(items, (lead) => lead.serviceInterest),
      },
    }).slice(0, 12),
    byVolume: aggregateLeads(paidLeads, (lead) => lead.volume, {
      secondary: {
        topCampaign: (items) => topGroupLabel(items, (lead) => campaignDisplayName(lead.campaign)),
        topService: (items) => topGroupLabel(items, (lead) => lead.serviceInterest),
      },
    }).slice(0, 12),
    byConversionType: aggregateLeads(paidLeads, (lead) => lead.conversionType, {
      secondary: {
        topCampaign: (items) => topGroupLabel(items, (lead) => campaignDisplayName(lead.campaign)),
        topLandingPage: (items) => topGroupLabel(items, (lead) => lead.landingPage),
      },
    }).slice(0, 12),
    recentSignals: paidLeads
      .slice()
      .sort((a, b) => clean(b.createdAt).localeCompare(clean(a.createdAt)))
      .slice(0, 20)
      .map((lead) => ({
        day: clean(lead.createdAt).slice(0, 10) || "unknown",
        campaign: campaignDisplayName(lead.campaign),
        landingPage: lead.landingPage,
        serviceInterest: lead.serviceInterest,
        blockedStage: lead.blockedStage,
        volume: lead.volume,
        conversionType: lead.conversionType,
        qualitySegment: lead.qualitySegment,
        qualityScore: lead.qualityScore,
      })),
  };

  return {
    ...report,
    recommendations: buildRecommendations(report),
  };
}

function buildRecommendations(report) {
  const recommendations = [];

  if (report.totals.leads === 0) {
    if (report.excludedTests > 0) {
      return [
        "Tracking Google Ads confirme par lead test. Aucun lead paid reel detecte sur la periode.",
        "Apres activation, lancer cette commande chaque jour et ne juger que les leads qualifies/hot, pas le volume brut.",
        "Verifier les termes de recherche des le premier clic pour exclure particuliers, aides, emploi, formation et recherches gratuites.",
      ];
    }

    return [
      "Aucun lead Google Ads/CPC detecte sur la periode. Garder les campagnes en pause tant que le test formulaire avec UTM et GCLID n'est pas confirme.",
      "Apres activation, lancer cette commande chaque jour et ne juger que les leads qualifies/hot, pas le volume brut.",
      "Verifier que les URLs finales conservent utm_source=google, utm_medium=cpc et utm_campaign dans Airtable.",
    ];
  }

  if (report.qualificationGaps.missingCampaign > 0) {
    recommendations.push(
      `${report.qualificationGaps.missingCampaign} lead(s) paid n'ont pas de campagne lisible. Corriger le Final URL suffix ou la remontee du champ UTM campaign.`,
    );
  }

  if (report.qualificationGaps.missingVolume > 0 || report.qualificationGaps.missingBlockedStage > 0) {
    recommendations.push(
      "Des signaux de qualification manquent encore. Garder volume et blocage administratif obligatoires sur les formulaires Ads.",
    );
  }

  const weakCampaigns = report.byCampaign.filter((row) => row.leads >= 3 && row.qualified === 0);
  for (const row of weakCampaigns.slice(0, 3)) {
    recommendations.push(
      `${row.key}: ${row.leads} lead(s), 0 qualifie. Revoir termes de recherche, mots-cles negatifs et promesse d'annonce avant d'augmenter le budget.`,
    );
  }

  const strongCampaign = report.byCampaign.find((row) => row.hot > 0 || row.qualified > 0);
  if (strongCampaign) {
    recommendations.push(
      `${strongCampaign.key} produit les meilleurs signaux actuels (${strongCampaign.qualified} qualifie(s), ${strongCampaign.hot} hot). Proteger cette campagne avant de tester plus large.`,
    );
  }

  if (report.totals.lowSignal > report.totals.qualified) {
    recommendations.push(
      "Les leads faibles depassent les leads qualifies. Resserrer les mots-cles en exact/phrase et ajouter les requetes hors cible en negatifs.",
    );
  }

  if (report.qualificationGaps.missingPhone > 0 && report.totals.qualified > 0) {
    recommendations.push(
      "Certains leads paid qualifies n'ont pas de telephone. Tester un libelle plus direct autour du cadrage en 15 minutes.",
    );
  }

  if (recommendations.length === 0) {
    recommendations.push("Les signaux paid sont lisibles. Continuer le suivi quotidien et reallouer seulement apres assez de leads qualifies par campagne.");
  }

  return recommendations;
}

function normalizeLeadRecord(record, fieldMap) {
  const fields = record.fields ?? {};
  const read = (role) => readAirtableField(fields, fieldMap[role] ?? []);
  const message = clean(read("message"));
  const sourceFromMessage = extractContextValue(message, ["Source detail", "Source detaillee", "Source"]);
  const landingFromMessage = extractContextValue(message, ["Landing page", "Page d'atterrissage", "Landing"]);
  const volumeFromMessage = extractContextValue(message, ["Volume", "Volume mensuel", "Volume dossiers/mois"]);
  const serviceFromMessage = extractContextValue(message, ["Service", "Besoin", "Need"]);
  const campaignFromMessage = extractContextValue(message, ["UTM campaign", "utm_campaign", "Campagne"]);
  const mediumFromMessage = extractContextValue(message, ["UTM medium", "utm_medium"]);
  const source = clean(read("source")) || sourceFromMessage;
  const sourceDetail = clean(read("leadSourceDetail")) || sourceFromMessage;
  const rawLandingPage = clean(read("landingPage")) || landingFromMessage || source || sourceDetail;
  const utmSource = clean(read("utmSource")) || extractContextValue(message, ["UTM source", "utm_source"]);
  const utmMedium = clean(read("utmMedium")) || mediumFromMessage;
  const utmContent = clean(read("utmContent")) || extractContextValue(message, ["UTM content", "utm_content"]);
  const utmTerm = clean(read("utmTerm")) || extractContextValue(message, ["UTM term", "utm_term"]);
  const gclid = clean(read("gclid")) || extractContextValue(message, ["GCLID", "gclid"]);
  const msclkid = clean(read("msclkid")) || extractContextValue(message, ["MSCLKID", "msclkid"]);
  const email = clean(read("email"));
  const company = clean(read("company"));
  const status = clean(read("status")) || "unknown";
  const conversionType = inferConversionType({
    conversionType: clean(read("conversionType")),
    conversionFromMessage: extractContextValue(message, ["Conversion", "Type conversion", "Conversion type"]),
    leadStage: clean(read("leadStage")),
    source,
    sourceDetail,
    message,
  });
  const serviceInterest = inferServiceFromContext({
    service: clean(read("serviceInterest")) || clean(read("need")) || serviceFromMessage,
    source,
    sourceDetail,
    conversionType,
    message,
  });
  const blockedStage = inferBlockedStageFromContext({
    blockedStage:
      clean(read("blockedStage")) ||
      extractContextValue(message, ["Blocage", "Etape bloquee", "Etape administrative bloquee", "Blocked stage"]),
    service: serviceInterest,
    source,
    sourceDetail,
    conversionType,
    message,
  });

  const lead = {
    createdAt: parseLeadDate(read("createdAt")) || record.createdTime || "",
    landingPage: normalizeLandingPage(rawLandingPage),
    source,
    sourceDetail,
    channel: normalizeLeadChannel({ utmSource, utmMedium, source, sourceDetail, gclid, msclkid }),
    utmSource,
    utmMedium,
    utmCampaign:
      clean(read("utmCampaign")) ||
      campaignFromMessage ||
      extractQueryParam("utm_campaign", [rawLandingPage, source, sourceDetail, message]),
    utmContent: utmContent || extractQueryParam("utm_content", [rawLandingPage, source, sourceDetail, message]),
    utmTerm: utmTerm || extractQueryParam("utm_term", [rawLandingPage, source, sourceDetail, message]),
    hasGclid: Boolean(gclid),
    hasMsclkid: Boolean(msclkid),
    serviceInterest,
    conversionType: conversionType || "unknown",
    blockedStage,
    leadStage: clean(read("leadStage")),
    status,
    volume: clean(read("volume")) || volumeFromMessage || "unknown",
    isTest: isTestLead({ email, company, status, source, sourceDetail, message }),
    hasEmail: Boolean(clean(read("email"))),
    hasCompany: Boolean(clean(read("company"))),
    hasPhone: Boolean(clean(read("phone"))),
    hasNeed: Boolean(clean(read("need"))),
    hasMessage: Boolean(message),
  };

  lead.campaign = resolveCampaign(lead);
  const quality = scoreLeadQuality(lead);
  return {
    ...lead,
    qualityScore: quality.score,
    qualitySegment: quality.segment,
    qualified: quality.qualified,
    disqualified: quality.disqualified,
  };
}

function buildFieldMap() {
  return {
    createdAt: fieldCandidates("AIRTABLE_FIELD_DATE", ["Date entree", "Date entrée", "Date", "Created Time"]),
    email: fieldCandidates("AIRTABLE_FIELD_EMAIL", ["Email"]),
    company: fieldCandidates("AIRTABLE_FIELD_COMPANY", ["Societe", "Société", "Entreprise", "Company"]),
    phone: fieldCandidates("AIRTABLE_FIELD_PHONE", ["Telephone", "Téléphone", "Phone"]),
    volume: fieldCandidates("AIRTABLE_FIELD_VOLUME", ["Volume", "Volume mensuel", "Volume dossiers/mois"]),
    need: fieldCandidates("AIRTABLE_FIELD_NEED", ["Besoin", "Besoin principal", "Need"]),
    message: fieldCandidates("AIRTABLE_FIELD_MESSAGE", ["Message", "Commentaire"]),
    conversionType: fieldCandidates("AIRTABLE_FIELD_CONVERSION_TYPE", [
      "Type conversion",
      "Conversion type",
      "Conversion",
      "Type de conversion",
    ]),
    leadStage: fieldCandidates("AIRTABLE_FIELD_LEAD_STAGE", ["Etape lead", "Étape lead", "Lead stage"]),
    blockedStage: fieldCandidates("AIRTABLE_FIELD_BLOCKED_STAGE", [
      "Etape bloquee",
      "Étape bloquée",
      "Etape administrative bloquee",
      "Étape administrative bloquée",
      "Blocage",
      "Blocage administratif",
      "Blocked stage",
    ]),
    serviceInterest: fieldCandidates("AIRTABLE_FIELD_SERVICE_INTEREST", [
      "Service interesse",
      "Service intéressé",
      "Service interest",
      "Besoin principal",
    ]),
    leadSourceDetail: fieldCandidates("AIRTABLE_FIELD_LEAD_SOURCE_DETAIL", ["Detail source", "Détail source"]),
    status: fieldCandidates("AIRTABLE_FIELD_STATUS", ["Statut", "Status"]),
    source: fieldCandidates("AIRTABLE_FIELD_SOURCE", ["Source"]),
    landingPage: fieldCandidates("AIRTABLE_FIELD_LANDING_PAGE", ["Landing page", "Page d'atterrissage"]),
    utmSource: fieldCandidates("AIRTABLE_FIELD_UTM_SOURCE", ["UTM source", "utm_source"]),
    utmMedium: fieldCandidates("AIRTABLE_FIELD_UTM_MEDIUM", ["UTM medium", "utm_medium"]),
    utmCampaign: fieldCandidates("AIRTABLE_FIELD_UTM_CAMPAIGN", ["UTM campaign", "utm_campaign"]),
    utmTerm: fieldCandidates("AIRTABLE_FIELD_UTM_TERM", ["UTM term", "utm_term"]),
    utmContent: fieldCandidates("AIRTABLE_FIELD_UTM_CONTENT", ["UTM content", "utm_content"]),
    gclid: fieldCandidates("AIRTABLE_FIELD_GCLID", ["GCLID", "gclid"]),
    msclkid: fieldCandidates("AIRTABLE_FIELD_MSCLKID", ["MSCLKID", "msclkid"]),
  };
}

function isPaidSearchLead(lead) {
  const source = normalizeText(lead.utmSource);
  const medium = normalizeText(lead.utmMedium);
  const campaign = normalizeText(lead.utmCampaign);
  const signal = normalizeText([
    lead.source,
    lead.sourceDetail,
    lead.landingPage,
    lead.utmCampaign,
    lead.utmContent,
    lead.channel,
  ].join(" "));

  if (lead.hasGclid || lead.hasMsclkid) return true;
  if (["cpc", "ppc", "paid", "paidsearch", "paid search", "sem"].some((term) => medium.includes(term))) return true;
  if (source.includes("google") && ["cpc", "ppc", "paid", "sem"].some((term) => medium.includes(term))) return true;
  if ([...CAMPAIGN_LABELS.keys()].some((slug) => campaign.includes(slug))) return true;
  if (signal.includes("google ads") || signal.includes("googleads") || signal.includes("gads")) return true;
  return signal.includes("utm_source google") && signal.includes("utm_medium cpc");
}

function isTestLead({ email, company, status, source, sourceDetail, message }) {
  const signal = normalizeText(`${email} ${company} ${status} ${source} ${sourceDetail} ${message}`);
  return (
    signal.includes("test tracking") ||
    signal.includes("tracking test") ||
    signal.includes("ne pas traiter") ||
    signal.includes("google ads test") ||
    signal.includes("test+google") ||
    signal.includes("sunelys test")
  );
}

function resolveCampaign(lead) {
  const explicit = slugify(lead.utmCampaign);
  if (explicit) return explicit;

  const signal = normalizeText([
    lead.source,
    lead.sourceDetail,
    lead.landingPage,
    lead.utmContent,
  ].join(" "));

  for (const slug of CAMPAIGN_LABELS.keys()) {
    if (signal.includes(slug)) return slug;
  }

  if (signal.includes("pilotage") || signal.includes("gestion administrative")) return "search_pilotage_admin_pv";
  if (signal.includes("sous traitance") || signal.includes("declaration prealable") || signal.includes("mairie")) {
    return "search_sous_traitance_dp";
  }
  if (signal.includes("consuel") || signal.includes("raccordement") || signal.includes("enedis")) {
    return "search_consuel_raccordement";
  }
  return "unknown_campaign";
}

function inferConversionType({ conversionType, conversionFromMessage, leadStage, source, sourceDetail, message }) {
  const existing = clean(conversionType) || clean(conversionFromMessage);
  if (existing) return existing;
  const signal = normalizeText(`${leadStage} ${source} ${sourceDetail} ${message}`);
  if (signal.includes("diagnostic")) return "diagnostic_submit";
  if (signal.includes("quiz")) return "quiz_submit";
  if (signal.includes("checklist") || signal.includes("lead magnet")) return "checklist_download";
  if (signal.includes("booking") || signal.includes("calendly") || signal.includes("rdv")) return "booking";
  if (signal.includes("phone") || signal.includes("telephone")) return "phone_click";
  if (signal.includes("contact") || signal.includes("form") || signal.includes("hero") || signal.includes("sticky")) return "form_contact";
  return "lead_form";
}

function inferServiceFromContext({ service, source, sourceDetail, conversionType, message }) {
  const existing = clean(service);
  if (existing) return existing;
  const signal = normalizeText(`${source} ${sourceDetail} ${conversionType} ${message}`);
  if (signal.includes("consuel")) return "Consuel";
  if (signal.includes("raccordement") || signal.includes("enedis")) return "Raccordement";
  if (signal.includes("declaration") || signal.includes("prealable") || signal.includes("dp")) return "DP";
  if (signal.includes("pilotage") || signal.includes("gestion") || signal.includes("administratif")) {
    return "Pilotage complet";
  }
  return "unknown";
}

function inferBlockedStageFromContext({ blockedStage, service, source, sourceDetail, conversionType, message }) {
  const existing = clean(blockedStage);
  if (existing) return existing;
  const signal = normalizeText(`${service} ${source} ${sourceDetail} ${conversionType} ${message}`);
  if (signal.includes("complement") || signal.includes("mairie") || signal.includes("refus")) return "Retour mairie";
  if (signal.includes("consuel")) return "Consuel a preparer";
  if (signal.includes("raccordement") || signal.includes("enedis")) return "Raccordement en attente";
  if (signal.includes("declaration") || signal.includes("prealable") || signal.includes("dp")) return "Avant depot";
  if (signal.includes("pilotage") || signal.includes("gestion") || signal.includes("administratif")) return "Pilotage global";
  return "unknown";
}

function scoreLeadQuality(lead) {
  let score = 0;
  const status = normalizeText(lead.status);
  const volume = normalizeText(lead.volume);
  const conversion = normalizeText(lead.conversionType);
  const service = normalizeText(lead.serviceInterest);
  const blockedStage = normalizeText(lead.blockedStage);

  const disqualified = ["spam", "particulier", "hors cible", "non qualifie", "non qualifiee", "perdu"].some((term) =>
    status.includes(term),
  );
  if (disqualified) return { score: 0, segment: "disqualified", qualified: false, disqualified: true };

  if (["qualifie", "qualifiee", "qualified", "rdv", "opportunite", "proposition", "devis", "client", "gagne"].some((term) => status.includes(term))) {
    score += 45;
  }

  if (volume.includes("+30") || volume.includes("+ 30") || volume.includes("51") || volume.includes("+51")) score += 30;
  else if (volume.includes("10-30") || volume.includes("10 a 30") || volume.includes("21") || volume.includes("50")) score += 24;
  else if (volume.includes("1-10") || volume.includes("1 a 10") || volume.includes("moins")) score += 12;

  if (service && service !== "unknown") score += 12;
  if (blockedStage && blockedStage !== "unknown") score += 8;
  if (["complement", "consuel", "raccordement", "mise en service", "bloque", "bloquee"].some((term) => blockedStage.includes(term))) {
    score += 4;
  }
  if (lead.hasCompany) score += 10;
  if (lead.hasPhone) score += 8;
  if (lead.hasNeed || lead.hasMessage) score += 10;
  if (conversion.includes("diagnostic") || conversion.includes("contact") || conversion.includes("cadrage") || conversion === "form_contact") {
    score += 12;
  }
  if (conversion.includes("quiz")) score += 8;
  if (conversion.includes("checklist") || conversion.includes("lead_magnet")) score += 5;

  const boundedScore = Math.min(score, 100);
  return {
    score: boundedScore,
    segment: boundedScore >= 75 ? "hot" : boundedScore >= 55 ? "qualified" : boundedScore >= 30 ? "nurture" : "low_signal",
    qualified: boundedScore >= 55,
    disqualified: false,
  };
}

function normalizeLeadChannel({ utmSource, utmMedium, source, sourceDetail, gclid, msclkid }) {
  const signal = normalizeText(`${utmSource} ${utmMedium} ${source} ${sourceDetail}`);
  if (clean(gclid) || clean(msclkid)) return "Paid Search";
  if (signal.includes("cpc") || signal.includes("ppc") || signal.includes("google ads") || signal.includes("paid")) {
    return "Paid Search";
  }
  if (signal.includes("google") || signal.includes("organic") || signal.includes("search")) return "Organic Search";
  if (signal.includes("linkedin") || signal.includes("social")) return "Organic Social";
  if (signal.includes("direct")) return "Direct";
  return "Unknown";
}

function aggregateLeads(leads, keyFn, { secondary = {} } = {}) {
  const groups = new Map();
  for (const lead of leads) {
    const key = clean(keyFn(lead)) || "unknown";
    const items = groups.get(key) ?? [];
    items.push(lead);
    groups.set(key, items);
  }

  return Array.from(groups, ([key, items]) => ({
    key,
    leads: items.length,
    qualified: items.filter((lead) => lead.qualified).length,
    hot: items.filter((lead) => lead.qualitySegment === "hot").length,
    nurture: items.filter((lead) => lead.qualitySegment === "nurture").length,
    lowSignal: items.filter((lead) => lead.qualitySegment === "low_signal").length,
    averageScore: average(items.map((lead) => lead.qualityScore)),
    qualifiedRate: rate(items.filter((lead) => lead.qualified).length, items.length),
    ...Object.fromEntries(Object.entries(secondary).map(([name, resolver]) => [name, resolver(items)])),
  })).sort((a, b) => b.qualified - a.qualified || b.hot - a.hot || b.leads - a.leads || b.averageScore - a.averageScore);
}

function topGroupLabel(items, keyFn) {
  const rows = aggregateCount(items, keyFn);
  return rows[0] ? `${rows[0].key} (${rows[0].count})` : "unknown";
}

function aggregateCount(items, keyFn) {
  const groups = new Map();
  for (const item of items) {
    const key = clean(keyFn(item)) || "unknown";
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }
  return Array.from(groups, ([key, count]) => ({ key, count })).sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
}

function renderMarkdownReport(report) {
  const lines = [];
  lines.push("# Google Ads leads - Sunelys");
  lines.push("");
  lines.push(`Genere le ${report.generatedAt}.`);
  lines.push(`Periode: ${report.period.since} -> ${report.period.until}.`);
  lines.push("");
  lines.push(`Confidentialite: ${report.privacy}`);
  lines.push(`Mode test: ${report.includeTests ? "leads test inclus" : "leads test exclus"}.`);
  lines.push("");
  lines.push("## Synthese");
  lines.push("");
  lines.push(`- Leads Airtable lus: ${report.fetchedRecords}`);
  lines.push(`- Leads dans la periode: ${report.leadsInRange}`);
  lines.push(`- Leads test exclus: ${report.excludedTests}`);
  lines.push(`- Leads paid detectes: ${report.totals.leads}`);
  lines.push(`- Qualifies: ${report.totals.qualified}`);
  lines.push(`- Hot: ${report.totals.hot}`);
  lines.push(`- Score moyen: ${report.totals.averageScore}`);
  lines.push(`- Taux qualifie: ${report.totals.qualifiedRate}%`);
  lines.push("");
  lines.push("## Recommandations");
  lines.push("");
  for (const recommendation of report.recommendations) {
    lines.push(`- ${recommendation}`);
  }
  lines.push("");
  lines.push("## Trous de tracking / qualification");
  lines.push("");
  lines.push(renderObjectTable(report.qualificationGaps));
  lines.push("");
  lines.push("## Par campagne");
  lines.push("");
  lines.push(renderRowsTable(report.byCampaign, ["key", "leads", "qualified", "hot", "averageScore", "qualifiedRate", "topLandingPage", "topService", "topVolume"]));
  lines.push("");
  lines.push("## Par landing page");
  lines.push("");
  lines.push(renderRowsTable(report.byLandingPage, ["key", "leads", "qualified", "hot", "averageScore", "topCampaign", "topService"]));
  lines.push("");
  lines.push("## Par contenu annonce");
  lines.push("");
  lines.push(renderRowsTable(report.byAdContent, ["key", "leads", "qualified", "hot", "averageScore", "topCampaign", "topLandingPage"]));
  lines.push("");
  lines.push("## Par mot-cle");
  lines.push("");
  lines.push(renderRowsTable(report.byKeyword, ["key", "leads", "qualified", "hot", "averageScore", "topCampaign", "topLandingPage"]));
  lines.push("");
  lines.push("## Par service");
  lines.push("");
  lines.push(renderRowsTable(report.byServiceInterest, ["key", "leads", "qualified", "hot", "averageScore", "topCampaign", "topLandingPage"]));
  lines.push("");
  lines.push("## Par blocage");
  lines.push("");
  lines.push(renderRowsTable(report.byBlockedStage, ["key", "leads", "qualified", "hot", "averageScore", "topCampaign", "topService"]));
  lines.push("");
  lines.push("## Par volume");
  lines.push("");
  lines.push(renderRowsTable(report.byVolume, ["key", "leads", "qualified", "hot", "averageScore", "topCampaign", "topService"]));
  lines.push("");
  lines.push("## Par conversion");
  lines.push("");
  lines.push(renderRowsTable(report.byConversionType, ["key", "leads", "qualified", "hot", "averageScore", "topCampaign", "topLandingPage"]));
  lines.push("");
  lines.push("## Signaux recents anonymises");
  lines.push("");
  lines.push(renderRowsTable(report.recentSignals, ["day", "campaign", "landingPage", "serviceInterest", "blockedStage", "volume", "conversionType", "qualitySegment", "qualityScore"]));
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function renderObjectTable(object) {
  const rows = Object.entries(object).map(([key, value]) => ({ key, value }));
  return renderRowsTable(rows, ["key", "value"]);
}

function renderRowsTable(rows, columns) {
  if (!rows.length) return "Aucune donnee.";
  const header = `| ${columns.join(" | ")} |`;
  const separator = `| ${columns.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${columns.map((column) => tableCell(row[column])).join(" | ")} |`);
  return [header, separator, ...body].join("\n");
}

function tableCell(value) {
  return clean(value).replace(/\|/g, "\\|") || "-";
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

function isLeadInRange(lead, since, until) {
  const day = clean(lead.createdAt).slice(0, 10);
  if (!day) return true;
  return day >= since && day <= until;
}

function normalizeLandingPage(value) {
  const landingPage = clean(value);
  if (!landingPage) return "unknown";
  try {
    const url = landingPage.startsWith("http") ? new URL(landingPage) : new URL(landingPage, "https://sunelys.fr");
    return url.pathname.replace(/\/$/, "") || "/";
  } catch {
    const withoutQuery = landingPage.split("?")[0];
    if (!withoutQuery || withoutQuery === "unknown") return "unknown";
    return withoutQuery.startsWith("/") ? withoutQuery : `/${withoutQuery.replace(/^\//, "")}`;
  }
}

function extractQueryParam(name, values) {
  for (const value of values) {
    const text = clean(value);
    if (!text) continue;
    const match = text.match(new RegExp(`[?&|\\s]${escapeRegExp(name)}=([^&#|\\s]+)`, "i"));
    if (match) return decodeURIComponent(match[1]).trim();
  }
  return "";
}

function extractContextValue(text, labels) {
  const value = clean(text);
  if (!value) return "";
  const labelPattern = labels.map(escapeRegExp).join("|");
  const match = value.match(new RegExp(`(?:^|\\|)\\s*(?:${labelPattern})\\s*:\\s*([^|]+)`, "i"));
  return clean(match?.[1] ?? "");
}

function campaignDisplayName(campaign) {
  return CAMPAIGN_LABELS.get(campaign) || campaign || "unknown_campaign";
}

function slugify(value) {
  return clean(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function normalizeText(value) {
  return clean(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function normalizeKey(value) {
  return normalizeText(value).replace(/[^a-z0-9]+/g, "");
}

function fieldCandidates(envName, fallbackNames) {
  return unique([clean(process.env[envName] || ""), ...fallbackNames]);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function clean(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function average(values) {
  const cleanValues = values.map(Number).filter((value) => Number.isFinite(value));
  if (!cleanValues.length) return 0;
  return Math.round(cleanValues.reduce((sum, value) => sum + value, 0) / cleanValues.length);
}

function rate(part, total) {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

function positiveInteger(value) {
  const number = Number.parseInt(String(value), 10);
  return Number.isFinite(number) && number > 0 ? number : 30;
}

function parseLeadDate(value) {
  const text = clean(value);
  if (!text) return "";
  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function normalizeDate(value) {
  const text = clean(value);
  if (!text) return "";
  const date = new Date(`${text}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function addDaysIsoDate(dateText, days) {
  const date = new Date(`${dateText}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function safeTimestamp(value) {
  return value.replace(/[:.]/g, "-");
}

function getArgValue(name) {
  const inline = args.find((arg) => arg.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function hasFlag(name) {
  return args.includes(name);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function loadEnvFile(name, { override = false } = {}) {
  const file = path.join(ROOT, name);
  if (!existsSync(file)) return;
  const text = readFileSync(file, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;
    const key = match[1];
    if (!override && process.env[key]) continue;
    process.env[key] = unquote(match[2]);
  }
}

function unquote(value) {
  const trimmed = value.trim();
  if ((trimmed.startsWith("'") && trimmed.endsWith("'")) || (trimmed.startsWith('"') && trimmed.endsWith('"'))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}
