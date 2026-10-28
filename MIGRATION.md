# WordPress → Next.js migration

Source: `Dev-Suthar/production-connections`, branch `latestAllPagesAt-21-10`.
In that repo, page copy lives in the PHP build scripts (not in wp-admin), so
those scripts are the source of truth for every page below. Paths in the
"WP source" column are relative to that repo; theme files are under
`public/wp-content/themes/nimo-child/`.

## How pages are ported (same-to-same)

The design reference is the local WordPress mirror of the
`latestAllPagesAt-21-10` branch (`D:\Project\Wordpress\production-connections`,
served at `http://localhost:8090`). Each page is ported from what that mirror
actually renders, so the result matches it pixel for pixel:

- **Markup** — `scripts/wp-port/html-to-jsx.mjs` turns the rendered HTML into
  React components (`src/wp/<page>/`, one file per section), keeping every
  class name, so the WordPress CSS applies unchanged.
- **Styles** — `scripts/wp-port/capture-assets.mjs` copies the page's
  stylesheets, fonts and images into `public/wp/` (same `wp-content` paths)
  and records their order in `src/wp/assets.json`. `src/wp/WpDocument.tsx`
  links them in that order with WordPress's body classes.
- **Behaviour** — `src/wp/WpRuntime.tsx` loads the theme's own scripts
  (jQuery, GSAP/ScrollTrigger/SplitText, Swiper, Lenis, WOW, marquee...) after
  hydration, in WordPress's order, and replaces the server-side parts:
  forms post to `/api/leads`, Popup Maker's click trigger, current-menu marking.
- **Isolation** — every ported page is its own root layout
  (`src/app/(home)`, `(about)`, `(contact)`, `(services)`, and `(service)` whose
  root layout picks the page by slug), so navigating between them is a
  full page load as on WordPress and no page's CSS leaks into another.

To port another page:

1. `curl -s http://localhost:8090/<path>/ -o scripts/wp-port/snapshots/<page>.html`
2. `node scripts/wp-port/capture-assets.mjs http://localhost:8090 <page>`
3. Add its jobs (page content selector, breadcrumb) to `scripts/wp-port/generate.mjs`
   and run `node scripts/wp-port/generate.mjs`.
4. Add `src/app/(<page>)/layout.tsx` rendering `<WpDocument page="<page>">`
   and the route's `page.tsx` with `export const metadata = wpMetadata("<page>", "/<path>/")`.
   Body classes, title, description, share image and Yoast's JSON-LD come
   from the snapshot via `src/wp/assets.json`. Remove the placeholder route.
   For a family of same-template pages (like `/services/<slug>/`), put the
   root layout in the `[slug]` folder so it can pick the page from `params`.
5. `npm run build`, run it, and compare with the mirror at 1366×657, 768 and
   375 wide: page height and each section's height should match.
6. Tick the box below.

Header, footer, preloader, back-to-top and the contact popup are shared
(`src/wp/chrome/`, from the home snapshot).

## Route map

### Core pages

| Done | URL | WP source | Styles / scripts |
|---|---|---|---|
| [x] | `/` | `scripts/apply-home-copy.php`, `inc/home-copy-render.php`, `inc/home-network.php` | `home-viewport.css`, `glass.css` |
| [x] | `/about-us/` | `scripts/apply-about-copy.php` | `about.css`, `about-cards-reveal.js` |
| [x] | `/contact/` | contact page + `[pc_contact_form]` (see Forms) | `contact.css` |
| [x] | `/services/` | `services` archive, `inc/service-page.php` | `services-stack.css`, `pc-service-index.js` |
| [ ] | `/industries/` | `build-industries-page.php` (repo root) | `industries.css`, `industry-card-reveal.js` |
| [ ] | `/blog/` | DB only (posts are not in scripts) — export first | `inc/blog-grid-order.php` |
| [ ] | `/privacy-policy/` | `scripts/lib/pc-legal-builder.php` | `legal.css` |

### Service Detail — `/services/<slug>/`

