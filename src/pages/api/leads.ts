import type { APIRoute } from "astro";

export const prerender = false;

const AIRTABLE_API_URL = "https://api.airtable.com/v0";

function clean(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
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
) {
  const fieldName = clean(env[envName] ?? "");
  if (fieldName && value) fields[fieldName] = value;
}

function setNamedField(fields: Record<string, string>, fieldName: string, value: string) {
  const normalizedFieldName = clean(fieldName);
  if (normalizedFieldName && value) fields[normalizedFieldName] = value;
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

  if (!email) {
    return jsonResponse({ ok: false, error: "Email is required." }, 400);
  }

  const fields: Record<string, string> = {};
  setNamedField(fields, env.AIRTABLE_FIELD_FIRST_NAME ?? "", firstName);
  setNamedField(fields, env.AIRTABLE_FIELD_LAST_NAME ?? "Nom", lastName || displayName);
  setNamedField(fields, env.AIRTABLE_FIELD_FULL_NAME ?? "", displayName);
  setNamedField(fields, env.AIRTABLE_FIELD_EMAIL ?? "Email", email);

  addOptionalField(fields, "AIRTABLE_FIELD_DATE", new Date().toISOString(), env);
  addOptionalField(fields, "AIRTABLE_FIELD_COMPANY", clean(formData.get("company")), env);
  addOptionalField(fields, "AIRTABLE_FIELD_PHONE", clean(formData.get("phone")), env);
  addOptionalField(fields, "AIRTABLE_FIELD_VOLUME", clean(formData.get("volume")), env);
  addOptionalField(fields, "AIRTABLE_FIELD_NEED", clean(formData.get("need")), env);
  addOptionalField(fields, "AIRTABLE_FIELD_MESSAGE", clean(formData.get("message")), env);
  addOptionalField(fields, "AIRTABLE_FIELD_STATUS", clean(formData.get("lead_status")), env);
  addOptionalField(fields, "AIRTABLE_FIELD_SOURCE", clean(formData.get("source_page")) || clean(formData.get("source")), env);
  addOptionalField(fields, "AIRTABLE_FIELD_UTM_SOURCE", clean(formData.get("utm_source")), env);
  addOptionalField(fields, "AIRTABLE_FIELD_UTM_MEDIUM", clean(formData.get("utm_medium")), env);
  addOptionalField(fields, "AIRTABLE_FIELD_UTM_CAMPAIGN", clean(formData.get("utm_campaign")), env);
  addOptionalField(fields, "AIRTABLE_FIELD_LANDING_PAGE", clean(formData.get("landing_page")), env);

  const response = await fetch(`${AIRTABLE_API_URL}/${baseId}/${encodeURIComponent(tableName)}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      records: [{ fields }],
      typecast: true,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Airtable lead creation failed", details);
    await notifyLeadFailure(env, {
      reason: "airtable_create_failed",
      airtable_status: response.status,
      airtable_details: details.slice(0, 2000),
      lead: {
        email,
        firstName,
        lastName,
        company: clean(formData.get("company")),
        phone: clean(formData.get("phone")),
        volume: clean(formData.get("volume")),
        need: clean(formData.get("need")),
        source: clean(formData.get("source_page")) || clean(formData.get("source")),
        landing_page: clean(formData.get("landing_page")),
        utm_source: clean(formData.get("utm_source")),
        utm_medium: clean(formData.get("utm_medium")),
        utm_campaign: clean(formData.get("utm_campaign")),
      },
    });
    return jsonResponse({ ok: false, error: "Airtable lead creation failed." }, 502);
  }

  if (wantsJson(request)) return jsonResponse({ ok: true });

  const nextUrl = clean(formData.get("_next")) || "/merci";
  return Response.redirect(nextUrl, 303);
};
