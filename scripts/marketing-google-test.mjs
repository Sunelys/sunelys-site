#!/usr/bin/env node
import { createSign } from "node:crypto";
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_SITE_URL = "https://sunelys.fr/";

await loadEnvFile(".env");
await loadEnvFile(".env.local", { override: true });

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});

async function main() {
  console.log("Google marketing connection test");
  console.log("================================");

  const googleAuth = await readGoogleAuth();
  if (!googleAuth) {
    console.log("Status: missing credentials");
    console.log("");
    console.log("Preferred setup when service account keys are blocked:");
    console.log('GOOGLE_OAUTH_CLIENT_CREDENTIALS="./secrets/google-oauth-client.json"');
    console.log('GOOGLE_OAUTH_TOKEN="./secrets/google-oauth-token.json"');
    console.log("");
    console.log("Alternative service account setup:");
    console.log('GOOGLE_APPLICATION_CREDENTIALS="./secrets/google-service-account.json"');
    console.log("or");
    console.log("GOOGLE_SERVICE_ACCOUNT_JSON='{\"type\":\"service_account\",...}'");
    process.exitCode = 1;
    return;
  }

  console.log(`Google auth: ${googleAuthLabel(googleAuth)}`);
  console.log(`GA4_PROPERTY_ID: ${process.env.GA4_PROPERTY_ID || "missing"}`);
  console.log(`GOOGLE_SEARCH_CONSOLE_SITE_URL: ${process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || DEFAULT_SITE_URL}`);
  console.log("");

  const analytics = await testGa4(googleAuth);
  printResult("GA4 Data API", analytics);

  const searchConsole = await testSearchConsole(googleAuth);
  printResult("Search Console API", searchConsole);

  if (analytics.ok && searchConsole.ok) {
    console.log("");
    console.log("Result: Google is connected. You can run npm run marketing:audit.");
    return;
  }

  process.exitCode = 1;
}

async function testGa4(googleAuth) {
  if (!process.env.GA4_PROPERTY_ID) {
    return {
      ok: false,
      reason: "GA4_PROPERTY_ID is missing.",
      fix: "In GA4, open Admin > Property details, copy the numeric Property ID, then add GA4_PROPERTY_ID=123456789 in .env.local.",
    };
  }

  try {
    const token = await getGoogleAccessToken(googleAuth, [
      "https://www.googleapis.com/auth/analytics.readonly",
    ]);
    const endpoint = `https://analyticsdata.googleapis.com/v1beta/properties/${process.env.GA4_PROPERTY_ID}:runReport`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
        dimensions: [{ name: "eventName" }],
        metrics: [{ name: "eventCount" }],
        limit: "5",
      }),
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        ok: false,
        reason: `HTTP ${response.status}: ${compact(data)}`,
        fix: googleAuth.type === "service_account"
          ? `Add ${googleAuth.clientEmail} as Viewer or Analyst in GA4 Admin > Property access management, and confirm the Google Analytics Data API is enabled in Google Cloud.`
          : "Confirm this Google user has Viewer or Analyst access to the GA4 property, and confirm the Google Analytics Data API is enabled in Google Cloud.",
      };
    }

    return {
      ok: true,
      reason: `${data.rows?.length ?? 0} sample event row(s) returned.`,
      sample: normalizeGaRows(data).slice(0, 5),
    };
  } catch (error) {
    return {
      ok: false,
      reason: error.message,
      fix: "Check the Google OAuth/service account credentials, API enablement, and GA4 property access.",
    };
  }
}

