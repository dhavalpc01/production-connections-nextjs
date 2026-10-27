import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Page metadata in one shape. WP set these through Yoast + inc/seo-meta.php;
 * titles that already carry the site name (as Yoast's do) pass through as-is.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description?: string;
  path: string;
  image?: string;
}): Metadata {
  const fullTitle = title.includes(site.name) || path === "/" ? title : `${title} | ${site.name}`;
  return {
    metadataBase: new URL(site.url),
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      locale: "en_US",
      images: image ? [image] : undefined,
    },
    twitter: { card: "summary_large_image" },
    icons: { icon: "/images/pc-icon.svg" },
  };
}
