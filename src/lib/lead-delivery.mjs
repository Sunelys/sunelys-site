export function safeLeadRedirect(value, siteUrl = "https://sunelys.fr") {
  try {
    const url = new URL(String(value || "/merci"), siteUrl);
    if (url.origin === new URL(siteUrl).origin && url.pathname === "/merci") return url.toString();
  } catch { /* Invalid redirect targets fall back to the confirmation page. */ }
  return new URL("/merci", siteUrl).toString();
}

export function withNotificationStatus(comment, status, now = new Date().toISOString()) {
  const withoutStatus = String(comment || "").replace(/\n?\[SUNELYS_NOTIFICATION [^\]\n]*\]/g, "").trimEnd();
  return `${withoutStatus}\n[SUNELYS_NOTIFICATION ${status} ${now}]`;
}

// Retry only an idempotent email request, never the non-idempotent lead creation.
export async function sendNotificationEmail(url, init, {
  request = fetch,
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
} = {}) {
  if (!new Headers(init.headers).has("Idempotency-Key")) throw new Error("Notification idempotency key required");
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await request(url, { ...init, signal: AbortSignal.timeout(4000) });
      if (response.ok || (response.status !== 429 && response.status < 500) || attempt === 2) return response;
      await response.text();
    } catch (error) {
      if (attempt === 2) throw error;
    }
    await sleep(250 * 2 ** attempt);
  }
}
