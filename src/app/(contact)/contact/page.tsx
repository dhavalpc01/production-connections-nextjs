import { pageMetadata } from "@/lib/seo";
import { ContactBreadcrumb } from "@/wp/contact/ContactBreadcrumb";
import { ContactSection } from "@/wp/contact/ContactContent";

export const metadata = pageMetadata({
  title: "Contact - Production Connections",
  description:
    "Get in touch with our team to discuss AI marketing solutions, PPC, and digital growth strategies. We’re ready to help you scale your business today.",
  path: "/contact/",
  image: "/wp/wp-content/uploads/2025/08/c1-img-1-1.webp",
});

export default function ContactPage() {
  return (
    <>
      <ContactBreadcrumb />
      <ContactSection />
    </>
  );
}