async function testSearchConsole(googleAuth) {
  const siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || DEFAULT_SITE_URL;

  try {
    const token = await getGoogleAccessToken(googleAuth, [
      "https://www.googleapis.com/auth/webmasters.readonly",
    ]);

    const sitesResponse = await fetch("https://searchconsole.googleapis.com/webmasters/v3/sites", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const sitesData = await sitesResponse.json().catch(() => ({}));

    if (!sitesResponse.ok) {
      return {
        ok: false,
        reason: `Sites list HTTP ${sitesResponse.status}: ${compact(sitesData)}`,
        fix: googleAuth.type === "service_account"
          ? `Add ${googleAuth.clientEmail} in Search Console > Settings > Users and permissions, and confirm the Search Console API is enabled in Google Cloud.`
          : "Confirm this Google user has access to the Search Console property, and confirm the Search Console API is enabled in Google Cloud.",
      };
    }

    const queryResponse = await fetch(
      `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate: isoDaysAgo(31),
          endDate: isoDaysAgo(3),
          dimensions: ["query"],
          rowLimit: 5,
          type: "web",
        }),
      },
    );
    const queryData = await queryResponse.json().catch(() => ({}));

    if (!queryResponse.ok) {
      return {
        ok: false,
        reason: `Search analytics HTTP ${queryResponse.status}: ${compact(queryData)}`,
        fix: `Use the exact Search Console property identifier in GOOGLE_SEARCH_CONSOLE_SITE_URL. Accessible sites: ${formatSites(sitesData.siteEntry)}.`,
      };
    }

    return {
      ok: true,
      reason: `${queryData.rows?.length ?? 0} sample query row(s) returned.`,
      accessibleSites: sitesData.siteEntry?.map((site) => site.siteUrl) ?? [],
      sample: (queryData.rows ?? []).slice(0, 5).map((row) => ({
        query: row.keys?.[0] ?? "",
        clicks: row.clicks ?? 0,
        impressions: row.impressions ?? 0,
        ctr: row.ctr ?? 0,
        position: row.position ?? 0,
      })),
    };
  } catch (error) {
    return {
      ok: false,
      reason: error.message,
      fix: "Check the Google OAuth/service account credentials, API enablement, and Search Console user permissions.",
    };
  }
}

function printResult(label, result) {
  console.log(`${label}: ${result.ok ? "OK" : "FAILED"}`);
  console.log(`Reason: ${result.reason}`);
  if (result.fix) console.log(`Fix: ${result.fix}`);
  if (result.accessibleSites?.length) {
    console.log(`Accessible sites: ${result.accessibleSites.join(", ")}`);
  }
  if (result.sample?.length) {
    console.log(`Sample: ${JSON.stringify(result.sample, null, 2)}`);
  }
  console.log("");
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

  if (existsSync(file)) {
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
  if (existsSync(file)) {
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
    if (existsSync(file)) {
      return normalizeServiceAccount(JSON.parse(await readFile(file, "utf8")));
    }
    throw new Error(`GOOGLE_APPLICATION_CREDENTIALS points to a missing file: ${file}`);
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

async function getGoogleAccessToken(auth, scopes) {
  if (auth.type === "oauth") {
    return refreshGoogleOAuthToken(auth);
  }

  return getServiceAccountAccessToken(auth, scopes);
}

async function getServiceAccountAccessToken(account, scopes) {
  if (!account.clientEmail || !account.privateKey) {
    throw new Error("Service account JSON is missing client_email or private_key.");
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
    throw new Error(`Google OAuth HTTP ${response.status}: ${compact(data)}`);
  }

  return data.access_token;
}

async function refreshGoogleOAuthToken(auth) {
  if (!auth.clientId || !auth.clientSecret || !auth.token?.refresh_token) {
    throw new Error("OAuth credentials are missing client_id, client_secret, or refresh_token.");
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
    throw new Error(`Google OAuth refresh HTTP ${response.status}: ${compact(data)}`);
  }

  const refreshedToken = {
    ...auth.token,
    token_type: data.token_type ?? auth.token.token_type,
    scope: data.scope ?? auth.token.scope,
    access_token: data.access_token,
    expiry_date: Date.now() + Number(data.expires_in ?? 3600) * 1000,
  };

  if (!process.env.GOOGLE_OAUTH_TOKEN_JSON) {
    await writeFile(auth.tokenFile, `${JSON.stringify(refreshedToken, null, 2)}\n`, "utf8");
  }

  return data.access_token;
}

function googleAuthLabel(auth) {
  if (auth.type === "service_account") return `service account ${auth.clientEmail}`;
  return "OAuth local user token";
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

function base64Url(value) {
  const buffer = Buffer.isBuffer(value) ? value : Buffer.from(value);
  return buffer.toString("base64").replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

function compact(value) {
  return JSON.stringify(value).replace(/\s+/g, " ").slice(0, 900);
}

function formatSites(sites = []) {
  if (!sites.length) return "none returned";
  return sites.map((site) => site.siteUrl).join(", ");
}

function isoDaysAgo(days) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}
