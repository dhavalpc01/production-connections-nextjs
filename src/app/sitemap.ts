import type { MetadataRoute } from "next";
import { industries, industryCategories } from "@/content/industries";
import { services } from "@/content/services";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about-us/",
    "/contact/",
    "/services/",
    "/industries/",
    "/blog/",
    "/privacy-policy/",
    ...services.map((service) => `/services/${service.slug}/`),
    ...industryCategories.map((category) => `/industries/${category.slug}/`),
    ...industries.map((industry) => `/industries/${industry.category}/${industry.slug}/`),
  ];
  return paths.map((path) => ({ url: new URL(path, site.url).toString() }));
}
