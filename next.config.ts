import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // WordPress URLs end in a slash; keep them identical so links and rankings carry over.
  trailingSlash: true,
  // Each ported WordPress page is its own root layout, so 404s need a global page.
  experimental: {
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Mirrors inc/legacy-redirects.php in the WordPress theme.
  async redirects() {
    const renamedServices: Record<string, string> = {
      "ai-marketing-automation": "ai-automation-systems",
      "social-media-advertising": "social-media-marketing",
      "google-ads-ppc": "pay-per-click",
      "marketing-strategy": "digital-strategy-marketing",
    };
    return [
      ...Object.entries(renamedServices).map(([from, to]) => ({
        source: `/services/${from}/`,
        destination: `/services/${to}/`,
        permanent: true,
      })),
      { source: "/our-services/", destination: "/services/", permanent: true },
      // The first Next.js scaffold used /contact-us/; WordPress serves /contact/.
      { source: "/contact-us/", destination: "/contact/", permanent: true },
    ];
  },
};

export default nextConfig;
