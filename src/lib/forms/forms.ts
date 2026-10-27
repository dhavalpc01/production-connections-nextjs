import type { LeadField } from "./rules";

/**
 * The site's forms, from inc/supabase-forms.php (pc_supabase_field_map).
 *
 * `id` is the old CF7 post id: the ported markup still carries it in its
 * hidden `_wpcf7` input, and Supabase rows stay comparable across the
 * WordPress and Next.js sites. `fields` maps each CF7 input name to its
 * column; every mapped field is required, as in the CF7 forms.
 */
export type FormKind = "submission" | "newsletter";

export type FormDefinition = {
  id: string;
  title: string;
  kind: FormKind;
  fields: Record<string, LeadField>;
  /** Mapped fields that may be left empty; validated only when filled. */
  optional?: Record<string, LeadField>;
  successMessage: string;
};

const SENT = "Thank you for your message. It has been sent.";

export const forms: FormDefinition[] = [
  {
    // The service pages, Case Studies, the popup.
    id: "8",
    title: "Contact Form H_1",
    kind: "submission",
    fields: { "text-487": "full_name", "email-487": "email", "textarea-487": "message" },
    successMessage: SENT,
  },
  {
    // The newer service pages. Adds budget + company.
    id: "4603",
    title: "Contact Form H_5",
    kind: "submission",
    fields: {
      "text-487": "full_name",
      "email-488": "email",
      "text-489": "budget",
      "text-490": "company",
      "textarea-491": "message",
    },
    successMessage: SENT,
  },
  {
    // The only form with a phone field.
    id: "4005",
    title: "Marketing Landing Page Book Strategy Call",
    kind: "submission",
    fields: { "your-name": "full_name", "your-email": "email", tel: "phone", "your-message": "message" },
    successMessage: SENT,
  },
  {
    // The homepages' inline signup.
    id: "324",
    title: "Newsletter H_2",
    kind: "newsletter",
    fields: { "email-412": "email" },
    successMessage: SENT,
  },
  {
    id: "328",
    title: "Newsletter H_4",
    kind: "newsletter",
    fields: { "email-765": "email" },
    successMessage: SENT,
  },
  {
    // The Contact page's form: the WPCode snippet [pc_contact_form] (post 1805),
    // not CF7. On WordPress it saved a `pc_lead` post and emailed admin + visitor.
    id: "pc-contact",
    title: "Contact Page — Tell Us What's Not Working",
    kind: "submission",
    fields: { pc_name: "full_name", pc_email: "email", pc_msg: "message" },
    optional: { pc_phone: "phone", pc_business: "company" },
    successMessage: "Message Received.",
  },
];

export function getFormById(id: string): FormDefinition | undefined {
  return forms.find((form) => form.id === id);
}
