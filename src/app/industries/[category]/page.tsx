import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { getIndustryCategory, industriesInCategory, industryCategories } from "@/content/industries";
import { pageMetadata } from "@/lib/seo";

// WP: Industry Category (scripts/build-industry-category.php,
// inc/industry-category.php, assets/css/industry-category.css).
export function generateStaticParams() {
  return industryCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata(props: PageProps<"/industries/[category]">): Promise<Metadata> {
  const { category: slug } = await props.params;
  const category = getIndustryCategory(slug);
  if (!category) return {};
  return pageMetadata({
    title: category.title,
    description: category.seoDescription,
    path: `/industries/${category.slug}/`,
  });
}

export default async function IndustryCategoryPage(props: PageProps<"/industries/[category]">) {
  const { category: slug } = await props.params;
  const category = getIndustryCategory(slug);
  if (!category) notFound();

  return (
    <PagePlaceholder
      eyebrow="Industries"
      title={category.title}
      sourceFile={category.sourceFile}
      links={industriesInCategory(category.slug).map((industry) => ({
        label: industry.title,
        href: `/industries/${category.slug}/${industry.slug}/`,
      }))}
    />
  );
}
