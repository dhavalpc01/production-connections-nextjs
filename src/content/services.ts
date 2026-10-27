/**
 * Service Detail pages — /services/<slug>/.
 *
 * WordPress source: scripts/content/<file>.php (one per page, shape in
 * scripts/content/_master.php), built by scripts/lib/pc-service-builder.php.
 * Pay Per Click and Digital Strategy come from apply-ppc-copy.php and
 * apply-strategy-copy.php instead.
 *
 * `slug` is the LIVE URL slug. Two content files still carry their old name
 * (`sourceFile` differs from `slug`); inc/legacy-redirects.php 301s the old
 * URLs, mirrored in next.config.ts.
 *
 * Only the index fields live here. Each page's full copy is ported into
 * src/content/services/<slug>.ts when that page is converted.
 */

import type { ServiceCategory, ServiceSummary } from "@/types/content";

export const serviceCategories: ServiceCategory[] = [
  { slug: "design-development", title: "Design & Development" },
  { slug: "marketing-advertising", title: "Marketing & Advertising" },
];

export const services: ServiceSummary[] = [
  // Design & Development
  {
    slug: "website-design",
    title: "Website Design",
    seoTitle: "Small Business Website Design | Production Connections",
    category: "design-development",
    sourceFile: "scripts/content/website-design.php",
  },
  {
    slug: "website-development",
    title: "Website Development",
    seoTitle: "Custom Web Development | Production Connections",
    category: "design-development",
    sourceFile: "scripts/content/website-development.php",
  },
  {
    slug: "logo-design",
    title: "Logo Design",
    seoTitle: "Custom Logo Design | Production Connections",
    category: "design-development",
    sourceFile: "scripts/content/logo-design.php",
  },
  {
    slug: "brand-identity",
    title: "Brand Identity",
    seoTitle: "Brand Identity | Production Connections",
    category: "design-development",
    sourceFile: "scripts/content/brand-identity.php",
  },

  // Marketing & Advertising
  {
    slug: "search-engine-optimization",
    title: "Search Engine Optimization",
    seoTitle: "Professional SEO Services | Production Connections",
    category: "marketing-advertising",
    sourceFile: "scripts/content/search-engine-optimization.php",
  },
  {
    slug: "ai-search-optimization",
    title: "AI Search Optimization",
    seoTitle: "AI Search Optimization (GEO) | Production Connections",
    category: "marketing-advertising",
    sourceFile: "scripts/content/ai-search-optimization.php",
  },
  {
    slug: "pay-per-click",
    title: "Pay Per Click",
    category: "marketing-advertising",
    sourceFile: "scripts/apply-ppc-copy.php",
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    seoTitle: "Social Media Marketing Agency | Production Connections",
    category: "marketing-advertising",
    sourceFile: "scripts/content/social-media-advertising.php",
  },
  {
    slug: "email-marketing",
    title: "Email Marketing",
    seoTitle: "Email Marketing Services | Production Connections",
    category: "marketing-advertising",
    sourceFile: "scripts/content/email-marketing.php",
  },
  {
    slug: "ai-automation-systems",
    title: "AI Automation Systems",
    seoTitle: "AI Automation Services | Production Connections",
    category: "marketing-advertising",
    sourceFile: "scripts/content/ai-marketing-automation.php",
  },
  {
    slug: "digital-strategy-marketing",
    title: "Digital Strategy & Marketing",
    category: "marketing-advertising",
    sourceFile: "scripts/apply-strategy-copy.php",
  },
  {
    slug: "media-production",
    title: "Media Production",
    seoTitle: "Media Production | Production Connections",
    category: "marketing-advertising",
    sourceFile: "scripts/content/media-production.php",
  },
  {
    slug: "targeted-tv-advertising",
    title: "Targeted TV Advertising",
    seoTitle: "Targeted TV Advertising | Production Connections",
    category: "marketing-advertising",
    sourceFile: "scripts/content/targeted-tv-advertising.php",
  },
  {
    slug: "billboard-advertising",
    title: "Billboard Advertising",
    seoTitle: "Billboard Advertising | Production Connections",
    category: "marketing-advertising",
    sourceFile: "scripts/content/billboard-advertising.php",
  },
];

export function getService(slug: string): ServiceSummary | undefined {
  return services.find((service) => service.slug === slug);
}

export function servicesInCategory(category: string): ServiceSummary[] {
  return services.filter((service) => service.category === category);
}
