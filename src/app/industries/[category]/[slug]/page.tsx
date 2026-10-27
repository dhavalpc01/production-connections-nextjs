import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { getIndustry, getIndustryCategory, industries } from "@/content/industries";
import { pageMetadata } from "@/lib/seo";

// WP: Industry Detail (scripts/lib/pc-industry-detail-builder.php,
// inc/industry-detail.php, assets/css/industry-detail.css,
// assets/js/industry-cta.js).
export function generateStaticParams() {
  return industries.map((industry) => ({ category: industry.category, slug: industry.slug }));
}

export async function generateMetadata(props: PageProps<"/industries/[category]/[slug]">): Promise<Metadata> {
  const { category, slug } = await props.params;
  const industry = getIndustry(category, slug);
  if (!industry) return {};
  return pageMetadata({
    title: industry.title,
    description: industry.seoDescription,
    path: `/industries/${category}/${industry.slug}/`,
  });
}

export default async function IndustryDetailPage(props: PageProps<"/industries/[category]/[slug]">) {
  const { category, slug } = await props.params;
  const industry = getIndustry(category, slug);
  if (!industry) notFound();

  return (
    <PagePlaceholder
      eyebrow={getIndustryCategory(category)?.title ?? "Industries"}
      title={industry.title}
      sourceFile={industry.sourceFile}
    />
  );
}
