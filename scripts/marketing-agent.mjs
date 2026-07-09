#!/usr/bin/env node
import { createSign } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_SITE_URL = "https://sunelys.fr";
const DEFAULT_MODEL = "gpt-5.5";
const REPORT_ROOT = path.join(ROOT, "reports", "marketing-agent");
const AIRTABLE_API_URL = "https://api.airtable.com/v0";

const args = process.argv.slice(2);

await loadEnvFile(".env");
await loadEnvFile(".env.local", { override: true });

const options = {
  apply: hasFlag("--apply"),
  noAi: hasFlag("--no-ai"),
  pagespeed: hasFlag("--pagespeed") || isTruthy(process.env.MARKETING_AGENT_PAGESPEED),
  days: Number(getArgValue("--days") ?? process.env.MARKETING_AGENT_LOOKBACK_DAYS ?? 90),
  liveUrl: stripTrailingSlash(
    getArgValue("--live-url") ?? process.env.MARKETING_AGENT_LIVE_URL ?? DEFAULT_SITE_URL,
  ),
  outputRoot: getArgValue("--output-dir")
    ? path.resolve(ROOT, getArgValue("--output-dir"))
    : REPORT_ROOT,
};

const runId = new Date().toISOString().replace(/[:.]/g, "-");
const runDir = path.join(options.outputRoot, runId);

const strategySchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "executive_summary",
    "diagnosis",
    "priority_actions",
    "safe_apply_actions",
    "content_opportunities",
    "sea_notes",
    "measurement_plan",
    "risks",
  ],
  properties: {
    executive_summary: { type: "string" },
    diagnosis: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["area", "finding", "impact", "evidence"],
        properties: {
          area: { type: "string" },
          finding: { type: "string" },
          impact: { type: "string" },
          evidence: { type: "string" },
        },
      },
    },
    priority_actions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["priority", "title", "rationale", "expected_impact", "effort", "pages", "applyable"],
        properties: {
          priority: { type: "string", enum: ["P0", "P1", "P2", "P3"] },
          title: { type: "string" },
          rationale: { type: "string" },
          expected_impact: { type: "string" },
          effort: { type: "string", enum: ["S", "M", "L"] },
          pages: { type: "array", items: { type: "string" } },
          applyable: { type: "boolean" },
        },
      },
    },
    safe_apply_actions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "type", "file", "reason"],
        properties: {
          id: { type: "string" },
          type: { type: "string" },
          file: { type: "string" },
          reason: { type: "string" },
        },
      },
    },
    content_opportunities: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["topic", "intent", "target_keyword", "recommended_asset", "internal_links"],
        properties: {
          topic: { type: "string" },
          intent: { type: "string" },
          target_keyword: { type: "string" },
          recommended_asset: { type: "string" },
          internal_links: { type: "array", items: { type: "string" } },
        },
      },
    },
    sea_notes: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["campaign", "hypothesis", "landing_page", "measurement"],
        properties: {
          campaign: { type: "string" },
          hypothesis: { type: "string" },
          landing_page: { type: "string" },
          measurement: { type: "string" },
        },
      },
    },
    measurement_plan: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["event_or_metric", "why", "implementation_note"],
        properties: {
          event_or_metric: { type: "string" },
          why: { type: "string" },
          implementation_note: { type: "string" },
        },
      },
    },
    risks: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["risk", "severity", "mitigation"],
        properties: {
          risk: { type: "string" },
          severity: { type: "string", enum: ["low", "medium", "high"] },
          mitigation: { type: "string" },
        },
      },
    },
  },
};

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});

async function main() {
  await mkdir(runDir, { recursive: true });

  const localAudit = await collectLocalSiteAudit();
  const externalData = await collectExternalData();
  const strategy = await buildMarketingStrategy(localAudit, externalData);
  const applied = options.apply ? await applySafeFixes(localAudit) : [];

  const manifest = {
    runId,
    generatedAt: new Date().toISOString(),
    mode: options.apply ? "apply" : "audit",
    siteUrl: options.liveUrl,
    lookbackDays: options.days,
    ai: {
      enabled: Boolean(process.env.OPENAI_API_KEY && !options.noAi),
      model: process.env.MARKETING_AGENT_MODEL ?? DEFAULT_MODEL,
    },
    externalSources: summarizeExternalSources(externalData),
    files: {
      report: path.relative(ROOT, path.join(runDir, "audit.md")),
      localAudit: path.relative(ROOT, path.join(runDir, "local-audit.json")),
      externalData: path.relative(ROOT, path.join(runDir, "external-data.json")),
      strategy: path.relative(ROOT, path.join(runDir, "strategy.json")),
    },
  };

  await writeJson(path.join(runDir, "manifest.json"), manifest);
  await writeJson(path.join(runDir, "local-audit.json"), localAudit);
  await writeJson(path.join(runDir, "external-data.json"), externalData);
  await writeJson(path.join(runDir, "strategy.json"), strategy);
  await writeJson(path.join(runDir, "applied-actions.json"), applied);

  const report = renderMarkdownReport({ manifest, localAudit, externalData, strategy, applied });
  await writeFile(path.join(runDir, "audit.md"), report, "utf8");
  await writeFile(path.join(options.outputRoot, "latest.md"), report, "utf8");
  await writeJson(path.join(options.outputRoot, "latest.json"), { manifest, strategy, applied });

  console.log(`Marketing agent report: ${path.relative(ROOT, path.join(runDir, "audit.md"))}`);
  console.log(`Mode: ${manifest.mode}`);
  console.log(`Issues found: ${localAudit.issues.length}`);
  console.log(`Priority actions: ${strategy.priority_actions.length}`);
  if (!process.env.OPENAI_API_KEY || options.noAi) {
    console.log("AI synthesis skipped; rule-based strategy generated.");
  }
  if (applied.length > 0) {
    console.log(`Safe fixes applied: ${applied.length}`);
  }
}

async function collectLocalSiteAudit() {
  const blogPosts = await readBlogPosts();
  const pageFiles = await walk(path.join(ROOT, "src", "pages"), [".astro", ".ts"]);
  const sourceFiles = await walk(path.join(ROOT, "src"), [".astro", ".ts", ".md"]);
  const editorialStatus = await readEditorialStatus();

  const staticRoutes = pageFiles
    .map((file) => routeFromPageFile(file))
    .filter(Boolean)
    .sort();

  const publicBlogPosts = blogPosts.filter((post) => post.publicationStatus !== "backlog");
  const hiddenBlogFiles = new Set(
    blogPosts
      .filter((post) => post.publicationStatus === "backlog")
      .map((post) => post.file),
  );
  const publicRoutes = new Set([
    ...staticRoutes,
    ...publicBlogPosts.map((post) => `/blog/${post.slug}`),
    "/blog",
    "/sitemap.xml",
  ].map(normalizeRoute));
  const allBlogRoutes = new Set(blogPosts.map((post) => normalizeRoute(`/blog/${post.slug}`)));

  const issues = [];
  const safeFixes = [];

  addMetadataIssues({ blogPosts, issues, safeFixes, editorialStatus });
  await addAssetIssues({ blogPosts, issues });
  await addLinkIssues({ sourceFiles, hiddenBlogFiles, publicRoutes, allBlogRoutes, issues });

  const tracking = await collectTrackingSummary(sourceFiles);

  return {
    generatedAt: new Date().toISOString(),
    root: ROOT,
    siteUrl: options.liveUrl,
    staticRoutes,
    routeCounts: {
      static: staticRoutes.length,
      blogTotal: blogPosts.length,
      blogPublic: publicBlogPosts.length,
      blogBacklog: blogPosts.length - publicBlogPosts.length,
    },
    blogPosts: blogPosts.map((post) => ({
      file: path.relative(ROOT, post.file),
      slug: post.slug,
      title: post.frontmatter.title ?? "",
      seoTitle: post.frontmatter.seoTitle ?? "",
      description: post.frontmatter.description ?? "",
      category: post.frontmatter.category ?? "",
      publicationStatus: post.publicationStatus,
      pubDate: post.frontmatter.pubDate ?? "",
      updatedDate: post.frontmatter.updatedDate ?? "",
      keywords: post.frontmatter.keywords ?? "",
      wordCount: post.wordCount,
      headings: post.headings,
    })),
    editorialStatus,
    tracking,
    issues,
    safeFixes,
  };
}

