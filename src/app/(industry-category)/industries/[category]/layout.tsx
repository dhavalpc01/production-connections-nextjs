import { notFound } from "next/navigation";
import { isWpPage, WpDocument } from "@/wp/WpDocument";

// WP: an industry category page. Each has its own Elementor post CSS, so the
// root layout is chosen per category. (Professional Services' category page
// is built on the industry-detail template.)
export default async function IndustryCategoryLayout({ children, params }: LayoutProps<"/industries/[category]">) {
  const { category } = await params;
  const page = `ind-${category}`;
  if (!isWpPage(page)) notFound();
  return <WpDocument page={page}>{children}</WpDocument>;
}
