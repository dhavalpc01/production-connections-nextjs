import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Page metadata in one shape. WP set these through Yoast + inc/seo-meta.php;
 * titles already carry " | Production Connections" in the content files, so
 * `title` is passed through as-is when it does.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description?: string;
  path: string;
}): Metadata {
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, siteName: site.name, type: "website" },
  };
}
