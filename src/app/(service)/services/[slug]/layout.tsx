import { notFound } from "next/navigation";
import { isWpPage, WpDocument } from "@/wp/WpDocument";

// WP: a Service Detail page (single-services, Elementor full width). The
// root layout is per slug: each page has its own Elementor post CSS.
export default async function ServiceLayout({ children, params }: LayoutProps<"/services/[slug]">) {
  const { slug } = await params;
  const page = `svc-${slug}`;
  if (!isWpPage(page)) notFound();
  return <WpDocument page={page}>{children}</WpDocument>;
}
