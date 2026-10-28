import { WpDocument } from "@/wp/WpDocument";

// WP: page 220 (About Us), styled by about.css under body.pc-about.
export default function AboutLayout({ children }: LayoutProps<"/">) {
  return <WpDocument page="about">{children}</WpDocument>;
}
