import { WpDocument } from "@/wp/WpDocument";

// WP: the Industries landing page (Elementor), industries.css.
export default function IndustriesLayout({ children }: LayoutProps<"/industries">) {
  return <WpDocument page="industries">{children}</WpDocument>;
}
