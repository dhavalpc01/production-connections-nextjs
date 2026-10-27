/**
 * Field validation, ported from the WordPress theme's inc/form-rules.php.
 *
 * The same rules run on the client (for messages) and on the server (as the
 * gate before Supabase). Keep them in step with the WP file until it retires.
 */

export type LeadField = "full_name" | "email" | "phone" | "company" | "budget" | "message";

type Deny = "control" | "emoji" | "html" | "url";

type Rule = {
  label: string;
  min?: number;
  max: number;
  pattern?: RegExp;
  deny: Deny[];
  minDigits?: number;
  maxDigits?: number;
  minLetters?: number;
  maxLinks?: number;
  message: string;
};

export const formRules: Record<LeadField, Rule> = {
  full_name: {
    label: "Name",
    min: 2,
    max: 80,
    // Must start and end on a letter, so " - " and "..." cannot pass.
    pattern: /^[\p{L}\p{M}][\p{L}\p{M}'’\-. ]*[\p{L}\p{M}.]$/u,
    deny: ["control", "emoji", "html", "url"],
    message: "Please enter your name using letters only — no numbers or symbols.",
  },
  email: {
    label: "Email address",
    min: 6,
    max: 254,
    // Deliberately ASCII: an internationalised address is a lead nobody can reply to.
    pattern:
      /^[A-Za-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/,
    deny: ["control", "emoji"],
    message: "That does not look like a valid email address.",
  },
  phone: {
    label: "Phone number",
    max: 32,
    pattern: /^[+]?[0-9 ()./-]{6,}$/,
    deny: ["control", "emoji"],
    minDigits: 7,
    maxDigits: 15,
    message: "Please enter a phone number we can reach you on.",
  },
  company: {
    label: "Company",
    min: 2,
    max: 100,
    pattern: /^[\p{L}\p{M}\p{N}][\p{L}\p{M}\p{N}&.,'’\-/()+ ]*$/u,
    deny: ["control", "emoji", "html", "url"],
    message: "Please enter your company name without symbols or links.",
  },
  budget: {
    label: "Budget",
    min: 1,
    max: 60,
    pattern: /^[\p{L}\p{N}$£€][\p{L}\p{N}$£€,.\-+/ ]*$/u,
    deny: ["control", "emoji", "html", "url"],
    message: "Please enter a budget — a figure like $10,000, or just tell us you are unsure.",
  },
  message: {
    label: "Message",
    min: 10,
    max: 2000,
    // Emoji allowed here; min_letters is what rejects an emoji-only message.
    deny: ["control", "html"],
    minLetters: 8,
    maxLinks: 2,
    message: "Please tell us a little more about your project.",
  },
};

const denyTests: Record<Deny, RegExp> = {
  // Control characters other than tab and newlines.
  control: /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/,
  emoji: /\p{Extended_Pictographic}/u,
  html: /<[^>]*>/,
  url: /(https?:\/\/|www\.)/i,
};

/** Returns an error message, or null when the value passes. */
export function validateField(field: LeadField, raw: string): string | null {
  const rule = formRules[field];
  const value = raw.trim();
  const length = [...value].length;

  if (rule.min !== undefined && length < rule.min) return rule.message;
  if (length > rule.max) return rule.message;
  if (rule.pattern && !rule.pattern.test(value)) return rule.message;
  if (rule.deny.some((kind) => denyTests[kind].test(value))) return rule.message;

  if (rule.minDigits !== undefined || rule.maxDigits !== undefined) {
    const digits = value.replace(/\D/g, "").length;
    if (digits < (rule.minDigits ?? 0) || digits > (rule.maxDigits ?? Infinity)) return rule.message;
  }
  if (rule.minLetters !== undefined && (value.match(/\p{L}/gu)?.length ?? 0) < rule.minLetters) {
    return rule.message;
  }
  if (rule.maxLinks !== undefined && (value.match(/https?:\/\/|www\./gi)?.length ?? 0) > rule.maxLinks) {
    return rule.message;
  }
  return null;
}
