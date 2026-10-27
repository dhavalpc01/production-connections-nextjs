/**
 * Industries — /industries/, /industries/<category>/,
 * /industries/<category>/<slug>/.
 *
 * WordPress source:
 *   categories  scripts/content-industry-categories/<slug>.php
 *               (built by scripts/build-industry-category.php)
 *   details     scripts/content-industries/<slug>.php
 *               (built by scripts/lib/pc-industry-detail-builder.php)
 *
 * Professional Services is the odd one: its category page is built from
 * scripts/content-industries/professional-services.php (an industry-detail
 * file with parent `industries`), not from content-industry-categories/.
 *
 * Only the index fields live here. Full copy is ported into
 * src/content/industries/<slug>.ts when each page is converted.
 */

import type { IndustryCategory, IndustrySummary } from "@/types/content";

export const industryCategories: IndustryCategory[] = [
  {
    slug: "professional-services",
    title: "Professional Services",
    sourceFile: "scripts/content-industries/professional-services.php",
  },
  {
    slug: "retail-consumer",
    title: "Retail & Consumer",
    sourceFile: "scripts/content-industry-categories/retail-consumer.php",
  },
  {
    slug: "property-logistics",
    title: "Property, Construction & Logistics",
    sourceFile: "scripts/content-industry-categories/property-logistics.php",
  },
  {
    slug: "hospitality-experience",
    title: "Hospitality & Experience",
    sourceFile: "scripts/content-industry-categories/hospitality-experience.php",
  },
  {
    slug: "health-nonprofit",
    title: "Health, Education & Nonprofit",
    sourceFile: "scripts/content-industry-categories/health-nonprofit.php",
  },
];

const detail = (slug: string, title: string, category: string): IndustrySummary => ({
  slug,
  title,
  category,
  sourceFile: `scripts/content-industries/${slug}.php`,
});

export const industries: IndustrySummary[] = [
  detail("law-firms", "Law Firms", "professional-services"),
  detail("financial-services", "Financial Services", "professional-services"),
  detail("merchant-processing", "Merchant Services", "professional-services"),
  detail("public-adjusters", "Public Adjusters", "professional-services"),

  detail("retail", "Retail", "retail-consumer"),
  detail("restaurants", "Restaurants", "retail-consumer"),
  detail("food-beverage", "Food & Beverage", "retail-consumer"),
  detail("automotive", "Automotive", "retail-consumer"),

  detail("construction", "Construction", "property-logistics"),
  detail("real-estate", "Real Estate", "property-logistics"),
  detail("restoration", "Restoration", "property-logistics"),
  detail("supply-chain", "Supply Chain", "property-logistics"),
  detail("transportation", "Transportation", "property-logistics"),

  detail("hospitality-travel", "Hospitality & Travel", "hospitality-experience"),
  detail("meetings-events", "Meetings & Events", "hospitality-experience"),
  detail("sports", "Sports", "hospitality-experience"),

  detail("medical-practices", "Medical Practices", "health-nonprofit"),
  detail("education", "E-learning & Education", "health-nonprofit"),
  detail("nonprofits", "Nonprofits", "health-nonprofit"),
];

export function getIndustryCategory(slug: string): IndustryCategory | undefined {
  return industryCategories.find((category) => category.slug === slug);
}

export function industriesInCategory(category: string): IndustrySummary[] {
  return industries.filter((industry) => industry.category === category);
}

export function getIndustry(category: string, slug: string): IndustrySummary | undefined {
  return industries.find((industry) => industry.category === category && industry.slug === slug);
}
