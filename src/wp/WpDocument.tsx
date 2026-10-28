import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";
import assets from "./assets.json";
import { WpBackToTop } from "./chrome/WpBackToTop";
import { WpContactPopup } from "./chrome/WpContactPopup";
import { WpFooter } from "./chrome/WpFooter";
import { WpHeader } from "./chrome/WpHeader";
import { WpPreloader } from "./chrome/WpPreloader";
import { WpSvgDefs } from "./chrome/WpSvgDefs";
import { WpRuntime } from "./WpRuntime";

export type WpPage = keyof typeof assets;

export function isWpPage(page: string): page is WpPage {
  return page in assets;
}

/**
 * The root document for a page ported from WordPress: the page's own
 * stylesheets in WordPress's order, its body classes (the theme's CSS keys
 * off them), Yoast's schema, and the shared chrome around the page content.
 *
 * Each ported page is its own root layout, so moving between them is a full
 * page load, as on WordPress, and one page's stylesheets never leak into
 * another's.
 */
export function WpDocument({ page, children }: { page: WpPage; children: ReactNode }) {
  const { styles, scripts, bodyClass, jsonLd } = assets[page];
  return (
    <html lang="en-US">
      <head>
        {styles.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        {/* WordPress gets this from the GeoGrid widget at runtime, last in <head>. */}
        <link rel="stylesheet" href="/wp/inline/geogrid-widget.css" />
        {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />}
      </head>
      <body className={bodyClass}>
        <div className="page-wrapper main-wrapper">
          <WpPreloader />
          <WpBackToTop />
          <div className="wa-overly" />
          <WpHeader />
          {children}
          <WpFooter />
          <WpContactPopup />
          <WpSvgDefs />
        </div>
        <WpRuntime scripts={scripts} />
      </body>
    </html>
  );
}

/** The page's <title>, description and share image, as WordPress (Yoast) set them. */
export function wpMetadata(page: WpPage, path: string): Metadata {
  const { title, description, ogImage } = assets[page];
  return pageMetadata({ title, description: description ?? undefined, path, image: ogImage ?? undefined });
}
