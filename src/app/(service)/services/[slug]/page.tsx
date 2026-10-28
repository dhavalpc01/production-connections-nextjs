import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicePages } from "@/wp/services/registry";
import { isWpPage, wpMetadata } from "@/wp/WpDocument";

export function generateStaticParams() {
  return Object.keys(servicePages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = `svc-${slug}`;
  return isWpPage(page) ? wpMetadata(page, `/services/${slug}/`) : {};
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const Page = servicePages[slug];
  if (!Page) notFound();
  return <Page />;
}
