import { IndustriesSection } from "@/wp/industries/IndustriesContent";
import { wpMetadata } from "@/wp/WpDocument";

export const metadata = wpMetadata("industries", "/industries/");

export default function IndustriesPage() {
  return <IndustriesSection />;
}
