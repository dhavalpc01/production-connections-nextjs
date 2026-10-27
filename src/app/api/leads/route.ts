import { randomUUID } from "node:crypto";
import { getFormById } from "@/lib/forms/forms";
import { validateField, type LeadField } from "@/lib/forms/rules";

/**
 * Lead capture: validates a form post and writes it to Supabase over
 * PostgREST, into the same tables the WordPress site uses
 * (supabase/schema.sql: form_submissions, newsletter_signups).
 *
 * Body: JSON { formId, fields: { full_name, email, ... }, pageUrl?, pageTitle?, utm? }.
 * Responds 422 with { errors: { field: message } } when validation fails.
 */

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

type LeadBody = {
  formId?: string;
  fields?: Partial<Record<LeadField, string>>;
  pageUrl?: string;
  pageTitle?: string;
  utm?: Partial<Record<(typeof UTM_KEYS)[number], string>>;
};

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const form = body.formId ? getFormById(body.formId) : undefined;
  if (!form) {
    return Response.json({ error: "Unknown form." }, { status: 400 });
  }

  const values: Partial<Record<LeadField, string>> = {};
  const errors: Partial<Record<LeadField, string>> = {};
  for (const field of [...form.fields, ...(form.optional ?? [])]) {
    const value = body.fields?.[field]?.trim() ?? "";
    const required = form.fields.includes(field);
    if (!value && !required) continue;
    const error = validateField(field, value);
    if (error) errors[field] = error;
    else values[field] = value;
  }
  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 422 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return Response.json({ error: "Lead capture is not configured." }, { status: 503 });
  }

  const utm = Object.fromEntries(UTM_KEYS.map((key) => [key, body.utm?.[key]?.slice(0, 200) ?? null]));
  const row = {
    submission_uid: randomUUID(),
    form_id: form.id,
    form_title: form.title,
    page_url: body.pageUrl?.slice(0, 2000) ?? null,
    page_title: body.pageTitle?.slice(0, 300) ?? null,
    referrer: request.headers.get("referer"),
    ip_address: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
    user_agent: request.headers.get("user-agent"),
    ...utm,
  };

  const table = form.kind === "newsletter" ? "newsletter_signups" : "form_submissions";
  const payload =
    form.kind === "newsletter"
      ? { ...row, email: values.email }
      : { ...row, ...values, raw_fields: body.fields ?? {} };

  const response = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      // A repeat newsletter signup is not an error: newsletter_signups.email is unique.
      Prefer: form.kind === "newsletter" ? "resolution=ignore-duplicates,return=minimal" : "return=minimal",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    console.error("Supabase insert failed", table, response.status, await response.text());
    return Response.json({ error: "Could not save your message. Please try again." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
