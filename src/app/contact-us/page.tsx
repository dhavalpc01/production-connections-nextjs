import { PagePlaceholder } from "@/components/PagePlaceholder";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Contact Us", path: "/contact-us/" });

// WP: styles in assets/css/contact.css; the form posts to /api/leads.
export default function ContactPage() {
  return <PagePlaceholder eyebrow="Contact" title="Contact Us" sourceFile="assets/css/contact.css" />;
}
