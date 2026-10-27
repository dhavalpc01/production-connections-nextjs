import type { Metadata } from "next";
import { HomeSection } from "@/wp/home/HomeContent";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Performance Marketing Agency for Modern Businesses",
  description:
    "Drive growth with a full-service digital marketing agency offering AI automation, PPC, and industry-specific strategies designed to boost leads and ROI.",
  path: "/",
  image: "/wp/wp-content/uploads/2026/06/PC-Animated-Logo.gif",
});

export default function HomePage() {
  return <HomeSection />;
}
