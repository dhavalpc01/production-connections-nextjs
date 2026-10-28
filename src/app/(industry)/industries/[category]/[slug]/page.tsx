import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industryPages } from "@/wp/industries/registry";
import { isWpPage, wpMetadata } from "@/wp/WpDocument";

export function generateStaticParams() {
  return Object.keys(industryPages)
    .filter((key) => key.includes("/"))
    .map((key) => {
      const [category, slug] = key.split("/");
      return { category, slug };
    });
}

export async function generateMetadata({ params }: PageProps<"/industries/[category]/[slug]">): Promise<Metadata> {
  const { category, slug } = await params;
  const page = `ind-${category}--${slug}`;
  return isWpPage(page) ? wpMetadata(page, `/industries/${category}/${slug}/`) : {};
}

export default async function IndustryPage({ params }: PageProps<"/industries/[category]/[slug]">) {
  const { category, slug } = await params;
  const Page = industryPages[`${category}/${slug}`];
  if (!Page) notFound();
  return <Page />;
}