function addMetadataIssues({ blogPosts, issues, safeFixes, editorialStatus }) {
  const titles = new Map();
  const descriptions = new Map();

  for (const post of blogPosts) {
    const rel = path.relative(ROOT, post.file);
    const title = post.frontmatter.seoTitle || post.frontmatter.title || "";
    const description = post.frontmatter.description || "";
    const status = post.publicationStatus;

    if (!post.frontmatter.updatedDate && post.frontmatter.pubDate) {
      safeFixes.push({
        id: `set-updated-date-${post.slug}`,
        type: "frontmatter_set",
        file: rel,
        field: "updatedDate",
        value: post.frontmatter.pubDate,
        reason: "Aligner explicitement updatedDate sur pubDate quand aucune mise a jour distincte n'est declaree.",
      });
    }

    if (editorialStatus.backlogSlugs.includes(post.slug) && status !== "backlog") {
      safeFixes.push({
        id: `protect-backlog-${post.slug}`,
        type: "frontmatter_set",
        file: rel,
        field: "publicationStatus",
        value: "backlog",
        reason: "Le garde-fou editorial classe ce slug en backlog; le frontmatter doit empecher sa publication accidentelle.",
      });
      issues.push(issue("high", "Editorial guardrails", "Backlog non protege", `${rel} est liste en backlog mais n'a pas publicationStatus: backlog.`, "Ajouter publicationStatus: backlog avant tout build/deploiement."));
    }

    if (!post.frontmatter.seoTitle) {
      issues.push(issue("medium", "SEO metadata", "seoTitle manquant", `${rel} n'a pas de seoTitle dedie.`, "Ajouter un titre SEO distinct quand le H1 editorial n'est pas optimal pour la SERP."));
    }

    if (title.length > 65) {
      issues.push(issue("medium", "SEO metadata", "Titre SEO long", `${rel} contient un titre de ${title.length} caracteres.`, "Raccourcir le titre autour de l'intention principale et de la marque."));
    } else if (title.length > 0 && title.length < 35) {
      issues.push(issue("low", "SEO metadata", "Titre SEO court", `${rel} contient un titre de ${title.length} caracteres.`, "Verifier que le titre porte assez de contexte et d'intention."));
    }

    if (description.length > 165) {
      issues.push(issue("medium", "SEO metadata", "Meta description longue", `${rel} contient une description de ${description.length} caracteres.`, "Reduire la description pour garder le message principal visible en SERP."));
    } else if (description.length > 0 && description.length < 95) {
      issues.push(issue("low", "SEO metadata", "Meta description courte", `${rel} contient une description de ${description.length} caracteres.`, "Ajouter cible, probleme et benefice pour renforcer le taux de clic."));
    }

    if (post.wordCount < 500 && status !== "backlog") {
      issues.push(issue("medium", "Content depth", "Article public court", `${rel} contient environ ${post.wordCount} mots.`, "Verifier que l'intention est couverte: contexte, erreurs, process, CTA, liens internes."));
    }

    if (!post.frontmatter.keywords) {
      issues.push(issue("low", "SEO metadata", "Keywords internes manquants", `${rel} n'a pas de champ keywords.`, "Ajouter les requetes cibles pour faciliter les audits et le maillage."));
    }

    addToGroup(titles, title, rel);
    addToGroup(descriptions, description, rel);
  }

  for (const [title, files] of titles) {
    if (title && files.length > 1) {
      issues.push(issue("medium", "SEO metadata", "Titre duplique", `${files.length} contenus partagent "${title}".`, "Differencier les titres par intention, etape du parcours ou cible."));
    }
  }

  for (const [description, files] of descriptions) {
    if (description && files.length > 1) {
      issues.push(issue("medium", "SEO metadata", "Description dupliquee", `${files.length} contenus partagent la meme meta description.`, "Recrire chaque description selon l'intention precise de la page."));
    }
  }
}

async function addAssetIssues({ blogPosts, issues }) {
  for (const post of blogPosts) {
    const rel = path.relative(ROOT, post.file);
    for (const field of ["coverImage", "ogImage"]) {
      const asset = post.frontmatter[field];
      if (!asset) {
        issues.push(issue("low", "Media", `${field} manquant`, `${rel} n'a pas de ${field}.`, "Ajouter un visuel dedie pour ameliorer partage social et lisibilite blog."));
        continue;
      }
      if (asset.startsWith("/") && !(await fileExists(path.join(ROOT, "public", asset)))) {
        issues.push(issue("high", "Media", `${field} introuvable`, `${rel} reference ${asset}.`, "Ajouter le fichier public ou corriger le chemin."));
      }
    }

    if (post.frontmatter.coverImage && !post.frontmatter.coverAlt) {
      issues.push(issue("medium", "Accessibility", "Alt image manquant", `${rel} a une coverImage sans coverAlt.`, "Ajouter un alt descriptif oriente contexte metier."));
    }
  }
}

async function addLinkIssues({ sourceFiles, hiddenBlogFiles, publicRoutes, allBlogRoutes, issues }) {
  const seen = new Set();

  for (const file of sourceFiles) {
    if (hiddenBlogFiles.has(file)) continue;
    if (path.relative(ROOT, file) === "src/data/seoPages.ts") continue;

    const text = await readFile(file, "utf8");
    const rel = path.relative(ROOT, file);
    const links = file.endsWith(".md")
      ? extractMarkdownVisibleLinks(text)
      : extractLocalLinks(text);

    for (const href of links) {
      const route = normalizeLocalHref(href);
      if (!route) continue;

      const key = `${rel}:${route}`;
      if (seen.has(key)) continue;
      seen.add(key);

      if (isPublicAssetRoute(route)) {
        const assetPath = path.join(ROOT, "public", route);
        if (!(await fileExists(assetPath))) {
          issues.push(issue("high", "Internal links", "Asset introuvable", `${rel} reference ${href}.`, "Corriger le chemin ou ajouter l'asset public."));
        }
        continue;
      }

      if (publicRoutes.has(route)) continue;

      if (allBlogRoutes.has(route)) {
        issues.push(issue("medium", "Internal links", "Lien vers contenu en backlog", `${rel} reference ${href}, qui n'est pas public.`, "Retirer le lien visible ou publier le contenu dans l'ordre editorial."));
        continue;
      }

      if (route.startsWith("/api/")) continue;

      issues.push(issue("high", "Internal links", "Lien interne inconnu", `${rel} reference ${href}.`, "Corriger la route ou creer la page cible."));
    }
  }
}

async function collectTrackingSummary(sourceFiles) {
  const events = new Map();

  for (const file of sourceFiles) {
    const text = await readFile(file, "utf8");
    for (const match of text.matchAll(/data-track=["']([^"']+)["']/g)) {
      addToGroup(events, match[1], path.relative(ROOT, file));
    }
    for (const match of text.matchAll(/trackEvent\(["']([^"']+)["']/g)) {
      addToGroup(events, match[1], path.relative(ROOT, file));
    }
  }

  return {
    eventCount: events.size,
    events: [...events.entries()]
      .map(([name, files]) => ({ name, files: [...new Set(files)].sort() }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  };
}

async function collectExternalData() {
  const [searchConsole, ga4, pagespeed, leads] = await Promise.all([
    collectSearchConsoleData(),
    collectGa4Data(),
    collectPageSpeedData(),
    collectLeadData(),
  ]);

  return {
    generatedAt: new Date().toISOString(),
    dateRange: dateRangeForLookback(options.days),
    searchConsole,
    ga4,
    pagespeed,
    leads: enrichLeadDataWithGa4(leads, ga4),
  };
}

async function collectSearchConsoleData() {
  const siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL ?? `${options.liveUrl}/`;
  const googleAuth = await readGoogleAuth();

  if (!googleAuth) {
    return skipped("Authentification Google absente. Configurer OAuth local ou compte de service.");
  }

  try {
    const token = await getGoogleAccessToken(googleAuth, [
      "https://www.googleapis.com/auth/webmasters.readonly",
    ]);
    const { startDate, endDate } = dateRangeForLookback(options.days, 3);
    const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ["query", "page"],
        rowLimit: Number(process.env.SEARCH_CONSOLE_ROW_LIMIT ?? 5000),
        type: "web",
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return failed(`Search Console API ${response.status}: ${JSON.stringify(data).slice(0, 800)}`);
    }

    const rows = data.rows ?? [];
    return {
      status: "ok",
      siteUrl,
      startDate,
      endDate,
      rowCount: rows.length,
      topQueries: rows.slice(0, 25).map((row) => ({
        query: row.keys?.[0] ?? "",
        page: row.keys?.[1] ?? "",
        clicks: row.clicks ?? 0,
        impressions: row.impressions ?? 0,
        ctr: row.ctr ?? 0,
        position: row.position ?? 0,
      })),
      opportunityQueries: rows
        .filter((row) => (row.impressions ?? 0) >= 20 && (row.position ?? 99) > 4 && (row.position ?? 99) <= 20)
        .slice(0, 50)
        .map((row) => ({
          query: row.keys?.[0] ?? "",
          page: row.keys?.[1] ?? "",
          impressions: row.impressions ?? 0,
          clicks: row.clicks ?? 0,
          ctr: row.ctr ?? 0,
          position: row.position ?? 0,
        })),
    };
  } catch (error) {
    return failed(error.message);
  }
}

async function collectGa4Data() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const googleAuth = await readGoogleAuth();

  if (!propertyId) {
    return skipped("GA4_PROPERTY_ID absent.");
  }
  if (!googleAuth) {
    return skipped("Authentification Google absente. Configurer OAuth local ou compte de service.");
  }

  try {
    const token = await getGoogleAccessToken(googleAuth, [
      "https://www.googleapis.com/auth/analytics.readonly",
    ]);
    const { startDate, endDate } = dateRangeForLookback(options.days, 1);
    const endpoint = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;

    const landingPages = await ga4RunReport(endpoint, token, {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "landingPagePlusQueryString" }, { name: "sessionDefaultChannelGroup" }],
      metrics: [
        { name: "sessions" },
        { name: "activeUsers" },
        { name: "screenPageViews" },
        { name: "eventCount" },
      ],
      limit: "100",
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    });

    const events = await ga4RunReport(endpoint, token, {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      limit: "100",
      orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
    });

    return {
      status: "ok",
      propertyId,
      startDate,
      endDate,
      landingPages: normalizeGaRows(landingPages),
      events: normalizeGaRows(events),
    };
  } catch (error) {
    return failed(error.message);
  }
}

