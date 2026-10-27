/**
 * Regenerate every converted WordPress component from the snapshots.
 *
 *   node scripts/wp-port/generate.mjs
 *
 * Add a page by saving its snapshot (curl <wp>/<path>/ > snapshots/<page>.html),
 * running capture-assets.mjs for it, and adding its jobs below.
 */

import { execFileSync } from "node:child_process";
import path from "node:path";

const converter = path.join(import.meta.dirname, "html-to-jsx.mjs");

const jobs = [
  // Site chrome, shared by every page (taken from the home page).
  ["home", "div.elementor-268", "src/wp/chrome/WpHeader.tsx", "WpHeader"],
  ["home", "div.elementor-4785", "src/wp/chrome/WpFooter.tsx", "WpFooter"],
  ["home", "#pum-4518", "src/wp/chrome/WpContactPopup.tsx", "WpContactPopup"],
  ["home", "div.nm-preloader", "src/wp/chrome/WpPreloader.tsx", "WpPreloader"],
  ["home", "div.wa-back-to-top", "src/wp/chrome/WpBackToTop.tsx", "WpBackToTop"],
  ["home", "div.page-wrapper > svg", "src/wp/chrome/WpSvgDefs.tsx", "WpSvgDefs"],

  // Pages.
  ["home", "div.elementor-234", "src/wp/home/HomeContent.tsx", "HomeSection", "--split"],
  ["about", "div.nm-breadcrumb-area", "src/wp/about/AboutBreadcrumb.tsx", "AboutBreadcrumb"],
  ["about", "div.elementor-220", "src/wp/about/AboutContent.tsx", "AboutSection", "--split"],
  ["contact", "div.nm-breadcrumb-area", "src/wp/contact/ContactBreadcrumb.tsx", "ContactBreadcrumb"],
  ["contact", "div.elementor-229", "src/wp/contact/ContactContent.tsx", "ContactSection", "--split"],
];

for (const args of jobs) {
  execFileSync(process.execPath, [converter, ...args], { stdio: "inherit" });
}
