import type { APIRoute } from "astro";

export const prerender = false;

const AIRTABLE_API_URL = "https://api.airtable.com/v0";
const SITE_URL = "https://sunelys.fr";

const SOURCE_LANDING_PATTERNS = [
  { patterns: ["homepage", "home", "quiz-homepage", "hero", "homepage_hero", "homepage-hero", "hero-homepage"], path: "/" },
  { patterns: ["lead-magnet-checklist-dp", "lead_magnet_checklist_dp"], path: "/declaration-prealable-panneaux-solaires" },
  { patterns: ["consuel_photovoltaique_hero", "consuel-hero"], path: "/dossier-consuel-photovoltaique" },
  { patterns: ["sticky"], path: "/" },
  { patterns: ["production-redeploy-test"], path: "/" },
  { patterns: ["quiz"], path: "/" },
  { patterns: ["contact"], path: "/contact" },
  { patterns: ["tarif-declaration-prealable"], path: "/tarif-declaration-prealable-photovoltaique" },
  { patterns: ["tarifs"], path: "/tarifs" },
  { patterns: ["services"], path: "/services" },
  { patterns: ["maprimerenov", "ma-prime-renov", "cee", "aides-renovation", "pack-maprimerenov-cee"], path: "/tarifs#aides-renovation" },
  { patterns: ["gestion-administrative-photovoltaique"], path: "/gestion-administrative-photovoltaique" },
  { patterns: ["declaration-prealable-panneaux-solaires", "sous-traitance-declaration-prealable"], path: "/declaration-prealable-panneaux-solaires" },
  { patterns: ["dossier-consuel-photovoltaique", "consuel"], path: "/dossier-consuel-photovoltaique" },
  { patterns: ["raccordement-enedis-photovoltaique", "raccordement", "enedis"], path: "/raccordement-enedis-photovoltaique" },
  { patterns: ["checklist", "lead-magnet"], path: "/checklist-declaration-prealable-solaire" },
];

function clean(value: unknown) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function firstClean(...values: unknown[]) {
  for (const value of values) {
    const cleaned = clean(value);
    if (cleaned) return cleaned;
  }
  return "";
}

