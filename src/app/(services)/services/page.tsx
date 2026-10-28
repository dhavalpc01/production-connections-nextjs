import { ServicesBreadcrumb } from "@/wp/services/ServicesBreadcrumb";
import { ServicesContent } from "@/wp/services/ServicesContent";
import { wpMetadata } from "@/wp/WpDocument";

export const metadata = wpMetadata("services", "/services/");

export default function ServicesPage() {
  return (
    <>
      <ServicesBreadcrumb />
      <ServicesContent />
    </>
  );
}
