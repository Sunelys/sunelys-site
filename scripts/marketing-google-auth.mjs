#!/usr/bin/env node
import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_TOKEN_FILE = "./secrets/google-oauth-token.json";
const SCOPES = [
  "https://www.googleapis.com/auth/analytics.readonly",
  "https://www.googleapis.com/auth/webmasters.readonly",
];

await loadEnvFile(".env");
await loadEnvFile(".env.local", { override: true });

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});

async function main() {
  const client = await readOAuthClient();
  const tokenFile = path.resolve(ROOT, process.env.GOOGLE_OAUTH_TOKEN || DEFAULT_TOKEN_FILE);
  await mkdir(path.dirname(tokenFile), { recursive: true });

  const server = createServer();
  const { port, codePromise } = await listenForOAuthCode(server);
  const redirectUri = `http://127.0.0.1:${port}/oauth2callback`;
  const authUrl = new URL(client.authUri);
  authUrl.searchParams.set("client_id", client.clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", SCOPES.join(" "));
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "consent");

  console.log("Open this URL in the signed-in Google browser:");
  console.log(authUrl.toString());
  console.log("");
  console.log("Waiting for Google OAuth callback...");

  const code = await codePromise;
  const token = await exchangeCodeForToken(client, code, redirectUri);
  if (!token.refresh_token) {
    throw new Error("Google did not return a refresh_token. Re-run this command and approve the consent screen again.");
  }

  const savedToken = {
    token_type: token.token_type,
    scope: token.scope,
    refresh_token: token.refresh_token,
    access_token: token.access_token,
    expiry_date: Date.now() + Number(token.expires_in ?? 3600) * 1000,
  };
  await writeFile(tokenFile, `${JSON.stringify(savedToken, null, 2)}\n`, "utf8");
  await ensureEnvLocal({
    GOOGLE_OAUTH_TOKEN: path.relative(ROOT, tokenFile),
  });

  console.log(`OAuth token saved to ${path.relative(ROOT, tokenFile)}.`);
  console.log("You can now run: npm run marketing:google:test");
  server.close();
}

async function listenForOAuthCode(server) {
  let resolveCode;
  let rejectCode;
  const codePromise = new Promise((resolve, reject) => {
    resolveCode = resolve;
    rejectCode = reject;
  });

  server.on("request", (request, response) => {
    try {
      const url = new URL(request.url || "/", `http://${request.headers.host}`);
      if (url.pathname !== "/oauth2callback") {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      const error = url.searchParams.get("error");
      if (error) {
        response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Google authorization failed. You can close this tab.");
        rejectCode(new Error(`Google OAuth error: ${error}`));
        return;
      }

      const code = url.searchParams.get("code");
      if (!code) {
        response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Missing OAuth code. You can close this tab.");
        rejectCode(new Error("Missing OAuth code."));
        return;
      }

      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      response.end("<h1>Connexion Google terminee</h1><p>Vous pouvez fermer cet onglet et revenir dans Codex.</p>");
      resolveCode(code);
    } catch (error) {
      rejectCode(error);
    }
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return { port: server.address().port, codePromise };
}

async function exchangeCodeForToken(client, code, redirectUri) {
  const response = await fetch(client.tokenUri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: client.clientId,
      client_secret: client.clientSecret,
      code,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`OAuth token exchange failed (${response.status}): ${JSON.stringify(data).slice(0, 900)}`);
  }
  return data;
}

async function readOAuthClient() {
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

  throw new Error(
    "Missing OAuth client. Add GOOGLE_OAUTH_CLIENT_CREDENTIALS=./secrets/google-oauth-client.json or GOOGLE_OAUTH_CLIENT_ID/GOOGLE_OAUTH_CLIENT_SECRET.",
  );
}

function normalizeOAuthClient(source) {
  return {
    clientId: source.client_id,
    clientSecret: source.client_secret,
    authUri: source.auth_uri || "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUri: source.token_uri || "https://oauth2.googleapis.com/token",
  };
}

async function ensureEnvLocal(values) {
  const file = path.join(ROOT, ".env.local");
  const current = existsSync(file) ? await readFile(file, "utf8") : "";
  const lines = current.split("\n").filter(Boolean);

  for (const [key, value] of Object.entries(values)) {
    const entry = `${key}=${value}`;
    const index = lines.findIndex((line) => line.startsWith(`${key}=`));
    if (index >= 0) lines[index] = entry;
    else lines.push(entry);
  }

  await writeFile(file, `${lines.join("\n")}\n`, "utf8");
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
