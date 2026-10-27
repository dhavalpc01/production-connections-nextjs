import { PagePlaceholder } from "@/components/PagePlaceholder";
import { industryCategories } from "@/content/industries";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Industries", path: "/industries/" });

// WP: built by build-industries-page.php (project root), styled by
// assets/css/industries.css, assets/js/industry-card-reveal.js.
export default function IndustriesPage() {
  return (
    <PagePlaceholder
      eyebrow="Industries"
      title="Industries We Serve"
      sourceFile="build-industries-page.php"
      links={industryCategories.map((category) => ({
        label: category.title,
        href: `/industries/${category.slug}/`,
      }))}
    />
  );
}
