/**
 * Site-wide facts: brand, contact details, navigation.
 *
 * Contact values come from the WordPress build script
 * scripts/contact-details.php (the client-confirmed replacements for the
 * theme demo's placeholders). The WP navigation is generated from the
 * database (inc/service-menu.php, inc/industry-menu.php), so the menu here is
 * rebuilt from the same content lists in services.ts and industries.ts.
 */

import { serviceCategories, servicesInCategory } from "./services";
import { industryCategories, industriesInCategory } from "./industries";

export const site = {
  name: "Production Connections",
  url: "https://productionconnections.com",
  email: "info@productionconnections.com",
  phone: {
    display: "+1 (615) 345-6377",
    href: "tel:+16153456377",
  },
  location: "United States",
  hours: ["Mon – Fri: 9:00 AM – 5:00 PM EST", "Sat – Sun: Closed"],
  // TODO(port): social links live in the tf-footer post on the WP database.
  // Fill these in when the footer is converted.
  social: [] as { label: string; href: string }[],
} as const;

export type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
};

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us/" },
  {
    label: "Services",
    href: "/services/",
    children: serviceCategories.map((category) => ({
      label: category.title,
      href: `/services/#${category.slug}`,
      children: servicesInCategory(category.slug).map((service) => ({
        label: service.menuLabel ?? service.title,
        href: `/services/${service.slug}/`,
      })),
    })),
  },
  {
    label: "Industries",
    href: "/industries/",
    children: industryCategories.map((category) => ({
      label: category.title,
      href: `/industries/${category.slug}/`,
      children: industriesInCategory(category.slug).map((industry) => ({
        label: industry.title,
        href: `/industries/${category.slug}/${industry.slug}/`,
      })),
    })),
  },
  {
    label: "Resources",
    href: "/blog/",
    children: [{ label: "Blog", href: "/blog/" }],
  },
  { label: "Contact", href: "/contact-us/" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us/" },
      { label: "Services", href: "/services/" },
      { label: "Industries", href: "/industries/" },
      { label: "Blog", href: "/blog/" },
      { label: "Contact", href: "/contact-us/" },
    ],
  },
  {
    title: "Legal",
    links: [{ label: "Privacy Policy", href: "/privacy-policy/" }],
  },
];
