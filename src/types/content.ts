/**
 * Content types shared by the page data files in src/content/.
 *
 * The summary types cover what the menus, index pages and sitemap need.
 * Each page type's full section shape (hero, opener cards, process, FAQ...)
 * gets its own type here as that page type is converted from its WP builder.
 */

export type ServiceCategory = {
  slug: string;
  title: string;
};

export type ServiceSummary = {
  slug: string;
  title: string;
  /** Shorter label for the menu, when the page title is too long for it. */
  menuLabel?: string;
  /** <title> from the WP content file; falls back to "<title> | Production Connections". */
  seoTitle?: string;
  seoDescription?: string;
  category: ServiceCategory["slug"];
  /** The WordPress file this page's copy is ported from. */
  sourceFile: string;
};

export type IndustryCategory = {
  slug: string;
  title: string;
  seoDescription?: string;
  sourceFile: string;
};

export type IndustrySummary = {
  slug: string;
  title: string;
  category: IndustryCategory["slug"];
  seoDescription?: string;
  sourceFile: string;
};
