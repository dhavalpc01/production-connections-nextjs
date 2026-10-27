import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { getService, services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

// WP: Service Detail (single-services.php + scripts/lib/pc-service-builder.php,
// assets/css/service-detail.css + service-glass.css, assets/js/service-detail.js).
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.seoTitle ?? service.title,
    description: service.seoDescription,
    path: `/services/${service.slug}/`,
  });
}

export default async function ServiceDetailPage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  return <PagePlaceholder eyebrow="Service" title={service.title} sourceFile={service.sourceFile} />;
}
