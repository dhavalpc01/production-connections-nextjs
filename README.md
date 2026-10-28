# production-connections-nextjs

Next.js rebuild of productionconnections.com, converted page by page from the
WordPress + Elementor site in
[Dev-Suthar/production-connections](https://github.com/Dev-Suthar/production-connections)
(branch `latestAllPagesAt-21-10`, the latest copy of every page).

Stack: Next.js 16 (App Router, Turbopack, Cache Components), React 19,
TypeScript, Tailwind CSS 4.

## Run it

```bash
npm install
cp .env.example .env.local   # only needed for the lead form API
npm run dev                  # http://localhost:3000
npm run build && npm start   # production check
npm run lint
```

## Layout

| Path | What it is |
|---|---|
| `src/app/` | Routes. One folder per WP URL, trailing slash kept (`trailingSlash: true`). Ported pages are route groups with their own root layout: `(home)`, `(about)`, `(contact)`, `(services)`, `(service)` (`/services/[slug]/`), `(industries)`, `(industry-category)`, `(industry)`; the rest are placeholders in `(site)`. |
| `src/wp/` | Pages ported from WordPress: generated section components, shared chrome, `WpDocument` (stylesheets + body classes) and `WpRuntime` (theme JS, forms, popups). |
| `public/wp/` | The WordPress CSS, JS, fonts and images those pages use, at their `wp-content` paths. |
| `scripts/wp-port/` | The porting tools: snapshots, `capture-assets.mjs`, `html-to-jsx.mjs`, `generate.mjs`. |
| `src/app/api/leads/route.ts` | Form capture → Supabase (`form_submissions`, `newsletter_signups`). |
| `src/components/layout/` | Header (desktop dropdowns + flyouts), MobileNav, Footer. |
| `src/components/PagePlaceholder.tsx` | Stand-in for routes not converted yet. |
| `src/content/` | Page data. `site.ts` (contact + nav), `services.ts`, `industries.ts`. |
| `src/lib/forms/` | Form definitions and validation rules ported from `inc/form-rules.php`. |
| `src/lib/seo.ts` | Per-page metadata helper. |
| `src/types/content.ts` | Content types; grows a section shape per page type as it is converted. |
| `public/images/` | Theme images; `public/images/pillar/` is the page photography (`assets/pillar-images/`). |
| `next.config.ts` | Legacy 301s mirrored from `inc/legacy-redirects.php`. |

## Design system

Tokens and utilities live in `src/app/globals.css`, ported from the child
theme's CSS:

- Colours: `gold` #ffa201, `grey` #83848b, `ink` #0e0e0e and friends
  (`bg-ink`, `text-gold`, …).
- Fonts: Outfit for headings (`font-heading`), DM Sans for body.
- Glass: `glass-dark` (default for cards), `glass-white` (small inset parts),
  `glass-amber` (CTA buttons), plus `glass-edge` for the client's 1px
  white-gradient corner ring and `fade-line` for fade-edge rules. Glass is for
  surfaces only, never behind copy.

## Converting a page

See [MIGRATION.md](MIGRATION.md) for the route map, the WP source of every
page, and the conversion checklist.
