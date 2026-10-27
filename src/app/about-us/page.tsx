import { PagePlaceholder } from "@/components/PagePlaceholder";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "About Us", path: "/about-us/" });

// WP: copy from scripts/apply-about-copy.php, styles in assets/css/about.css.
export default function AboutPage() {
  return <PagePlaceholder eyebrow="About" title="About Us" sourceFile="scripts/apply-about-copy.php" />;
}