async function ga4RunReport(endpoint, token, body) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`GA4 Data API ${response.status}: ${JSON.stringify(data).slice(0, 800)}`);
  }
  return data;
}

function normalizeGaRows(report) {
  const dimensions = report.dimensionHeaders?.map((header) => header.name) ?? [];
  const metrics = report.metricHeaders?.map((header) => header.name) ?? [];
  return (report.rows ?? []).map((row) => {
    const item = {};
    dimensions.forEach((name, index) => {
      item[name] = row.dimensionValues?.[index]?.value ?? "";
    });
    metrics.forEach((name, index) => {
      item[name] = Number(row.metricValues?.[index]?.value ?? 0);
    });
    return item;
  });
}

async function collectPageSpeedData() {
  if (!options.pagespeed) {
    return skipped("Desactive par defaut. Utiliser --pagespeed ou MARKETING_AGENT_PAGESPEED=1.");
  }

  const apiKey = process.env.PAGESPEED_API_KEY;
  const categories = ["performance", "accessibility", "best-practices", "seo"];
  const strategies = ["mobile", "desktop"];
  const results = [];

  for (const strategy of strategies) {
    const url = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
    url.searchParams.set("url", options.liveUrl);
    url.searchParams.set("strategy", strategy);
    categories.forEach((category) => url.searchParams.append("category", category));
    if (apiKey) url.searchParams.set("key", apiKey);

    try {
      const response = await fetch(url);
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        results.push({ strategy, status: "failed", reason: JSON.stringify(data).slice(0, 800) });
        continue;
      }
      const lighthouseCategories = data.lighthouseResult?.categories ?? {};
      results.push({
        strategy,
        status: "ok",
        requestedUrl: data.id,
        scores: Object.fromEntries(
          Object.entries(lighthouseCategories).map(([key, value]) => [key, value.score]),
        ),
      });
    } catch (error) {
      results.push({ strategy, status: "failed", reason: error.message });
    }
  }

  return { status: results.some((result) => result.status === "ok") ? "ok" : "failed", results };
}

async function collectLeadData() {
  const token = cleanEnv(process.env.AIRTABLE_API_KEY ?? process.env.AIRTABLE_TOKEN ?? "");
  const baseId = cleanEnv(process.env.AIRTABLE_BASE_ID ?? "");
  const tableName = cleanEnv(process.env.AIRTABLE_LEADS_TABLE ?? "Leads");

  if (!token || !baseId) {
    return skipped("Airtable absent. Configurer AIRTABLE_API_KEY et AIRTABLE_BASE_ID pour le reporting leads.");
  }

  try {
    const { startDate, endDate } = dateRangeForLookback(options.days);
    const records = await fetchAirtableRecords({ token, baseId, tableName });
    const fieldMap = buildLeadFieldMap();
    const leads = records
      .map((record) => normalizeLeadRecord(record, fieldMap))
      .filter((lead) => isLeadInRange(lead, startDate, endDate));

    return {
      status: "ok",
      tableName,
      startDate,
      endDate,
      recordCount: records.length,
      inRangeCount: leads.length,
      ...summarizeLeads(leads),
    };
  } catch (error) {
    return failed(error.message);
  }
}

async function fetchAirtableRecords({ token, baseId, tableName }) {
  const records = [];
  const maxRecords = Number(process.env.MARKETING_LEADS_MAX_RECORDS ?? 5000);
  let offset = "";

  do {
    const url = new URL(`${AIRTABLE_API_URL}/${baseId}/${encodeURIComponent(tableName)}`);
    url.searchParams.set("pageSize", "100");
    url.searchParams.set("maxRecords", String(maxRecords));
    const view = cleanEnv(process.env.MARKETING_LEADS_VIEW ?? process.env.AIRTABLE_LEADS_VIEW ?? "");
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
      throw new Error(`Airtable API ${response.status}: ${JSON.stringify(data).slice(0, 800)}`);
    }

    records.push(...(data.records ?? []));
    offset = data.offset ?? "";
  } while (offset && records.length < maxRecords);

  return records.slice(0, maxRecords);
}

function buildLeadFieldMap() {
  const byRole = {
    createdAt: fieldCandidates("AIRTABLE_FIELD_DATE", ["Date entree", "Date entrée", "Date", "Created Time"]),
    email: fieldCandidates("AIRTABLE_FIELD_EMAIL", ["Email"]),
    company: fieldCandidates("AIRTABLE_FIELD_COMPANY", ["Societe", "Société", "Entreprise", "Company"]),
    phone: fieldCandidates("AIRTABLE_FIELD_PHONE", ["Telephone", "Téléphone", "Phone"]),
    volume: fieldCandidates("AIRTABLE_FIELD_VOLUME", ["Volume", "Volume mensuel", "Volume dossiers/mois"]),
    need: fieldCandidates("AIRTABLE_FIELD_NEED", ["Besoin", "Besoin principal", "Need"]),
    message: fieldCandidates("AIRTABLE_FIELD_MESSAGE", ["Message"]),
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
    qualificationHint: fieldCandidates("AIRTABLE_FIELD_QUALIFICATION_HINT", [
      "Signal qualification",
      "Qualification",
    ]),
    status: fieldCandidates("AIRTABLE_FIELD_STATUS", ["Statut", "Status"]),
    pipeline: fieldCandidates("AIRTABLE_FIELD_PIPELINE", ["Pipeline"]),
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
  };
  return byRole;
}

function fieldCandidates(envName, fallbackNames) {
  return uniqueValues([cleanEnv(process.env[envName] ?? ""), ...fallbackNames]);
}

