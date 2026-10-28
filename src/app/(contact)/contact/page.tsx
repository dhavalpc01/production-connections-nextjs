import { ContactBreadcrumb } from "@/wp/contact/ContactBreadcrumb";
import { ContactSection } from "@/wp/contact/ContactContent";
import { wpMetadata } from "@/wp/WpDocument";

export const metadata = wpMetadata("contact", "/contact/");

export default function ContactPage() {
  return (
    <>
      <ContactBreadcrumb />
      <ContactSection />
    </>
  );
}