Builder: `scripts/lib/pc-service-builder.php`, shape in `scripts/content/_master.php`,
template `single-services.php`. Styles: `service-detail.css`, `service-glass.css`;
script: `service-detail.js`.

| Done | Slug | Category | WP content file |
|---|---|---|---|
| [x] | `website-design` | Design & Development | `scripts/content/website-design.php` |
| [x] | `website-development` | Design & Development | `scripts/content/website-development.php` |
| [x] | `logo-design` | Design & Development | `scripts/content/logo-design.php` |
| [x] | `brand-identity` | Design & Development | `scripts/content/brand-identity.php` |
| [x] | `search-engine-optimization` | Marketing & Advertising | `scripts/content/search-engine-optimization.php` |
| [x] | `ai-search-optimization` | Marketing & Advertising | `scripts/content/ai-search-optimization.php` |
| [x] | `pay-per-click` | Marketing & Advertising | `scripts/apply-ppc-copy.php`, `scripts/build-ppc-templates.php` |
| [x] | `social-media-marketing` | Marketing & Advertising | `scripts/content/social-media-advertising.php` |
| [x] | `email-marketing` | Marketing & Advertising | `scripts/content/email-marketing.php` |
| [x] | `ai-automation-systems` | Marketing & Advertising | `scripts/content/ai-marketing-automation.php` |
| [x] | `digital-strategy-marketing` | Marketing & Advertising | `scripts/apply-strategy-copy.php`, `scripts/build-strategy-templates.php` |
| [x] | `media-production` | Marketing & Advertising | `scripts/content/media-production.php` |
| [x] | `targeted-tv-advertising` | Marketing & Advertising | `scripts/content/targeted-tv-advertising.php` |
| [x] | `billboard-advertising` | Marketing & Advertising | `scripts/content/billboard-advertising.php` |

Category assignment comes from the WP `service-category` taxonomy (DB); the
four Design / ten Marketing split matches the theme's nav notes. Confirm
against the live menu.

### Industry Category — `/industries/<category>/`

Builder: `scripts/build-industry-category.php`, `inc/industry-category.php`.
Styles: `industry-category.css`.

| Done | Slug | WP content file |
|---|---|---|
| [ ] | `professional-services` | `scripts/content-industries/professional-services.php` (detail-builder file) |
| [ ] | `retail-consumer` | `scripts/content-industry-categories/retail-consumer.php` |
| [ ] | `property-logistics` | `scripts/content-industry-categories/property-logistics.php` |
| [ ] | `hospitality-experience` | `scripts/content-industry-categories/hospitality-experience.php` |
| [ ] | `health-nonprofit` | `scripts/content-industry-categories/health-nonprofit.php` |

### Industry Detail — `/industries/<category>/<slug>/`

Builder: `scripts/lib/pc-industry-detail-builder.php`, `inc/industry-detail.php`.
Styles: `industry-detail.css`; script: `industry-cta.js`. Content file is
`scripts/content-industries/<slug>.php` for every row.

| Done | Category | Slug |
|---|---|---|
| [ ] | professional-services | `law-firms` |
| [ ] | professional-services | `financial-services` |
| [ ] | professional-services | `merchant-processing` |
| [ ] | professional-services | `public-adjusters` |
| [ ] | retail-consumer | `retail` |
| [ ] | retail-consumer | `restaurants` |
| [ ] | retail-consumer | `food-beverage` |
| [ ] | retail-consumer | `automotive` |
| [ ] | property-logistics | `construction` |
| [ ] | property-logistics | `real-estate` |
| [ ] | property-logistics | `restoration` |
| [ ] | property-logistics | `supply-chain` |
| [ ] | property-logistics | `transportation` |
| [ ] | hospitality-experience | `hospitality-travel` |
| [ ] | hospitality-experience | `meetings-events` |
| [ ] | hospitality-experience | `sports` |
| [ ] | health-nonprofit | `medical-practices` |
| [ ] | health-nonprofit | `education` |
| [ ] | health-nonprofit | `nonprofits` |

### Site chrome

