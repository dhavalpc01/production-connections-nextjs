import type { LeadField } from "./rules";

/**
 * The site's forms, from inc/supabase-forms.php (pc_supabase_field_map).
 * `id` keeps the old CF7 post id so rows in Supabase stay comparable across
 * the WordPress and Next.js sites.
 */
export type FormKind = "submission" | "newsletter";

export type FormDefinition = {
  id: string;
  title: string;
  kind: FormKind;
  /** Required fields, in display order. */
  fields: LeadField[];
  optional?: LeadField[];
};

export const forms = {
  contact: {
    id: "8",
    title: "Contact Form H_1",
    kind: "submission",
    fields: ["full_name", "email", "message"],
  },
  serviceInquiry: {
    id: "4603",
    title: "Contact Form H_5",
    kind: "submission",
    fields: ["full_name", "email", "budget", "company", "message"],
  },
  strategyCall: {
    id: "4005",
    title: "Marketing Landing Page — Book Strategy Call",
    kind: "submission",
    fields: ["full_name", "email", "phone", "message"],
  },
  newsletter: {
    id: "324",
    title: "Newsletter H_2",
    kind: "newsletter",
    fields: ["email"],
  },
  newsletterAlt: {
    id: "328",
    title: "Newsletter H_4",
    kind: "newsletter",
    fields: ["email"],
  },
} satisfies Record<string, FormDefinition>;

export type FormKey = keyof typeof forms;

export function getFormById(id: string): FormDefinition | undefined {
  return Object.values(forms).find((form) => form.id === id);
}
