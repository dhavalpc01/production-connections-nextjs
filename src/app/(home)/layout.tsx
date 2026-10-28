import { WpDocument } from "@/wp/WpDocument";

// WP: page 234, Elementor full width, with home-viewport.css.
export default function HomeLayout({ children }: LayoutProps<"/">) {
  return <WpDocument page="home">{children}</WpDocument>;
}
