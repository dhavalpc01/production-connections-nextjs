import { notFound } from "next/navigation";
import { isWpPage, WpDocument } from "@/wp/WpDocument";

// WP: an Industry Detail page (pc-industry-detail, industry-detail.css), one
// root layout per page for its own Elementor post CSS.
export default async function IndustryLayout({ children, params }: LayoutProps<"/industries/[category]/[slug]">) {
  const { category, slug } = await params;
  const page = `ind-${category}--${slug}`;
  if (!isWpPage(page)) notFound();
  return <WpDocument page={page}>{children}</WpDocument>;
}
