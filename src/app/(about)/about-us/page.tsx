import { AboutBreadcrumb } from "@/wp/about/AboutBreadcrumb";
import { AboutSection } from "@/wp/about/AboutContent";
import { wpMetadata } from "@/wp/WpDocument";

export const metadata = wpMetadata("about", "/about-us/");

export default function AboutPage() {
  return (
    <>
      <AboutBreadcrumb />
      <AboutSection />
    </>
  );
}
