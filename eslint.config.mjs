import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Markup ported from WordPress (scripts/wp-port/html-to-jsx.mjs). It keeps
    // WordPress's plain <img> and <a> tags so the theme CSS and JS see the
    // same DOM; the runtime there loads the theme's own scripts and styles.
    files: ["src/wp/**"],
    rules: {
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-head-element": "off",
      "@next/next/no-css-tags": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendor files copied from WordPress (theme JS, plugin CSS).
    "public/wp/**",
    "scripts/wp-port/snapshots/**",
  ]),
]);

export default eslintConfig;
