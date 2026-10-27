import { randomUUID } from "node:crypto";
import { getFormById } from "@/lib/forms/forms";
import { validateField, type LeadField } from "@/lib/forms/rules";

/**
 * Lead capture: validates a form post and writes it to Supabase over
 * PostgREST, into the same tables the WordPress site uses
 * (supabase/schema.sql: form_submissions, newsletter_signups).
 *
 * Body: JSON { formId, data: { <cf7 field name>: value, ... }, pageUrl?, pageTitle? }.
 * `data` is the form's raw fields, as the CF7 markup names them; the hidden
 * pc-utm-* and pc-referrer inputs carry attribution, as on WordPress.
 * Responds 422 with { errors: { <cf7 field name>: message } } when validation fails.
 */

const UTM_KEYS = ["source", "medium", "campaign", "term", "content"] as const;

type LeadBody = {
  formId?: string;
  data?: Record<string, string>;
  pageUrl?: string;
  pageTitle?: string;
};

const clip = (value: string | null | undefined, max: number) => (value ? value.slice(0, max) : null);

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const form = body.formId ? getFormById(String(body.formId)) : undefined;
  if (!form) {
    return Response.json({ error: "Unknown form." }, { status: 400 });
  }

  const data = body.data ?? {};

  // Honeypot: a hidden field real visitors never see. Bots that fill it get a
  // normal-looking success and nothing is stored.
  if (data["pc-website-url"]) {
    return Response.json({ ok: true, message: form.successMessage });
  }

  const values: Partial<Record<LeadField, string>> = {};
  const errors: Record<string, string> = {};
  const check = (name: string, column: LeadField, required: boolean) => {
    const value = String(data[name] ?? "").trim();
    if (!value && !required) return;
    const error = validateField(column, value);
    if (error) errors[name] = error;
    else values[column] = value;
  };
  for (const [name, column] of Object.entries(form.fields)) check(name, column, true);
  for (const [name, column] of Object.entries(form.optional ?? {})) check(name, column, false);
  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 422 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return Response.json({ error: "Lead capture is not configured." }, { status: 503 });
  }

  const row = {
    submission_uid: randomUUID(),
    form_id: form.id,
    form_title: form.title,
    page_url: clip(body.pageUrl, 2000),
    page_title: clip(body.pageTitle, 300),
    referrer: clip(data["pc-referrer"] || request.headers.get("referer"), 2000),
    ip_address: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
    user_agent: clip(request.headers.get("user-agent"), 500),
    ...Object.fromEntries(UTM_KEYS.map((key) => [`utm_${key}`, clip(data[`pc-utm-${key}`], 255)])),
  };

  // Hidden bookkeeping inputs (CF7 ids, WP nonces) are not part of the enquiry.
  const rawFields = Object.fromEntries(
    Object.entries(data).filter(([name]) => !name.startsWith("_wpcf7") && !name.startsWith("_wp_") && name !== "pc_cf_nonce"),
  );

  const table = form.kind === "newsletter" ? "newsletter_signups" : "form_submissions";
  const payload =
    form.kind === "newsletter"
      ? { ...row, email: values.email }
      : { ...row, ...values, newsletter_opt_in: Boolean(data.pc_newsletter), raw_fields: rawFields };

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
    return Response.json({ error: "There was an error trying to send your message. Please try again later." }, { status: 502 });
  }
  return Response.json({ ok: true, message: form.successMessage });
}