function normalizeText(value: unknown) {
  return clean(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function splitName(fullName: string) {
  const parts = clean(fullName).split(" ").filter(Boolean);
  if (parts.length <= 1) return { firstName: "", lastName: parts[0] ?? "" };
  return {
    firstName: parts.slice(0, -1).join(" "),
    lastName: parts.at(-1) ?? "",
  };
}

function addOptionalField(
  fields: Record<string, string>,
  envName: string,
  value: string,
  env: Record<string, string | undefined>,
  fallbackFieldName = "",
) {
  const fieldName = clean(env[envName] ?? fallbackFieldName);
  if (fieldName && value) fields[fieldName] = value;
}

function setNamedField(fields: Record<string, string>, fieldName: string, value: string) {
  const normalizedFieldName = clean(fieldName);
  if (normalizedFieldName && value) fields[normalizedFieldName] = value;
}

function normalizeVolume(value: string) {
  const normalized = normalizeText(value);
  if (!normalized) return "";
  if (normalized.includes("+30") || normalized.includes("30+") || normalized.includes("+ 30")) return "+30";
  if (normalized.includes("10-30") || normalized.includes("10 a 30") || normalized.includes("10 à 30")) {
    return "10-30";
  }
  if (normalized.includes("1-10") || normalized.includes("1 a 10") || normalized.includes("1 à 10")) return "1-10";
  return value;
}

function normalizeNeed(value: string) {
  const normalized = normalizeText(value);
  if (!normalized) return "";
  if (
    (normalized.includes("maprimerenov") || normalized.includes("ma prime renov") || normalized.includes("anah")) &&
    (normalized.includes("cee") || normalized.includes("certificat"))
  ) {
    return "MaPrimeRénov' + CEE";
  }
  if (normalized.includes("maprimerenov") || normalized.includes("ma prime renov") || normalized.includes("anah")) {
    return "MaPrimeRénov'";
  }
  if (normalized.includes("cee") || normalized.includes("certificat") || normalized.includes("economies d energie")) return "CEE";
  if (normalized.includes("aide") || normalized.includes("renovation") || normalized.includes("prime")) return "Aides rénovation";
  if (normalized.includes("declaration") || normalized.includes("prealable") || normalized === "dp") return "DP";
  if (normalized.includes("consuel")) return "Consuel";
  if (normalized.includes("raccordement") || normalized.includes("enedis")) return "Raccordement";
  if (normalized.includes("pilotage complet")) return "Pilotage complet";
  if (normalized.includes("pilotage") || normalized.includes("gestion") || normalized.includes("administratif")) {
    return "Gestion admin";
  }
  if (normalized.includes("audit") || normalized.includes("diagnostic") || normalized.includes("cadrage")) return "Audit";
  return value;
}

function normalizeSource(value: string) {
  const normalized = normalizeText(value);
  if (!normalized) return "";
  if (normalized.startsWith("/")) {
    if (normalized.includes("contact")) return "Contact";
    if (normalized.includes("tarifs")) return "Tarifs";
    if (normalized.includes("services")) return "Services";
    if (normalized.includes("maprimerenov") || normalized.includes("cee") || normalized.includes("aides")) return "Aides rénovation";
    if (normalized.includes("gestion")) return "Gestion service";
    if (normalized.includes("declaration")) return "Déclaration service";
    if (normalized.includes("consuel")) return "Consuel service";
    if (normalized.includes("raccordement")) return "Raccordement service";
    return "Homepage";
  }
  if (normalized.includes("quiz")) return "Quiz homepage";
  if (normalized.includes("homepage") || normalized.includes("home") || normalized.includes("hero")) return "Homepage hero";
  if (normalized.includes("contact") || normalized.includes("sticky")) return "Contact";
  if (normalized.includes("calendly") || normalized.includes("booking")) return "Calendly";
  if (normalized.includes("phone") || normalized.includes("telephone")) return "Téléphone";
  if (
    normalized.includes("service") ||
    normalized.includes("declaration") ||
    normalized.includes("consuel") ||
    normalized.includes("raccordement") ||
    normalized.includes("maprimerenov") ||
    normalized.includes("cee") ||
    normalized.includes("aide") ||
    normalized.includes("tarif") ||
    normalized.includes("checklist") ||
    normalized.includes("lead-magnet")
  ) {
    return "Page service";
  }
  return value;
}

function normalizeReferrerSource(value: string) {
  const referrer = clean(value);
  if (!referrer || referrer === "direct") return "direct";
  try {
    const hostname = new URL(referrer).hostname.replace(/^www\./, "");
    if (hostname.includes("google.")) return "google";
    if (hostname.includes("bing.")) return "bing";
    if (hostname.includes("linkedin.")) return "linkedin";
    if (hostname.includes("chatgpt.") || hostname.includes("openai.")) return "chatgpt";
    if (hostname === "sunelys.fr" || hostname.endsWith(".sunelys.fr")) return "direct";
    return hostname;
  } catch {
    return referrer;
  }
}

function normalizeLandingPage(value: string, siteUrl: string) {
  const landingPage = clean(value);
  if (!landingPage) return "";
  try {
    const url = new URL(landingPage, siteUrl);
    url.hash = "";
    return url.toString();
  } catch {
    return landingPage;
  }
}

function inferLandingPageFromService(value: string) {
  const normalized = normalizeText(value);
  if (!normalized) return "";
  if (normalized.includes("declaration") || normalized.includes("prealable") || normalized.includes("dp") || normalized.includes("checklist")) {
    return "/declaration-prealable-panneaux-solaires";
  }
  if (normalized.includes("consuel")) return "/dossier-consuel-photovoltaique";
  if (normalized.includes("raccordement") || normalized.includes("enedis")) return "/raccordement-enedis-photovoltaique";
  if (normalized.includes("maprimerenov") || normalized.includes("cee") || normalized.includes("aide") || normalized.includes("renovation")) {
    return "/tarifs#aides-renovation";
  }
  if (normalized.includes("tarif")) return "/tarifs";
  if (normalized.includes("pilotage complet") || normalized.includes("gestion") || normalized.includes("administratif")) return "/services";
  return "";
}

function inferConversionType(values: {
  explicit: string;
  sourcePage: string;
  source: string;
  leadStage: string;
  blockedStage: string;
  serviceInterest: string;
  volume: string;
  message: string;
}) {
  if (values.explicit) return values.explicit;

  const signal = normalizeText(
    `${values.sourcePage} ${values.source} ${values.leadStage} ${values.blockedStage} ${values.serviceInterest} ${values.volume} ${values.message}`,
  );
  if (signal.includes("checklist") || signal.includes("lead-magnet")) return "checklist_download";
  if (signal.includes("quiz")) return "quiz_submit";
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
    signal.includes("prealable") ||
    signal.includes("maprimerenov") ||
    signal.includes("cee") ||
    signal.includes("aide") ||
    signal.includes("prime")
  ) {
    return "form_contact";
  }

  return "lead_form";
}

function inferBlockedStageFromSignals(values: {
  explicit: string;
  serviceInterest: string;
  sourcePage: string;
  source: string;
  message: string;
  conversionType: string;
}) {
  if (values.explicit) return values.explicit;

  const signal = normalizeText(`${values.sourcePage} ${values.source} ${values.message} ${values.conversionType}`);
  if (signal.includes("checklist") || signal.includes("lead-magnet")) return "Avant dépôt";
  if (signal.includes("quiz")) return "Pilotage global";
  if (values.serviceInterest.includes("Consuel")) return "Consuel à préparer";
  if (values.serviceInterest.includes("Raccordement") || values.serviceInterest.includes("enedis")) return "Raccordement en attente";
  if (
    values.serviceInterest.includes("MaPrimeRénov") ||
    values.serviceInterest.includes("CEE") ||
    values.serviceInterest.includes("Aides")
  ) {
    return "Dossier d'aide à déposer";
  }
  if (values.serviceInterest.includes("DP") || values.serviceInterest.includes("Declaration prealable")) return "Avant dépôt";
  if (signal.includes("pilotage") || signal.includes("gestion") || signal.includes("administratif")) return "Pilotage global";
  return "";
}

function inferLandingPageFromSource(value: string) {
  const source = clean(value);
  if (!source) return "";
  if (source.startsWith("/") || source.startsWith("http")) return source;

  const normalized = normalizeText(source).replace(/_/g, "-");
  for (const item of SOURCE_LANDING_PATTERNS) {
    if (item.patterns.some((pattern) => normalized.includes(pattern))) return item.path;
  }

  return "";
}

function inferUtmMedium({
  utmMedium,
  gclid,
  fbclid,
  msclkid,
  firstReferrer,
}: {
  utmMedium: string;
  gclid: string;
  fbclid: string;
  msclkid: string;
  firstReferrer: string;
}) {
  if (utmMedium) return utmMedium;
  if (gclid || msclkid) return "cpc";
  if (fbclid) return "paid_social";
  const normalizedReferrer = normalizeText(firstReferrer);
  if (normalizedReferrer.includes("google.") || normalizedReferrer.includes("bing.")) return "organic";
  if (normalizedReferrer.includes("linkedin.")) return "organic_social";
  return "";
}

function buildComment(message: string, parts: Array<[string, string]>) {
  const context = parts
    .filter(([, value]) => clean(value))
    .map(([label, value]) => `${label}: ${clean(value)}`)
    .join(" | ");

  if (message && context) return `${message}\n\n${context}`;
  return message || context;
}

function wantsJson(request: Request) {
  return request.headers.get("accept")?.includes("application/json") ?? false;
}

async function notifyLeadFailure(
  env: Record<string, string | undefined>,
  payload: Record<string, unknown>,
) {
  const webhookUrl = clean(env.LEAD_ALERT_WEBHOOK_URL ?? "");
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        event: "sunelys_lead_airtable_failure",
        occurred_at: new Date().toISOString(),
        ...payload,
      }),
    });
  } catch (error) {
    console.error("Lead failure alert failed", error);
  }
}

