import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industryPages } from "@/wp/industries/registry";
import { isWpPage, wpMetadata } from "@/wp/WpDocument";

export function generateStaticParams() {
  return Object.keys(industryPages)
    .filter((key) => !key.includes("/"))
    .map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[category]">): Promise<Metadata> {
  const { category } = await params;
  const page = `ind-${category}`;
  return isWpPage(page) ? wpMetadata(page, `/industries/${category}/`) : {};
}

export default async function IndustryCategoryPage({ params }: PageProps<"/industries/[category]">) {
  const { category } = await params;
  const Page = industryPages[category];
  if (!Page) notFound();
  return <Page />;
}
