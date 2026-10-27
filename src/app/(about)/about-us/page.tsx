import { pageMetadata } from "@/lib/seo";
import { AboutBreadcrumb } from "@/wp/about/AboutBreadcrumb";
import { AboutSection } from "@/wp/about/AboutContent";

export const metadata = pageMetadata({
  title: "About Us - Production Connections",
  description:
    "Discover our story and mission in AI marketing automation, helping businesses scale with smart strategies, innovation, and data-driven growth.",
  path: "/about-us/",
  image: "/wp/wp-content/uploads/2025/08/t1-author-1.webp",
});

export default function AboutPage() {
  return (
    <>
      <AboutBreadcrumb />
      <AboutSection />
    </>
  );
}
