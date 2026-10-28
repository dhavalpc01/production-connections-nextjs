import { WpDocument } from "@/wp/WpDocument";

// WP: page 229 (Contact), styled by contact.css under body.pc-contact.
export default function ContactLayout({ children }: LayoutProps<"/">) {
  return <WpDocument page="contact">{children}</WpDocument>;
}
