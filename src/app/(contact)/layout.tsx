import { WpDocument, wpBodyClass } from "@/wp/WpDocument";

// WP: page 229 (Contact), styled by contact.css under body.pc-contact.
export default function ContactLayout({ children }: LayoutProps<"/">) {
  return (
    <WpDocument page="contact" bodyClass={wpBodyClass(229, ["pc-contact"])}>
      {children}
    </WpDocument>
  );
}
