import { PagePlaceholder } from "@/components/PagePlaceholder";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Privacy Policy", path: "/privacy-policy/" });

// WP: built by scripts/lib/pc-legal-builder.php, styled by assets/css/legal.css.
export default function PrivacyPolicyPage() {
  return <PagePlaceholder eyebrow="Legal" title="Privacy Policy" sourceFile="assets/css/legal.css" />;
}
