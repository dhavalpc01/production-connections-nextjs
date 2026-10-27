import { WpDocument, wpBodyClass } from "@/wp/WpDocument";

// WP: page 220 (About Us), styled by about.css under body.pc-about.
export default function AboutLayout({ children }: LayoutProps<"/">) {
  return (
    <WpDocument page="about" bodyClass={wpBodyClass(220, ["pc-about"])}>
      {children}
    </WpDocument>
  );
}