| Done | Piece | Where |
|---|---|---|
| [x] | Header + desktop/mobile menus + off-canvas | `src/wp/chrome/WpHeader.tsx` (Elementor 268) |
| [x] | Footer | `src/wp/chrome/WpFooter.tsx` (Elementor 4785) |
| [x] | Preloader, back-to-top, SVG gold filter | `src/wp/chrome/` |
| [x] | Contact popup (Popup Maker 4518) | `src/wp/chrome/WpContactPopup.tsx`, opened by `.popmake-4518` |
| [x] | Breadcrumb banner | per page, e.g. `src/wp/about/AboutBreadcrumb.tsx` |
| [~] | SEO meta | title, description, canonical, OG image per page; Yoast's JSON-LD schema not ported yet |

The placeholder pages (services, industries, blog, privacy) still use the
first scaffold's Tailwind header/footer (`src/components/layout/`) until each
is ported the same way.

## Forms

From `inc/supabase-forms.php`. The ported markup keeps the CF7 forms;
`WpRuntime` posts them to `/api/leads` with their `_wpcf7` id, so Supabase
rows stay comparable. The theme's `pc-form-validation.js` still validates
first and its success modal still opens on `wpcf7mailsent`.

| Form | `formId` | Fields | Table |
|---|---|---|---|
| Contact Form H_1 (service pages, popup) | `8` | name, email, message | `form_submissions` |
| Contact Form H_5 (newer service pages) | `4603` | name, email, budget, company, message | `form_submissions` |
| Book Strategy Call | `4005` | name, email, phone, message | `form_submissions` |
| Newsletter H_2 (home inline) | `324` | email | `newsletter_signups` |
| Newsletter H_4 (unplaced) | `328` | email | `newsletter_signups` |
| Contact page `[pc_contact_form]` (WPCode 1805) | `pc-contact` | name, email, message; phone, business optional | `form_submissions` |

Validation rules: `src/lib/forms/rules.ts` (from `inc/form-rules.php`).
`pc-website-url` is a honeypot: filled means a bot, and nothing is stored.

## Redirects

`next.config.ts` mirrors `inc/legacy-redirects.php`:
`ai-marketing-automation` → `ai-automation-systems`,
`social-media-advertising` → `social-media-marketing`,
`google-ads-ppc` → `pay-per-click`,
`marketing-strategy` → `digital-strategy-marketing` (all under `/services/`),
`/our-services/` → `/services/`, and `/contact-us/` → `/contact/`.

## Known gaps

- **Emails.** WordPress mailed the admin and the visitor after a contact-page
  submission (and CF7 mailed on its forms). `/api/leads` only stores the lead
  in Supabase; mail needs a provider (Resend, SES...) wired in.
- **Supabase keys.** Set `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` in
  `.env.local` / Vercel. Without them valid submissions answer 503.
- **GeoGrid widget.** WordPress loads `gg-widget.js` from
  reporting.productionconnectionsllc.com on every page; it injects a
  normalize + utility stylesheet that changes form-field line heights. That
  stylesheet is copied (`public/wp/inline/geogrid-widget.css`, via
  `scripts/wp-port/extract-geogrid-css.mjs`); the widget itself is not loaded.
- Pages that 404 on WordPress's own theme (two `cap-*.webp` images, some
  Font Awesome fallbacks) 404 here too; `scripts/wp-port/missing.json` lists them.
- Blog posts and any DB-only pages need an export from the WP database
  before they can be ported.
- `public/images/pillar/` is ~89 MB of JPGs, unoptimised; consider re-encoding.
- **Service pages' blog grid.** WordPress shows three random posts there on
  every request (`inc/blog-grid-order.php`, `orderby => rand`); the port shows
  the three from the snapshot. WordPress's own note accepts this: behind a page
  cache the order freezes the same way. That one section's height therefore
  differs by a line between requests on WordPress.
- **Services archive title.** WordPress's `<title>` for `/services/` is the
  theme demo's "Nimo Services Archive - Production Connections"; it is copied
  as-is. Change it in Yoast and re-capture, or override it in the route.
