import { WpDocument } from "@/wp/WpDocument";

// WP: the `services` post-type archive, rendered by the Nimo theme (not Elementor).
export default function ServicesLayout({ children }: LayoutProps<"/services">) {
  return <WpDocument page="services">{children}</WpDocument>;
}
