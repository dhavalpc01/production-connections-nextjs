import type { ReactNode } from "react";
import assets from "./assets.json";
import { WpBackToTop } from "./chrome/WpBackToTop";
import { WpContactPopup } from "./chrome/WpContactPopup";
import { WpFooter } from "./chrome/WpFooter";
import { WpHeader } from "./chrome/WpHeader";
import { WpPreloader } from "./chrome/WpPreloader";
import { WpSvgDefs } from "./chrome/WpSvgDefs";
import { WpRuntime } from "./WpRuntime";

export type WpPage = keyof typeof assets;

/**
 * The root document for a page ported from WordPress: the page's own
 * stylesheets in WordPress's order, its body classes (the theme's CSS keys
 * off them), and the shared chrome around the page content.
 *
 * Each ported page is its own root layout, so moving between them is a full
 * page load, as on WordPress, and one page's stylesheets never leak into
 * another's.
 */
export function WpDocument({ page, bodyClass, children }: { page: WpPage; bodyClass: string; children: ReactNode }) {
  const { styles, scripts } = assets[page];
  return (
    <html lang="en-US">
      <head>
        {styles.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        {/* WordPress gets this from the GeoGrid widget at runtime, last in <head>. */}
        <link rel="stylesheet" href="/wp/inline/geogrid-widget.css" />
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

/** Body classes WordPress gives every Elementor page, plus the page's own. */
export function wpBodyClass(pageId: number, extra: string[] = []) {
  return [
    ...extra.filter((c) => c === "home"),
    "wp-singular page-template page-template-elementor_header_footer page",
    `page-id-${pageId}`,
    "wp-embed-responsive wp-theme-nimo wp-child-theme-nimo-child theme-nimo woocommerce-js",
    ...extra.filter((c) => c !== "home"),
    "no-sidebar elementor-default elementor-template-full-width elementor-kit-9 elementor-page",
    `elementor-page-${pageId}`,
  ].join(" ");
}
