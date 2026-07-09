#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPORT_DIR = path.join(ROOT, "reports", "marketing-agent");
const MARKETING_AGENT_SCRIPT = path.join(ROOT, "scripts", "marketing-agent.mjs");
const args = process.argv.slice(2);

await loadEnvFile(".env");
await loadEnvFile(".env.local", { override: true });

const config = {
  watch: hasFlag("--watch"),
  intervalMinutes:
    getNumber(getArgValue("--interval")) || getNumber(process.env.MARKETING_PULSE_INTERVAL_MINUTES) || 1440,
  maxP0:
    getNumber(getArgValue("--max-p0")) ?? getNumber(process.env.MARKETING_PULSE_MAX_P0) ?? 0,
  webhookUrl: getArgValue("--webhook") || process.env.MARKETING_PULSE_WEBHOOK || "",
  topActions: 3,
};

const agentArgs = filterAgentArgs();

await main();

async function main() {
  let exitCode = 0;

  do {
    const summary = runOnce();

    if (summary.p0Count > config.maxP0) {
      console.log(`\n⚠️  P0 alerts: ${summary.p0Count} (threshold ${config.maxP0})`);
      exitCode = Math.max(exitCode, 2);
    }

    if (config.webhookUrl) {
      await postWebhook(summary).catch((error) => {
        console.error(`Webhook warning: ${error.message || error}`);
      });
    }

    if (!config.watch) break;

    const intervalMs = Math.max(5 * 60 * 1000, config.intervalMinutes * 60 * 1000);
    console.log(`Next audit in ${Math.round(intervalMs / 60000)} min.`);
    await sleep(intervalMs);
  } while (config.watch);

  process.exitCode = exitCode;
}

function runOnce() {
  const audit = runMarketingAudit();
  if (!audit.success) {
    throw new Error(audit.message);
  }

  const latestPath = path.join(REPORT_DIR, "latest.json");
  if (!existsSync(latestPath)) {
    throw new Error(`Report file not found: ${path.relative(ROOT, latestPath)}`);
  }

  const report = safeJson(readFileSync(latestPath, "utf8"));
  if (!report || !report.manifest) {
    throw new Error(`Invalid report format: ${path.relative(ROOT, latestPath)}`);
  }

  const strategy = report.strategy || {};
  const priorityActions = Array.isArray(strategy.priority_actions)
    ? strategy.priority_actions
    : [];
  const p0Actions = priorityActions.filter((action) => action?.priority === "P0");
  const p1Actions = priorityActions.filter((action) => action?.priority === "P1");
  const p2Actions = priorityActions.filter((action) => action?.priority === "P2");

  const topP0 = p0Actions
    .slice(0, config.topActions)
    .map((action, index) => `${index + 1}. ${action.title || "Sans titre"}`)
    .join(" | ") || "none";

  console.log("[marketing:pulse] Marketing audit completed");
  console.log(`- generatedAt: ${report.manifest.generatedAt || "n/a"}`);
  console.log(`- runId: ${report.manifest.runId || "n/a"}`);
  console.log(`- mode: ${report.manifest.mode || "unknown"}`);
  console.log(`- ai: ${report.manifest.ai?.enabled ? report.manifest.ai.model : "disabled"}`);
  console.log(
    `- priority actions: ${priorityActions.length} (P0=${p0Actions.length}, P1=${p1Actions.length}, P2=${p2Actions.length})`,
  );
  console.log(`- top P0 priorities: ${topP0}`);

  return {
    generatedAt: report.manifest.generatedAt || new Date().toISOString(),
    runId: report.manifest.runId,
    p0Count: p0Actions.length,
    priorityActions,
    topP0Actions: p0Actions.slice(0, config.topActions),
    manifest: report.manifest,
  };
}

function runMarketingAudit() {
  const child = spawnSync(process.execPath, [MARKETING_AGENT_SCRIPT, ...agentArgs], {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 12 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env,
  });

  if (child.stdout) process.stdout.write(child.stdout);
  if (child.stderr && child.status !== 0) {
    console.error(child.stderr);
  }

  if (child.status === 0) {
    return { success: true };
  }

  return {
    success: false,
    message: `marketing-audit exited with code ${child.status}.`,
  };
}

function filterAgentArgs() {
  const hiddenArgs = new Set(["--watch", "--interval", "--max-p0", "--webhook"]);
  const output = [];

  for (let index = 0; index < args.length; index++) {
    const arg = args[index];

    if (hiddenArgs.has(arg)) {
      if (arg === "--interval" || arg === "--max-p0" || arg === "--webhook") {
        index += 1;
      }
      continue;
    }

    if (arg.startsWith("--interval=") || arg.startsWith("--max-p0=") || arg.startsWith("--webhook=")) {
      continue;
    }

    output.push(arg);
  }

  return output;
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

function getNumber(value) {
  if (value === undefined || value === null || value === "") return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

function safeJson(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function postWebhook(summary) {
  if (!config.webhookUrl) return;

  const payload = {
    event: "marketing-pulse",
    generatedAt: summary.generatedAt,
    runId: summary.runId,
    p0Count: summary.p0Count,
    totalPriorityActions: summary.priorityActions.length,
    topP0Actions: summary.topP0Actions.map((action) => ({
      title: action.title,
      expectedImpact: action.expected_impact,
      applyable: action.applyable || false,
      pages: action.pages || [],
    })),
    aiEnabled: summary.manifest?.ai?.enabled ?? false,
    model: summary.manifest?.ai?.model || null,
  };

  const response = await fetch(config.webhookUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    throw new Error(`Webhook failed: ${response.status} ${response.statusText} ${details}`);
  }

  console.log(`Webhook sent: ${config.webhookUrl}`);
}

async function loadEnvFile(name, { override = false } = {}) {
  const filePath = path.join(ROOT, name);
  if (!existsSync(filePath)) return;

  const content = await readFile(filePath, "utf8");
  for (const line of content.split("\n")) {
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