function normalizeLeadRecord(record, fieldMap) {
  const fields = record.fields ?? {};
  const read = (role) => readAirtableField(fields, fieldMap[role] ?? []);
  const message = cleanEnv(read("message"));
  const sourceFromMessage = extractContextValue(message, ["Source détail", "Source detail", "Source"]);
  const landingFromMessage = extractContextValue(message, [
    "Landing page",
    "Page d'atterrissage",
    "Landing",
  ]);
  const volumeFromMessage = extractContextValue(message, ["Volume", "Volume mensuel", "Volume dossiers/mois"]);
  const serviceFromMessage = extractContextValue(message, ["Service", "Besoin", "Need"]);
  const conversionFromMessage = extractContextValue(message, ["Conversion", "Type de conversion", "Type conversion", "Conversion type"]);
  const leadStage = cleanEnv(read("leadStage"));
  const source = cleanEnv(read("source")) || sourceFromMessage;
  const sourceDetail = cleanEnv(read("leadSourceDetail"));
  const conversionType = inferConversionTypeFromContext({
    conversionType: cleanEnv(read("conversionType")),
    conversionFromMessage,
    leadStage,
    source,
    sourceDetail,
    message,
  });
  const serviceInterest = inferServiceFromContext({
    service: cleanEnv(read("serviceInterest")) || cleanEnv(read("need")) || serviceFromMessage,
    source,
    sourceDetail,
    conversionType,
    message,
  });
  const blockedStage = inferBlockedStageFromContext({
    blockedStage: cleanEnv(read("blockedStage")) ||
      extractContextValue(message, [
        "Blocage",
        "Etape bloquee",
        "Étape bloquée",
        "Etape administrative bloquee",
        "Étape administrative bloquée",
        "Blocked stage",
      ]),
    service: serviceInterest,
    source,
    sourceDetail,
    conversionType,
    message,
  });
  const lead = {
    createdAt: parseLeadDate(read("createdAt")) ?? record.createdTime ?? "",
    landingPage: normalizeLandingPage(
      cleanEnv(read("landingPage")) || source || sourceDetail || landingFromMessage || sourceFromMessage,
    ),
    source,
    sourceDetail: sourceDetail || sourceFromMessage,
    channel: normalizeLeadChannel({
      utmSource: read("utmSource"),
      utmMedium: read("utmMedium"),
      firstReferrer: read("firstReferrer"),
      source,
      sourceDetail: sourceDetail || sourceFromMessage,
      gclid: read("gclid"),
      fbclid: read("fbclid"),
      msclkid: read("msclkid"),
    }),
    serviceInterest,
    conversionType: conversionType || "unknown",
    blockedStage,
    leadStage,
    status: cleanEnv(read("status")) || "unknown",
    pipeline: cleanEnv(read("pipeline")),
    volume: cleanEnv(read("volume")) || volumeFromMessage || "unknown",
    hasEmail: Boolean(cleanEnv(read("email"))),
    hasCompany: Boolean(cleanEnv(read("company"))),
    hasPhone: Boolean(cleanEnv(read("phone"))),
    hasNeed: Boolean(cleanEnv(read("need"))),
    hasMessage: Boolean(message),
  };
  const quality = scoreLeadQuality(lead);
  return {
    ...lead,
    qualityScore: quality.score,
    qualitySegment: quality.segment,
    qualified: quality.qualified,
    disqualified: quality.disqualified,
  };
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

function extractContextValue(text, labels) {
  const value = cleanEnv(text);
  if (!value) return "";

  const labelPattern = labels.map(escapeRegExp).join("|");
  const match = value.match(new RegExp(`(?:^|\\|)\\s*(?:${labelPattern})\\s*:\\s*([^|]+)`, "i"));
  return cleanEnv(match?.[1] ?? "");
}

function stringifyAirtableValue(value) {
  if (value == null) return "";
  if (typeof value === "string") return cleanEnv(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(stringifyAirtableValue).filter(Boolean).join(", ");
  if (typeof value === "object") {
    if (typeof value.name === "string") return value.name;
    if (typeof value.email === "string") return value.email;
    return JSON.stringify(value);
  }
  return String(value);
}

function parseLeadDate(value) {
  const cleaned = cleanEnv(value);
  if (!cleaned) return "";
  const date = new Date(cleaned);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function isLeadInRange(lead, startDate, endDate) {
  const day = cleanEnv(lead.createdAt).slice(0, 10);
  if (!day) return true;
  return day >= startDate && day <= endDate;
}

function normalizeLeadChannel({ utmSource, utmMedium, firstReferrer, source, sourceDetail, gclid, fbclid, msclkid }) {
  const sourceText = normalizeText([utmSource, utmMedium, source, sourceDetail, firstReferrer].join(" "));
  if (cleanEnv(gclid)) return "Paid Search";
  if (cleanEnv(msclkid)) return "Paid Search";
  if (cleanEnv(fbclid)) return "Paid Social";
  if (sourceText.includes("google") && sourceText.includes("organic")) return "Organic Search";
  if (sourceText.includes("organic") || sourceText.includes("search")) return "Organic Search";
  if (sourceText.includes("cpc") || sourceText.includes("paid") || sourceText.includes("ads")) return "Paid Search";
  if (sourceText.includes("linkedin") || sourceText.includes("social")) return "Organic Social";
  if (sourceText.includes("chatgpt") || sourceText.includes("openai") || sourceText.includes("perplexity")) {
    return "AI Assistant";
  }
  if (
    sourceText.includes("quiz") ||
    sourceText.includes("hero") ||
    sourceText.includes("homepage") ||
    sourceText.includes("contact") ||
    sourceText.includes("sticky") ||
    sourceText.includes("service") ||
    sourceText.includes("consuel") ||
    sourceText.includes("raccordement") ||
    sourceText.includes("declaration") ||
    sourceText.includes("gestion") ||
    sourceText.includes("tarif") ||
    sourceText.includes("lead-magnet") ||
    sourceText.includes("landing")
  ) {
    return "Direct";
  }
  if (cleanEnv(firstReferrer)) return normalizeReferrerChannel(firstReferrer);
  if (sourceText.includes("direct")) return "Direct";
  return "Unknown";
}

function normalizeReferrerChannel(referrer) {
  const value = cleanEnv(referrer);
  if (!value) return "Unknown";
  try {
    const hostname = new URL(value).hostname.replace(/^www\./, "");
    if (hostname.includes("google.")) return "Organic Search";
    if (hostname.includes("bing.")) return "Organic Search";
    if (hostname.includes("linkedin.")) return "Organic Social";
    if (hostname.includes("chatgpt.") || hostname.includes("openai.")) return "AI Assistant";
    return "Referral";
  } catch {
    return "Referral";
  }
}

function normalizeLandingPage(value) {
  const cleaned = cleanEnv(value);
  if (!cleaned || cleaned === "(not set)") return "unknown";
  try {
    const url = cleaned.startsWith("http") ? new URL(cleaned) : new URL(cleaned, options.liveUrl);
    const pathName = url.pathname.replace(/\/$/, "") || "/";
    return pathName;
  } catch {
    const withoutQuery = cleaned.split("?")[0].replace(/\/$/, "") || "/";
    return withoutQuery.startsWith("/") ? withoutQuery : `/${withoutQuery}`;
  }
}

function inferServiceFromContext({ service, source, sourceDetail, conversionType, message }) {
  const normalizedService = normalizeText(service);
  if (normalizedService) return service;

  const signalText = normalizeText(`${source} ${sourceDetail} ${conversionType} ${message}`);
  if (signalText.includes("consuel")) return "Consuel";
  if (signalText.includes("raccordement") || signalText.includes("enedis")) {
    return "Raccordement Enedis";
  }

  if (signalText.includes("declaration") || signalText.includes("prealable")) {
    return "Declaration prealable";
  }

  if (signalText.includes("quiz") || signalText.includes("lead-magnet") || signalText.includes("checklist")) {
    return "Pilotage complet";
  }

  if (signalText.includes("tarif") || signalText.includes("gestion") || signalText.includes("administratif")) {
    return "Pilotage complet";
  }

  return "unknown";
}

function inferConversionTypeFromContext({ conversionType, conversionFromMessage, leadStage, source, sourceDetail, message }) {
  const explicit = cleanEnv(conversionType);
  if (explicit) return explicit;
  if (conversionFromMessage) return conversionFromMessage;

  const signal = normalizeText(`${leadStage} ${source} ${sourceDetail} ${message}`);
  if (signal.includes("quiz") || signal.includes("lead_magnet") || signal.includes("lead magnet")) {
    if (signal.includes("checklist")) return "checklist_download";
    return "quiz_submit";
  }
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

  if (signal.includes("booking") || signal.includes("calendly") || signal.includes("rdv")) return "booking";
  if (signal.includes("email")) return "email_click";

  return "lead_form";
}

function inferBlockedStageFromContext({ blockedStage, service, source, sourceDetail, conversionType, message }) {
  if (cleanEnv(blockedStage)) return blockedStage;

  const signalText = normalizeText(`${service} ${source} ${sourceDetail} ${conversionType} ${message}`);

  if (signalText.includes("lead-magnet") || signalText.includes("checklist") || signalText.includes("lead_magnet")) {
    return "Avant dépôt";
  }

  const serviceText = normalizeText(service);
  if (serviceText.includes("consuel")) return "Consuel à préparer";
  if (serviceText.includes("raccordement") || serviceText.includes("enedis")) return "Raccordement en attente";
  if (serviceText.includes("declaration") || serviceText.includes("prealable")) return "Avant dépôt";
  if (serviceText.includes("pilotage")) return "Pilotage global";

  if (signalText.includes("quiz")) return "Pilotage global";
  if (signalText.includes("hero") || signalText.includes("sticky") || signalText.includes("contact")) return "Pilotage global";

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
  if (disqualified) {
    return { score: 0, segment: "disqualified", qualified: false, disqualified: true };
  }

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
  if ("form_contact" === conversion || conversion.includes("diagnostic") || conversion.includes("contact") || conversion.includes("cadrage")) {
    score += 12;
  }
  if ("quiz_submit" === conversion || conversion.includes("quiz")) {
    score += 8;
  }
  if ("checklist_download" === conversion || conversion.includes("checklist") || conversion.includes("lead_magnet")) {
    score += 5;
  }

  const boundedScore = Math.min(score, 100);
  return {
    score: boundedScore,
    segment: boundedScore >= 75 ? "hot" : boundedScore >= 55 ? "qualified" : boundedScore >= 30 ? "nurture" : "low_signal",
    qualified: boundedScore >= 55,
    disqualified: false,
  };
}

function summarizeLeads(leads) {
  const totals = {
    leads: leads.length,
    qualified: leads.filter((lead) => lead.qualified).length,
    hot: leads.filter((lead) => lead.qualitySegment === "hot").length,
    nurture: leads.filter((lead) => lead.qualitySegment === "nurture").length,
    lowSignal: leads.filter((lead) => lead.qualitySegment === "low_signal").length,
    disqualified: leads.filter((lead) => lead.disqualified).length,
    averageScore: average(leads.map((lead) => lead.qualityScore)),
  };

  return {
    totals,
    qualificationGaps: {
      missingLandingPage: leads.filter((lead) => lead.landingPage === "unknown").length,
      missingChannel: leads.filter((lead) => lead.channel === "Unknown").length,
      missingServiceInterest: leads.filter((lead) => lead.serviceInterest === "unknown").length,
      missingBlockedStage: leads.filter((lead) => lead.blockedStage === "unknown").length,
      missingVolume: leads.filter((lead) => lead.volume === "unknown").length,
      missingCompany: leads.filter((lead) => !lead.hasCompany).length,
      missingPhone: leads.filter((lead) => !lead.hasPhone).length,
    },
    byLandingPage: aggregateLeads(leads, (lead) => lead.landingPage, {
      secondary: {
        topChannel: (items) => topGroupLabel(items, (lead) => lead.channel),
        topService: (items) => topGroupLabel(items, (lead) => lead.serviceInterest),
        topVolume: (items) => topGroupLabel(items, (lead) => lead.volume),
      },
    }).slice(0, 15),
    byChannel: aggregateLeads(leads, (lead) => lead.channel, {
      secondary: {
        topLandingPage: (items) => topGroupLabel(items, (lead) => lead.landingPage),
        topService: (items) => topGroupLabel(items, (lead) => lead.serviceInterest),
      },
    }).slice(0, 12),
    byServiceInterest: aggregateLeads(leads, (lead) => lead.serviceInterest, {
      secondary: {
        topLandingPage: (items) => topGroupLabel(items, (lead) => lead.landingPage),
        topChannel: (items) => topGroupLabel(items, (lead) => lead.channel),
      },
    }).slice(0, 12),
    byBlockedStage: aggregateLeads(leads, (lead) => lead.blockedStage, {
      secondary: {
        topService: (items) => topGroupLabel(items, (lead) => lead.serviceInterest),
        topLandingPage: (items) => topGroupLabel(items, (lead) => lead.landingPage),
      },
    }).slice(0, 12),
    byConversionType: aggregateLeads(leads, (lead) => lead.conversionType, {
      secondary: {
        topLandingPage: (items) => topGroupLabel(items, (lead) => lead.landingPage),
        topChannel: (items) => topGroupLabel(items, (lead) => lead.channel),
      },
    }).slice(0, 12),
  };
}

function aggregateLeads(leads, keyFn, { secondary = {} } = {}) {
  const groups = new Map();
  for (const lead of leads) {
    const key = cleanEnv(keyFn(lead)) || "unknown";
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
    averageScore: average(items.map((lead) => lead.qualityScore)),
    qualifiedRate: rate(items.filter((lead) => lead.qualified).length, items.length),
    ...Object.fromEntries(Object.entries(secondary).map(([name, resolver]) => [name, resolver(items)])),
  })).sort((a, b) => b.qualified - a.qualified || b.hot - a.hot || b.leads - a.leads || b.averageScore - a.averageScore);
}

function enrichLeadDataWithGa4(leads, ga4) {
  if (!leads || leads.status !== "ok" || !ga4 || ga4.status !== "ok") return leads;

  const sessionsByPage = new Map();
  for (const row of ga4.landingPages ?? []) {
    const page = normalizeLandingPage(row.landingPagePlusQueryString);
    sessionsByPage.set(page, (sessionsByPage.get(page) ?? 0) + Number(row.sessions ?? 0));
  }

  const withSessions = (items = []) =>
    items.map((item) => {
      const sessions = sessionsByPage.get(item.key) ?? 0;
      return {
        ...item,
        sessions,
        leadRateFromSessions: sessions ? rate(item.leads, sessions) : null,
        qualifiedLeadRateFromSessions: sessions ? rate(item.qualified, sessions) : null,
      };
    });

  const leadPages = new Set(leads.byLandingPage.map((item) => item.key));
  const trafficWithoutLeads = Array.from(sessionsByPage, ([key, sessions]) => ({ key, sessions }))
    .filter((item) => !leadPages.has(item.key) && item.key !== "unknown")
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, 10);

  return {
    ...leads,
    byLandingPage: withSessions(leads.byLandingPage),
    trafficWithoutLeads,
  };
}