function jsonResponse(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

async function createAirtableLead({
  token,
  baseId,
  tableName,
  fields,
}: {
  token: string;
  baseId: string;
  tableName: string;
  fields: Record<string, string>;
}) {
  const writableFields = { ...fields };
  const removedComputedFields: string[] = [];

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await fetch(`${AIRTABLE_API_URL}/${baseId}/${encodeURIComponent(tableName)}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        records: [{ fields: writableFields }],
        typecast: true,
      }),
    });

    if (response.ok) {
      return {
        ok: true as const,
        status: response.status,
        details: "",
        removedComputedFields,
      };
    }

    const details = await response.text();
    const rejectedComputedField = parseRejectedComputedField(details);
    if (rejectedComputedField && Object.prototype.hasOwnProperty.call(writableFields, rejectedComputedField)) {
      delete writableFields[rejectedComputedField];
      removedComputedFields.push(rejectedComputedField);
      continue;
    }

    return {
      ok: false as const,
      status: response.status,
      details,
      removedComputedFields,
    };
  }

  return {
    ok: false as const,
    status: 422,
    details: "Airtable rejected too many computed fields.",
    removedComputedFields,
  };
}

function parseRejectedComputedField(details: string) {
  let message = details;
  let type = "";
  try {
    const parsed = JSON.parse(details);
    message = clean(parsed?.error?.message ?? details);
    type = clean(parsed?.error?.type ?? "");
  } catch {
    // Keep the raw Airtable response.
  }

  if (type !== "INVALID_VALUE_FOR_COLUMN" || !normalizeText(message).includes("computed")) return "";
  const match = message.match(/Field "([^"]+)"/);
  return clean(match?.[1] ?? "");
}

export const POST: APIRoute = async ({ request }) => {
  const env = import.meta.env;
  const token = clean(env.AIRTABLE_API_KEY ?? env.AIRTABLE_TOKEN ?? "");
  const baseId = clean(env.AIRTABLE_BASE_ID ?? "");
  const tableName = clean(env.AIRTABLE_LEADS_TABLE ?? "Leads");

  if (!token || !baseId) {
    return jsonResponse(
      {
        ok: false,
        error:
          "Airtable is not configured. Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID.",
      },
      500,
    );
  }

  const formData = await request.formData();
  const email = clean(formData.get("email")).toLowerCase();
  const fullName = clean(formData.get("name"));
  const splitFullName = splitName(fullName);
  const firstName = clean(formData.get("first_name")) || splitFullName.firstName;
  const lastName = clean(formData.get("last_name")) || splitFullName.lastName || fullName;
  const displayName = clean([firstName, lastName].filter(Boolean).join(" ")) || email;
  const requestReferrer = clean(request.headers.get("referer"));
  const explicitConversionType = clean(formData.get("conversion_type"));
  const explicitLeadStage = clean(formData.get("lead_stage"));
  const sourcePage = firstClean(
    formData.get("source_page"),
    formData.get("source"),
    formData.get("lead_source_detail"),
    requestReferrer,
  );
  const leadSourceDetail = firstClean(formData.get("lead_source_detail"), sourcePage);
  const qualificationHint = clean(formData.get("qualification_hint"));
  const rawNeed = firstClean(formData.get("need"), formData.get("service_interest"), sourcePage);
  const rawVolume = clean(formData.get("volume"));
  const rawTeamContext = clean(formData.get("team_context"));
  const rawUrgency = clean(formData.get("urgency"));
  const rawMessage = clean(formData.get("message"));
  const explicitBlockedStage = clean(formData.get("blocked_stage"));
  const serviceHint = firstClean(formData.get("service_interest"), rawNeed);
  const inferredServiceInterest = normalizeNeed(
    firstClean(
      serviceHint,
      sourcePage,
      leadSourceDetail,
      sourcePage.includes("/") ? sourcePage : "",
    ),
  );
  const leadStage = explicitLeadStage || "form_submitted";
  const firstReferrer = firstClean(formData.get("first_referrer"), requestReferrer, "direct");
  const gclid = clean(formData.get("gclid"));
  const fbclid = clean(formData.get("fbclid"));
  const msclkid = clean(formData.get("msclkid"));
  const utmMedium = inferUtmMedium({
    utmMedium: clean(formData.get("utm_medium")),
    gclid,
    fbclid,
    msclkid,
    firstReferrer,
  });
  const landingPageRaw = firstClean(
    formData.get("landing_page"),
    requestReferrer,
    inferLandingPageFromSource(sourcePage),
    inferLandingPageFromService(inferredServiceInterest),
  );
  const conversionType = inferConversionType({
    explicit: explicitConversionType,
    sourcePage,
    source: clean(formData.get("source")),
    leadStage,
    blockedStage: explicitBlockedStage,
    serviceInterest: inferredServiceInterest,
    volume: rawVolume,
    message: rawMessage,
  });
  const blockedStage = inferBlockedStageFromSignals({
    explicit: explicitBlockedStage,
    serviceInterest: inferredServiceInterest,
    sourcePage,
    source: clean(formData.get("source")),
    message: rawMessage,
    conversionType,
  });
  const landingPage = normalizeLandingPage(
    landingPageRaw,
    SITE_URL,
  );
  const sourceValue = normalizeSource(sourcePage);
  const utmSource = firstClean(formData.get("utm_source"), normalizeReferrerSource(firstReferrer));
  const comment = buildComment(clean(formData.get("message")), [
    ["Service", inferredServiceInterest || normalizeNeed(rawNeed)],
    ["Conversion type", conversionType],
    ["Étape", leadStage],
    ["Blocage", blockedStage],
    ["Situation", rawTeamContext],
    ["Urgence", rawUrgency],
    ["Landing page", landingPageRaw],
    ["Volume", rawVolume],
    ["Source détail", leadSourceDetail],
    ["Qualification", qualificationHint],
  ]);

  if (!email) {
    return jsonResponse({ ok: false, error: "Email is required." }, 400);
  }

  const fields: Record<string, string> = {};
  setNamedField(fields, env.AIRTABLE_FIELD_FIRST_NAME || "Prénom", firstName);
  setNamedField(fields, env.AIRTABLE_FIELD_LAST_NAME || "Nom", lastName || displayName);
  setNamedField(fields, env.AIRTABLE_FIELD_FULL_NAME || "", displayName);
  setNamedField(fields, env.AIRTABLE_FIELD_EMAIL || "Email", email);

  addOptionalField(fields, "AIRTABLE_FIELD_DATE", new Date().toISOString(), env);
  addOptionalField(fields, "AIRTABLE_FIELD_COMPANY", clean(formData.get("company")), env, "Société");
  addOptionalField(fields, "AIRTABLE_FIELD_PHONE", clean(formData.get("phone")), env, "Téléphone");
  addOptionalField(fields, "AIRTABLE_FIELD_VOLUME", normalizeVolume(rawVolume), env, "Volume dossiers/mois");
  addOptionalField(fields, "AIRTABLE_FIELD_NEED", normalizeNeed(rawNeed), env, "Besoin principal");
  addOptionalField(fields, "AIRTABLE_FIELD_MESSAGE", comment, env, "Commentaire");
  addOptionalField(fields, "AIRTABLE_FIELD_TEAM_CONTEXT", rawTeamContext, env);
  addOptionalField(fields, "AIRTABLE_FIELD_URGENCY", rawUrgency, env);
  addOptionalField(fields, "AIRTABLE_FIELD_STATUS", clean(formData.get("lead_status")), env, "Statut");
  addOptionalField(fields, "AIRTABLE_FIELD_SOURCE", sourceValue, env, "Source");
  addOptionalField(fields, "AIRTABLE_FIELD_UTM_SOURCE", utmSource, env, "UTM source");
  addOptionalField(fields, "AIRTABLE_FIELD_UTM_MEDIUM", utmMedium, env);
  addOptionalField(fields, "AIRTABLE_FIELD_UTM_CAMPAIGN", clean(formData.get("utm_campaign")), env, "UTM campaign");
  addOptionalField(fields, "AIRTABLE_FIELD_UTM_TERM", clean(formData.get("utm_term")), env);
  addOptionalField(fields, "AIRTABLE_FIELD_UTM_CONTENT", clean(formData.get("utm_content")), env);
  addOptionalField(fields, "AIRTABLE_FIELD_GCLID", gclid, env);
  addOptionalField(fields, "AIRTABLE_FIELD_FBCLID", fbclid, env);
  addOptionalField(fields, "AIRTABLE_FIELD_MSCLKID", msclkid, env);
  addOptionalField(fields, "AIRTABLE_FIELD_LANDING_PAGE", landingPage, env, "Landing page");
  addOptionalField(fields, "AIRTABLE_FIELD_FIRST_REFERRER", firstReferrer, env);

  // Keep some qualification signals in Commentaire for older/lean Airtable schemas.
  addOptionalField(fields, "AIRTABLE_FIELD_CONVERSION_TYPE", conversionType, env);
  addOptionalField(fields, "AIRTABLE_FIELD_LEAD_STAGE", leadStage, env);
  addOptionalField(fields, "AIRTABLE_FIELD_BLOCKED_STAGE", blockedStage, env);
  addOptionalField(fields, "AIRTABLE_FIELD_SERVICE_INTEREST", inferredServiceInterest || rawNeed, env);
  addOptionalField(fields, "AIRTABLE_FIELD_LEAD_SOURCE_DETAIL", leadSourceDetail, env);
  addOptionalField(fields, "AIRTABLE_FIELD_QUALIFICATION_HINT", qualificationHint, env);
  addOptionalField(fields, "AIRTABLE_FIELD_PIPELINE", clean(formData.get("lead_pipeline")), env);
  addOptionalField(fields, "AIRTABLE_FIELD_OWNER", clean(formData.get("lead_owner")), env);
  addOptionalField(fields, "AIRTABLE_FIELD_FOLLOW_UP_SLA", clean(formData.get("follow_up_sla")), env);

  const createResult = await createAirtableLead({
    token,
    baseId,
    tableName,
    fields,
  });

  if (!createResult.ok) {
    console.error("Airtable lead creation failed", createResult.details);
    await notifyLeadFailure(env, {
      reason: "airtable_create_failed",
      airtable_status: createResult.status,
      airtable_details: createResult.details.slice(0, 2000),
      removed_computed_fields: createResult.removedComputedFields,
      lead: {
        email,
        firstName,
        lastName,
        company: clean(formData.get("company")),
        phone: clean(formData.get("phone")),
        volume: normalizeVolume(rawVolume),
        need: normalizeNeed(rawNeed),
        team_context: rawTeamContext,
        urgency: rawUrgency,
        conversion_type: conversionType,
        lead_stage: leadStage,
        blocked_stage: blockedStage,
        service_interest: inferredServiceInterest || rawNeed,
        lead_source_detail: leadSourceDetail,
        qualification_hint: qualificationHint,
        pipeline: clean(formData.get("lead_pipeline")),
        owner: clean(formData.get("lead_owner")),
        follow_up_sla: clean(formData.get("follow_up_sla")),
        source: sourceValue,
        first_referrer: firstReferrer,
        landing_page: landingPage,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: clean(formData.get("utm_campaign")),
        utm_term: clean(formData.get("utm_term")),
        utm_content: clean(formData.get("utm_content")),
        gclid,
        fbclid,
        msclkid,
      },
    });
    return jsonResponse({ ok: false, error: "Airtable lead creation failed." }, 502);
  }

  if (wantsJson(request)) return jsonResponse({ ok: true });

  const nextUrl = clean(formData.get("_next")) || "/merci";
  return Response.redirect(nextUrl, 303);
};