function topGroupLabel(items, keyFn) {
  const counts = new Map();
  for (const item of items) {
    const key = cleanEnv(keyFn(item)) || "unknown";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return Array.from(counts, ([key, count]) => ({ key, count })).sort((a, b) => b.count - a.count || a.key.localeCompare(b.key))[0]?.key ?? "unknown";
}

function average(values) {
  const cleanValues = values.filter((value) => Number.isFinite(value));
  if (cleanValues.length === 0) return 0;
  return Math.round(cleanValues.reduce((sum, value) => sum + value, 0) / cleanValues.length);
}

function rate(part, total) {
  return total > 0 ? Number((part / total).toFixed(4)) : 0;
}

async function buildMarketingStrategy(localAudit, externalData) {
  if (!process.env.OPENAI_API_KEY || options.noAi) {
    return buildRuleBasedStrategy(localAudit, externalData);
  }

  const prompt = [
    "Tu es le directeur marketing IA de Sunelys, une societe B2B qui aide les installateurs photovoltaiques a externaliser et fiabiliser leurs demarches administratives.",
    "Tu combines SEO, SEA, copywriting, design thinking, tracking, conversion B2B, analytics et gouvernance editoriale.",
    "Tu dois etre ambitieux mais prudent: ne jamais inventer de donnees Google, ne jamais recommander une publication qui viole la cadence editoriale, et distinguer clairement les actions auditables des hypotheses.",
    "Priorise le chiffre d'affaires, la qualite des leads, les pages proches de l'intention achat, le maillage interne et la mesure.",
    "Quand les connecteurs Google sont absents, propose le meilleur plan a partir de l'audit local et signale le manque de donnees.",
    "Quand les donnees Airtable leads sont presentes, utilise uniquement les agregats fournis: qualite lead, landing pages, canaux, services, blocages administratifs et trous de qualification. Ne demande jamais de PII dans la strategie.",
  ].join("\n");

  const context = {
    business: {
      brand: "Sunelys",
      market: "France",
      target: "Installateurs photovoltaiques, entreprises solaires, dirigeants et equipes operations",
      offer: "Gestion administrative photovoltaique: declaration prealable, Consuel, raccordement Enedis, suivi dossiers",
    },
    localAudit: compactLocalAuditForAi(localAudit),
    externalData,
  };

  const body = {
    model: process.env.MARKETING_AGENT_MODEL ?? DEFAULT_MODEL,
    input: [
      {
        role: "developer",
        content: [{ type: "input_text", text: prompt }],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Analyse ce contexte et retourne uniquement un JSON conforme au schema.\n\n${JSON.stringify(context)}`,
          },
        ],
      },
    ],
    reasoning: { effort: process.env.MARKETING_AGENT_REASONING_EFFORT ?? "low" },
    text: {
      verbosity: process.env.MARKETING_AGENT_VERBOSITY ?? "medium",
      format: {
        type: "json_schema",
        name: "marketing_director_audit",
        strict: true,
        schema: strategySchema,
      },
    },
  };

  try {
    const data = await callOpenAiResponses(body);
    return parseJsonResponse(data);
  } catch (structuredError) {
    const fallbackBody = {
      model: process.env.MARKETING_AGENT_MODEL ?? DEFAULT_MODEL,
      input: [
        prompt,
        "Retourne un JSON strict avec les cles executive_summary, diagnosis, priority_actions, safe_apply_actions, content_opportunities, sea_notes, measurement_plan, risks.",
        JSON.stringify(context),
      ].join("\n\n"),
      reasoning: { effort: process.env.MARKETING_AGENT_REASONING_EFFORT ?? "low" },
      text: { verbosity: process.env.MARKETING_AGENT_VERBOSITY ?? "medium" },
    };
    try {
      const data = await callOpenAiResponses(fallbackBody);
      return parseJsonResponse(data);
    } catch (fallbackError) {
      const strategy = buildRuleBasedStrategy(localAudit, externalData);
      strategy.risks.unshift({
        risk: "Synthese IA indisponible",
        severity: "medium",
        mitigation: `La strategie regle-metier a ete utilisee. Erreur OpenAI: ${fallbackError.message || structuredError.message}`,
      });
      return strategy;
    }
  }
}

async function callOpenAiResponses(body) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`OpenAI Responses API ${response.status}: ${JSON.stringify(data).slice(0, 1200)}`);
  }
  return data;
}

function parseJsonResponse(data) {
  const text = extractResponseText(data);
  if (!text) throw new Error("Reponse OpenAI vide.");
  return JSON.parse(extractJsonObject(text));
}

function extractResponseText(data) {
  if (typeof data.output_text === "string") return data.output_text;
  const chunks = [];
  const visit = (value) => {
    if (!value || typeof value !== "object") return;
    if (typeof value.text === "string") chunks.push(value.text);
    if (typeof value.output_text === "string") chunks.push(value.output_text);
    if (Array.isArray(value)) value.forEach(visit);
    else Object.values(value).forEach(visit);
  };
  visit(data.output);
  return chunks.join("\n").trim();
}

function extractJsonObject(text) {
  const trimmed = text.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/i, "").trim();
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) return trimmed;
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start >= 0 && end > start) return trimmed.slice(start, end + 1);
  throw new Error("Impossible d'extraire un objet JSON de la reponse IA.");
}

function buildRuleBasedStrategy(localAudit, externalData) {
  const topIssues = localAudit.issues.slice(0, 12);
  const hasGoogleData = externalData.searchConsole.status === "ok" || externalData.ga4.status === "ok";
  const hasLeadData = externalData.leads?.status === "ok";
  const severeIssueCount = localAudit.issues.filter((item) => ["high", "critical"].includes(item.severity)).length;
  const backlogLinkCount = localAudit.issues.filter((item) => item.title === "Lien vers contenu en backlog").length;
  const contentIssueCount = localAudit.issues.filter((item) =>
    ["SEO metadata", "Content depth"].includes(item.area),
  ).length;
  const hygieneAction =
    severeIssueCount > 0
      ? {
          title: "Corriger les alertes SEO locales a forte severite",
          rationale: `${severeIssueCount} alerte(s) forte(s) detectee(s) dans l'audit local.`,
          expected_impact: "Reduction des erreurs de maillage, d'assets et de publication accidentelle.",
        }
        : backlogLinkCount > 0
          ? {
              title: "Nettoyer le maillage visible vers les contenus en backlog",
              rationale: `${backlogLinkCount} lien(s) depuis des contenus publics pointent vers des articles non publies.`,
              expected_impact: "Moins de liens morts potentiels au deploiement et meilleure coherence du parcours editorial.",
            }
          : contentIssueCount > 0
            ? {
                title: "Optimiser les metadonnees et la profondeur des contenus",
                rationale: `${contentIssueCount} point(s) metadata/contenu detecte(s) dans l'audit local.`,
                expected_impact: "SERP plus propres, meilleurs taux de clic et contenu plus complet sur les intentions prioritaires.",
              }
            : {
                title: "Maintenir la surveillance qualite SEO",
                rationale: "Aucune alerte locale active apres le dernier audit.",
                expected_impact: "Conserver un filet de securite avant publication et detecter les regressions au fil des ajouts.",
              };

  return {
    executive_summary: hasGoogleData
      ? "Audit genere a partir du site local et des donnees Google disponibles. Priorite: convertir les pages proches de l'intention achat et corriger les freins SEO detectes."
      : "Audit genere a partir du site local. Les connecteurs Google ne sont pas encore configures, donc les priorites business doivent etre recoupees avec GA4 et Search Console avant arbitrage final.",
    diagnosis: topIssues.map((item) => ({
      area: item.area,
      finding: item.title,
      impact: item.severity,
      evidence: item.evidence,
    })),
    priority_actions: [
      {
        priority: "P0",
        title: hasLeadData
          ? "Piloter les optimisations avec les leads qualifies Airtable"
          : hasGoogleData
            ? "Brancher Airtable au scoring leads de l'agent"
            : "Brancher GA4, Search Console et Airtable a l'agent",
        rationale: hasLeadData
          ? "Les donnees de leads sont agregees par landing page, canal, service, blocage administratif et score qualite; elles doivent maintenant arbitrer SEO, SEA et conversion."
          : hasGoogleData
            ? "Les donnees de trafic sont disponibles, mais il manque le lien business vers les leads qualifies et les opportunites."
            : "Sans donnees de clics, impressions, pages d'entree et leads, l'agent ne peut pas arbitrer entre SEO, SEA et conversion avec assez de precision.",
        expected_impact: hasLeadData
          ? "Meilleure allocation des efforts sur les pages et canaux qui creent du pipeline, pas seulement du trafic."
          : hasGoogleData
            ? "Priorisation qui rapproche acquisition et qualite commerciale."
            : "Priorisation plus fiable des pages et requetes qui peuvent produire des leads.",
        effort: "S",
        pages: ["/", "/blog", "/contact"],
        applyable: false,
      },
      {
        priority: "P1",
        title: hygieneAction.title,
        rationale: hygieneAction.rationale,
        expected_impact: hygieneAction.expected_impact,
        effort: "M",
        pages: topIssues.slice(0, 5).flatMap((item) => (item.file ? [item.file] : [])),
        applyable: localAudit.safeFixes.length > 0,
      },
      {
        priority: "P1",
        title: "Renforcer les pages service sur les intentions transactionnelles",
        rationale: "Les pages declaration prealable, Consuel, raccordement Enedis et gestion administrative sont proches du besoin d'achat.",
        expected_impact: "Meilleure conversion des visiteurs chauds et base plus saine pour des campagnes SEA.",
        effort: "M",
        pages: [
          "/declaration-prealable-panneaux-solaires",
          "/dossier-consuel-photovoltaique",
          "/raccordement-enedis-photovoltaique",
          "/gestion-administrative-photovoltaique",
        ],
        applyable: false,
      },
    ],
    safe_apply_actions: localAudit.safeFixes.map((action) => ({
      id: action.id,
      type: action.type,
      file: action.file,
      reason: action.reason,
    })),
    content_opportunities: [
      {
        topic: "Comparatif externalisation vs gestion interne administrative solaire",
        intent: "Decision B2B et ROI operationnel",
        target_keyword: "externaliser administratif photovoltaique",
        recommended_asset: "Guide decisionnel + calculateur simple de cout cache",
        internal_links: ["/gestion-administrative-photovoltaique", "/tarifs", "/contact"],
      },
      {
        topic: "Checklist qualite dossier DP panneaux solaires",
        intent: "Recherche de solution avant depot mairie",
        target_keyword: "checklist declaration prealable panneaux solaires",
        recommended_asset: "Lead magnet telechargeable et page support",
        internal_links: ["/declaration-prealable-panneaux-solaires", "/checklist-declaration-prealable-solaire"],
      },
    ],
    sea_notes: [
      {
        campaign: "Search - intention forte DP/Consuel/Raccordement",
        hypothesis: "Des requetes administratives tres precises peuvent capter des installateurs en friction immediate.",
        landing_page: "/contact ou page service dediee selon groupe d'annonces",
        measurement: "lead_converted, contact_form_submit, cta_phone, taux de conversion landing page.",
      },
    ],
    measurement_plan: [
      {
        event_or_metric: "lead_converted",
        why: "Mesurer la conversion principale et la qualite des pages d'entree.",
        implementation_note: "Deja prevu dans le tracking centralise; verifier la remontee GA4 une fois PUBLIC_GA4_ID actif.",
      },
      {
        event_or_metric: "cta_* par page",
        why: "Identifier les pages qui creent l'intention mais ne transforment pas.",
        implementation_note: "Conserver les attributs data-track et analyser par landingPagePlusQueryString dans GA4.",
      },
    ],
    risks: [
      {
        risk: "Publication SEO trop rapide",
        severity: "high",
        mitigation: "Respecter docs/seo-content-publication-status.md: deux articles maximum par semaine et publication dans l'ordre.",
      },
      {
        risk: hasGoogleData ? "Acces Google a maintenir" : "Recommandations sans donnees proprietaires",
        severity: hasGoogleData ? "low" : "medium",
        mitigation: hasGoogleData
          ? "Conserver les tokens OAuth locaux dans secrets/, surveiller les expirations d'acces et relancer marketing:google:test si les rapports deviennent vides."
          : "Brancher GA4 et Search Console avant de lancer des arbitrages SEA ou de gros changements de copywriting.",
      },
    ],
  };
}

async function applySafeFixes(localAudit) {
  const applied = [];

  for (const fix of localAudit.safeFixes) {
    if (fix.type !== "frontmatter_set") continue;
    const filePath = path.join(ROOT, fix.file);
    const before = await readFile(filePath, "utf8");
    const after = setFrontmatterField(before, fix.field, fix.value);
    if (after !== before) {
      await writeFile(filePath, after, "utf8");
      applied.push({
        id: fix.id,
        type: fix.type,
        file: fix.file,
        field: fix.field,
        value: fix.value,
        reason: fix.reason,
      });
    }
  }

  return applied;
}

function setFrontmatterField(source, field, value) {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return source;

  const formatted = `${field}: ${JSON.stringify(String(value))}`;
  const frontmatter = match[1];
  const fieldPattern = new RegExp(`^${escapeRegExp(field)}:\\s*.*$`, "m");

  let nextFrontmatter;
  if (fieldPattern.test(frontmatter)) {
    nextFrontmatter = frontmatter.replace(fieldPattern, formatted);
  } else {
    const lines = frontmatter.split("\n");
    const preferredAfter = field === "updatedDate" ? "pubDate" : field === "publicationStatus" ? "slug" : "title";
    const index = lines.findIndex((line) => line.startsWith(`${preferredAfter}:`));
    if (index >= 0) lines.splice(index + 1, 0, formatted);
    else lines.push(formatted);
    nextFrontmatter = lines.join("\n");
  }

  return source.replace(/^---\n[\s\S]*?\n---/, `---\n${nextFrontmatter}\n---`);
}

function compactLocalAuditForAi(localAudit) {
  return {
    siteUrl: localAudit.siteUrl,
    routeCounts: localAudit.routeCounts,
    staticRoutes: localAudit.staticRoutes,
    blogPosts: localAudit.blogPosts.map((post) => ({
      slug: post.slug,
      title: post.title,
      seoTitle: post.seoTitle,
      description: post.description,
      category: post.category,
      publicationStatus: post.publicationStatus,
      pubDate: post.pubDate,
      updatedDate: post.updatedDate,
      wordCount: post.wordCount,
      headings: post.headings.slice(0, 8),
    })),
    issues: localAudit.issues.slice(0, 80),
    safeFixes: localAudit.safeFixes,
    tracking: {
      eventCount: localAudit.tracking.eventCount,
      events: localAudit.tracking.events.map((event) => event.name).slice(0, 80),
    },
    editorialStatus: localAudit.editorialStatus,
  };
}

async function readBlogPosts() {
  const blogDir = path.join(ROOT, "src", "content", "blog");
  const files = await walk(blogDir, [".md"]);

  const posts = [];
  for (const file of files) {
    const text = await readFile(file, "utf8");
    const frontmatter = parseFrontmatter(text);
    const body = text.replace(/^---\n[\s\S]*?\n---/, "");
    const slug = frontmatter.slug ?? path.basename(file, ".md");
    posts.push({
      file,
      slug,
      frontmatter,
      publicationStatus: frontmatter.publicationStatus ?? "public",
      wordCount: countWords(body),
      headings: extractHeadings(body),
    });
  }

  return posts.sort((a, b) => a.slug.localeCompare(b.slug));
}

function parseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const fields = {};
  for (const line of match[1].split("\n")) {
    const field = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!field) continue;
    fields[field[1]] = unquoteYamlScalar(field[2]);
  }
  return fields;
}

function unquoteYamlScalar(value) {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function countWords(text) {
  const words = text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .match(/\b[\p{L}\p{N}'-]+\b/gu);
  return words?.length ?? 0;
}

function extractHeadings(text) {
  return [...text.matchAll(/^#{2,3}\s+(.+)$/gm)].map((match) => match[1].trim()).slice(0, 20);
}

async function readEditorialStatus() {
  const file = path.join(ROOT, "docs", "seo-content-publication-status.md");
  if (!(await fileExists(file))) {
    return { status: "missing", file: path.relative(ROOT, file), backlogSlugs: [] };
  }

  const text = await readFile(file, "utf8");
  const backlogSlugs = [];
  for (const line of text.split("\n")) {
    if (!/Backlog/i.test(line)) continue;
    for (const match of line.matchAll(/`([^`]+)`/g)) {
      backlogSlugs.push(match[1]);
    }
  }

  return {
    status: "ok",
    file: path.relative(ROOT, file),
    lastCheck: text.match(/Derniere verification\s*:\s*([^.\n]+)/)?.[1]?.trim() ?? "",
    backlogSlugs: [...new Set(backlogSlugs)].sort(),
    rules: [
      "2 articles maximum par semaine",
      "ne pas avancer tant que la semaine precedente n'est pas validee et publiee",
      "ne pas supposer qu'un fichier local est public",
    ],
  };
}

function routeFromPageFile(file) {
  const rel = path.relative(path.join(ROOT, "src", "pages"), file).replaceAll(path.sep, "/");
  if (rel.startsWith("api/")) return null;
  if (rel === "sitemap.xml.ts") return "/sitemap.xml";
  if (rel.includes("[")) return null;
  if (!rel.endsWith(".astro")) return null;
  if (rel === "index.astro") return "/";
  const withoutExt = rel.replace(/\.astro$/, "");
  const route = withoutExt.endsWith("/index")
    ? `/${withoutExt.slice(0, -"/index".length)}`
    : `/${withoutExt}`;
  return normalizeRoute(route);
}

async function walk(dir, extensions) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir);
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stats = await stat(fullPath);
    if (stats.isDirectory()) {
      if (["node_modules", "dist", ".astro", ".git"].includes(entry)) continue;
      files.push(...(await walk(fullPath, extensions)));
    } else if (extensions.includes(path.extname(entry))) {
      files.push(fullPath);
    }
  }

  return files.sort();
}

function extractLocalLinks(text) {
  const links = new Set();
  const patterns = [
    /\[[^\]]+\]\((\/[^)\s]+)\)/g,
    /\bhref=["'](\/[^"']+)["']/g,
    /\bhref:\s*["'](\/[^"']+)["']/g,
    /\bctaHref=["'](\/[^"']+)["']/g,
    /\b(primaryServiceHref|secondaryServiceHref):\s*["'](\/[^"']+)["']/g,
  ];

  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      links.add(match[2] ?? match[1]);
    }
  }

  return [...links];
}

function extractMarkdownVisibleLinks(text) {
  const body = text.replace(/^---\n[\s\S]*?\n---/, "");
  const links = new Set(extractLocalLinks(body));
  const frontmatter = parseFrontmatter(text);

  for (const field of ["primaryServiceHref", "secondaryServiceHref"]) {
    if (frontmatter[field]) links.add(frontmatter[field]);
  }

  return [...links];
}

function normalizeLocalHref(href) {
  if (!href.startsWith("/") || href.startsWith("//")) return null;
  if (href.startsWith("/#")) return "/";
  const clean = href.split("#")[0].split("?")[0];
  if (!clean || clean === "/") return "/";
  return normalizeRoute(clean);
}

function normalizeRoute(route) {
  if (!route) return "/";
  const clean = route.replace(/\/{2,}/g, "/");
  return clean === "/" ? "/" : clean.replace(/\/$/, "");
}

function isPublicAssetRoute(route) {
  return /^\/(images|brand)\//.test(route) || /^\/favicon\.(svg|ico|png)$/.test(route);
}

async function readGoogleAuth() {
  const oauth = await readGoogleOAuth();
  if (oauth) return oauth;

  return readGoogleServiceAccount();
}

async function readGoogleOAuth() {
  const client = await readGoogleOAuthClient();
  const token = await readGoogleOAuthToken();

  if (!client || !token?.refresh_token) return null;

  return {
    type: "oauth",
    ...client,
    token,
    tokenFile: getGoogleOAuthTokenFile(),
  };
}

async function readGoogleOAuthClient() {
  const file = process.env.GOOGLE_OAUTH_CLIENT_CREDENTIALS
    ? path.resolve(ROOT, process.env.GOOGLE_OAUTH_CLIENT_CREDENTIALS)
    : path.resolve(ROOT, "./secrets/google-oauth-client.json");

  if (await fileExists(file)) {
    const json = JSON.parse(await readFile(file, "utf8"));
    const source = json.installed || json.web || json;
    return normalizeOAuthClient(source);
  }

  if (process.env.GOOGLE_OAUTH_CLIENT_ID && process.env.GOOGLE_OAUTH_CLIENT_SECRET) {
    return normalizeOAuthClient({
      client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
      client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    });
  }

  return null;
}

async function readGoogleOAuthToken() {
  if (process.env.GOOGLE_OAUTH_TOKEN_JSON) {
    const raw = process.env.GOOGLE_OAUTH_TOKEN_JSON.trim();
    const json = raw.startsWith("{")
      ? raw
      : Buffer.from(raw, "base64").toString("utf8");
    return JSON.parse(json);
  }

  const file = getGoogleOAuthTokenFile();
  if (await fileExists(file)) {
    return JSON.parse(await readFile(file, "utf8"));
  }

  return null;
}

function getGoogleOAuthTokenFile() {
  return process.env.GOOGLE_OAUTH_TOKEN
    ? path.resolve(ROOT, process.env.GOOGLE_OAUTH_TOKEN)
    : path.resolve(ROOT, "./secrets/google-oauth-token.json");
}

function normalizeOAuthClient(source) {
  return {
    clientId: source.client_id,
    clientSecret: source.client_secret,
    tokenUri: source.token_uri || "https://oauth2.googleapis.com/token",
  };
}

async function readGoogleServiceAccount() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON.trim();
    const json = raw.startsWith("{")
      ? raw
      : Buffer.from(raw, "base64").toString("utf8");
    return normalizeServiceAccount(JSON.parse(json));
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    const file = path.resolve(ROOT, process.env.GOOGLE_APPLICATION_CREDENTIALS);
    if (await fileExists(file)) {
      return normalizeServiceAccount(JSON.parse(await readFile(file, "utf8")));
    }
  }

  return null;
}

function normalizeServiceAccount(account) {
  return {
    type: "service_account",
    clientEmail: account.client_email,
    privateKey: String(account.private_key ?? "").replace(/\\n/g, "\n"),
  };
}

const googleTokenCache = new Map();

async function getGoogleAccessToken(auth, scopes) {
  const cacheKey = `${auth.type}:${scopes.sort().join(" ")}`;
  const cached = googleTokenCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached.token;

  if (auth.type === "oauth") {
    return refreshGoogleOAuthToken(auth, cacheKey);
  }

  return getServiceAccountAccessToken(auth, scopes, cacheKey);
}

async function getServiceAccountAccessToken(account, scopes, cacheKey) {
  if (!account.clientEmail || !account.privateKey) {
    throw new Error("Service account Google incomplet: client_email/private_key manquant.");
  }

  const now = Math.floor(Date.now() / 1000);
  const jwtHeader = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const jwtPayload = base64Url(JSON.stringify({
    iss: account.clientEmail,
    scope: scopes.join(" "),
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }));
  const unsignedToken = `${jwtHeader}.${jwtPayload}`;
  const signature = createSign("RSA-SHA256").update(unsignedToken).sign(account.privateKey);
  const assertion = `${unsignedToken}.${base64Url(signature)}`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`Google OAuth ${response.status}: ${JSON.stringify(data).slice(0, 800)}`);
  }

  googleTokenCache.set(cacheKey, {
    token: data.access_token,
    expiresAt: Date.now() + Number(data.expires_in ?? 3600) * 1000,
  });
  return data.access_token;
}

async function refreshGoogleOAuthToken(auth, cacheKey) {
  if (!auth.clientId || !auth.clientSecret || !auth.token?.refresh_token) {
    throw new Error("Configuration OAuth Google incomplete: client, secret ou refresh_token manquant.");
  }

  const response = await fetch(auth.tokenUri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: auth.clientId,
      client_secret: auth.clientSecret,
      refresh_token: auth.token.refresh_token,
      grant_type: "refresh_token",
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`Google OAuth refresh ${response.status}: ${JSON.stringify(data).slice(0, 800)}`);
  }

  const refreshedToken = {
    ...auth.token,
    token_type: data.token_type ?? auth.token.token_type,
    scope: data.scope ?? auth.token.scope,
    access_token: data.access_token,
    expiry_date: Date.now() + Number(data.expires_in ?? 3600) * 1000,
  };

  if (!process.env.GOOGLE_OAUTH_TOKEN_JSON) {
    await writeJson(auth.tokenFile, refreshedToken);
  }

  googleTokenCache.set(cacheKey, {
    token: data.access_token,
    expiresAt: refreshedToken.expiry_date,
  });
  return data.access_token;
}

function base64Url(value) {
  const buffer = Buffer.isBuffer(value) ? value : Buffer.from(value);
  return buffer.toString("base64").replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

function dateRangeForLookback(days, lagDays = 0) {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - lagDays);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - Math.max(1, days));
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}

function renderMarkdownReport({ manifest, localAudit, externalData, strategy, applied }) {
  const lines = [];
  lines.push(`# Marketing Agent Audit - ${manifest.generatedAt}`);
  lines.push("");
  lines.push(`Site: ${manifest.siteUrl}`);
  lines.push(`Mode: ${manifest.mode}`);
  lines.push(`AI: ${manifest.ai.enabled ? manifest.ai.model : "disabled"}`);
  lines.push("");
  lines.push("## Executive summary");
  lines.push("");
  lines.push(strategy.executive_summary);
  lines.push("");
  lines.push("## Data sources");
  lines.push("");
  lines.push(`- Local routes: ${localAudit.routeCounts.static} static, ${localAudit.routeCounts.blogPublic} public blog posts, ${localAudit.routeCounts.blogBacklog} backlog blog posts.`);
  lines.push(`- Tracking events found: ${localAudit.tracking.eventCount}.`);
  lines.push(`- Search Console: ${sourceStatus(externalData.searchConsole)}.`);
  lines.push(`- GA4: ${sourceStatus(externalData.ga4)}.`);
  lines.push(`- Airtable leads: ${sourceStatus(externalData.leads)}.`);
  lines.push(`- PageSpeed: ${sourceStatus(externalData.pagespeed)}.`);
  lines.push("");
  renderLeadQualitySection(lines, externalData.leads);
  lines.push("");
  lines.push("## Priority actions");
  lines.push("");
  for (const action of strategy.priority_actions) {
    lines.push(`- ${action.priority} ${action.title} (${action.effort})`);
    lines.push(`  Impact: ${action.expected_impact}`);
    lines.push(`  Why: ${action.rationale}`);
    if (action.pages?.length) lines.push(`  Pages: ${action.pages.join(", ")}`);
  }
  lines.push("");
  lines.push("## Diagnosis");
  lines.push("");
  for (const item of strategy.diagnosis) {
    lines.push(`- ${item.area}: ${item.finding}`);
    lines.push(`  Impact: ${item.impact}`);
    lines.push(`  Evidence: ${item.evidence}`);
  }
  lines.push("");
  lines.push("## Local issues");
  lines.push("");
  for (const item of localAudit.issues.slice(0, 40)) {
    lines.push(`- [${item.severity}] ${item.area}: ${item.title}`);
    lines.push(`  Evidence: ${item.evidence}`);
    lines.push(`  Recommendation: ${item.recommendation}`);
  }
  if (localAudit.issues.length > 40) {
    lines.push(`- ${localAudit.issues.length - 40} more issue(s) in local-audit.json.`);
  }
  lines.push("");
  lines.push("## Content opportunities");
  lines.push("");
  for (const item of strategy.content_opportunities) {
    lines.push(`- ${item.topic}`);
    lines.push(`  Intent: ${item.intent}`);
    lines.push(`  Keyword: ${item.target_keyword}`);
    lines.push(`  Asset: ${item.recommended_asset}`);
  }
  lines.push("");
  lines.push("## SEA notes");
  lines.push("");
  for (const item of strategy.sea_notes) {
    lines.push(`- ${item.campaign}: ${item.hypothesis}`);
    lines.push(`  Landing page: ${item.landing_page}`);
    lines.push(`  Measurement: ${item.measurement}`);
  }
  lines.push("");
  lines.push("## Measurement plan");
  lines.push("");
  for (const item of strategy.measurement_plan) {
    lines.push(`- ${item.event_or_metric}: ${item.why}`);
    lines.push(`  Implementation: ${item.implementation_note}`);
  }
  lines.push("");
  lines.push("## Risks");
  lines.push("");
  for (const item of strategy.risks) {
    lines.push(`- [${item.severity}] ${item.risk}`);
    lines.push(`  Mitigation: ${item.mitigation}`);
  }
  lines.push("");
  lines.push("## Safe apply actions");
  lines.push("");
  if (strategy.safe_apply_actions.length === 0) {
    lines.push("- No safe apply action proposed.");
  } else {
    for (const item of strategy.safe_apply_actions) {
      lines.push(`- ${item.id}: ${item.type} in ${item.file}`);
      lines.push(`  Reason: ${item.reason}`);
    }
  }
  lines.push("");
  lines.push("## Applied actions");
  lines.push("");
  if (applied.length === 0) {
    lines.push("- None.");
  } else {
    for (const item of applied) {
      lines.push(`- ${item.id}: ${item.file} -> ${item.field}=${item.value}`);
    }
  }
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function renderLeadQualitySection(lines, leads) {
  lines.push("## Lead quality reporting");
  lines.push("");
  if (!leads || leads.status !== "ok") {
    lines.push(`- Non disponible: ${leads?.reason ?? "source absente"}.`);
    return;
  }

  lines.push(`- Period: ${leads.startDate} -> ${leads.endDate}.`);
  lines.push(`- Leads in range: ${leads.totals.leads}; qualified: ${leads.totals.qualified}; hot: ${leads.totals.hot}; average score: ${leads.totals.averageScore}/100.`);
  lines.push(
    `- Qualification gaps: landing page ${leads.qualificationGaps.missingLandingPage}, channel ${leads.qualificationGaps.missingChannel}, service ${leads.qualificationGaps.missingServiceInterest}, blocked stage ${leads.qualificationGaps.missingBlockedStage}, volume ${leads.qualificationGaps.missingVolume}.`,
  );
  lines.push("");
  lines.push("### By Landing Page");
  lines.push("");
  renderLeadTable(lines, leads.byLandingPage, ["Landing page", "Leads", "Qualified", "Hot", "Avg score", "Sessions", "Qualified / sessions", "Top channel", "Top service"], (item) => [
    item.key,
    item.leads,
    item.qualified,
    item.hot,
    item.averageScore,
    item.sessions ?? "-",
    item.qualifiedLeadRateFromSessions == null ? "-" : `${Math.round(item.qualifiedLeadRateFromSessions * 1000) / 10}%`,
    item.topChannel ?? "-",
    item.topService ?? "-",
  ]);
  lines.push("");
  lines.push("### By Channel");
  lines.push("");
  renderLeadTable(lines, leads.byChannel, ["Channel", "Leads", "Qualified", "Hot", "Avg score", "Top landing page", "Top service"], (item) => [
    item.key,
    item.leads,
    item.qualified,
    item.hot,
    item.averageScore,
    item.topLandingPage ?? "-",
    item.topService ?? "-",
  ]);
  lines.push("");
  lines.push("### By Service Interest");
  lines.push("");
  renderLeadTable(lines, leads.byServiceInterest, ["Service", "Leads", "Qualified", "Hot", "Avg score", "Top page", "Top channel"], (item) => [
    item.key,
    item.leads,
    item.qualified,
    item.hot,
    item.averageScore,
    item.topLandingPage ?? "-",
    item.topChannel ?? "-",
  ]);
  lines.push("");
  lines.push("### By Blocked Stage");
  lines.push("");
  renderLeadTable(lines, leads.byBlockedStage, ["Blocked stage", "Leads", "Qualified", "Hot", "Avg score", "Top service", "Top page"], (item) => [
    item.key,
    item.leads,
    item.qualified,
    item.hot,
    item.averageScore,
    item.topService ?? "-",
    item.topLandingPage ?? "-",
  ]);
  if (leads.trafficWithoutLeads?.length) {
    lines.push("");
    lines.push("### Traffic Without Leads");
    lines.push("");
    renderLeadTable(lines, leads.trafficWithoutLeads, ["Landing page", "GA4 sessions"], (item) => [
      item.key,
      item.sessions,
    ]);
  }
}

function renderLeadTable(lines, items, headers, rowFn) {
  if (!items?.length) {
    lines.push("- No data.");
    return;
  }

  lines.push(`| ${headers.map(escapeMarkdownCell).join(" | ")} |`);
  lines.push(`| ${headers.map(() => "---").join(" | ")} |`);
  for (const item of items.slice(0, 12)) {
    lines.push(`| ${rowFn(item).map(escapeMarkdownCell).join(" | ")} |`);
  }
}

function escapeMarkdownCell(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function summarizeExternalSources(externalData) {
  return {
    searchConsole: externalData.searchConsole.status,
    ga4: externalData.ga4.status,
    leads: externalData.leads?.status ?? "missing",
    pagespeed: externalData.pagespeed.status,
  };
}

function sourceStatus(source) {
  if (!source) return "missing";
  if (source.status === "ok") return "ok";
  return `${source.status} (${source.reason ?? "no reason"})`;
}

function skipped(reason) {
  return { status: "skipped", reason };
}

function failed(reason) {
  return { status: "failed", reason };
}

function issue(severity, area, title, evidence, recommendation, file = "") {
  return { severity, area, title, evidence, recommendation, file };
}

function addToGroup(map, key, value) {
  if (!key) return;
  const values = map.get(key) ?? [];
  values.push(value);
  map.set(key, values);
}

function cleanEnv(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeText(value) {
  return cleanEnv(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function normalizeKey(value) {
  return normalizeText(value).replace(/[^a-z0-9]+/g, "");
}

function uniqueValues(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

async function writeJson(file, data) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

async function fileExists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

async function loadEnvFile(name, { override = false } = {}) {
  const file = path.join(ROOT, name);
  if (!(await fileExists(file))) return;

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

function hasFlag(flag) {
  return args.includes(flag);
}

function getArgValue(name) {
  const inline = args.find((arg) => arg.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function isTruthy(value) {
  return ["1", "true", "yes", "on"].includes(String(value ?? "").toLowerCase());
}

function stripTrailingSlash(value) {
  return String(value).replace(/\/$/, "");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
