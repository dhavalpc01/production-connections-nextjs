# WordPress → Next.js migration

Source: `Dev-Suthar/production-connections`, branch `latestAllPagesAt-21-10`.
In that repo, page copy lives in the PHP build scripts (not in wp-admin), so
those scripts are the source of truth for every page below. Paths in the
"WP source" column are relative to that repo; theme files are under
`public/wp-content/themes/nimo-child/`.

## How to convert one page

1. Read the WP content file and its builder (table below).
2. Add the page's section types to `src/types/content.ts` (first page of a
   type only) and its copy to `src/content/<type>/<slug>.ts`.
3. Build the sections as components in `src/components/<type>/`, reusing
   the glass utilities in `globals.css`. Port only the CSS the page needs
   from the theme's `assets/css/<file>.css` into Tailwind classes.
4. Swap `PagePlaceholder` in the route for the real sections. Set
   `seoDescription` so the page gets its meta description.
5. `npm run build`, then compare against the WP page at desktop and phone
   widths (the WP home hero is checked at 1366×657).
6. Tick the box below.

Once a page TYPE is done (e.g. Service Detail), every other page of that type
should be a data-only port.

## Route map

### Core pages

| Done | URL | WP source | Styles / scripts |
|---|---|---|---|
| [ ] | `/` | `scripts/apply-home-copy.php`, `inc/home-copy-render.php`, `inc/home-network.php` | `home-viewport.css`, `glass.css` |
| [ ] | `/about-us/` | `scripts/apply-about-copy.php` | `about.css`, `about-cards-reveal.js` |
| [ ] | `/contact-us/` | contact page + Contact Form (see Forms) | `contact.css` |
| [ ] | `/services/` | `services` archive, `inc/service-page.php` | `services-stack.css`, `pc-service-index.js` |
| [ ] | `/industries/` | `build-industries-page.php` (repo root) | `industries.css`, `industry-card-reveal.js` |
| [ ] | `/blog/` | DB only (posts are not in scripts) — export first | `inc/blog-grid-order.php` |
| [ ] | `/privacy-policy/` | `scripts/lib/pc-legal-builder.php` | `legal.css` |

### Service Detail — `/services/<slug>/`

Builder: `scripts/lib/pc-service-builder.php`, shape in `scripts/content/_master.php`,
template `single-services.php`. Styles: `service-detail.css`, `service-glass.css`;
script: `service-detail.js`.

| Done | Slug | Category | WP content file |
|---|---|---|---|
| [ ] | `website-design` | Design & Development | `scripts/content/website-design.php` |
| [ ] | `website-development` | Design & Development | `scripts/content/website-development.php` |
| [ ] | `logo-design` | Design & Development | `scripts/content/logo-design.php` |
| [ ] | `brand-identity` | Design & Development | `scripts/content/brand-identity.php` |
| [ ] | `search-engine-optimization` | Marketing & Advertising | `scripts/content/search-engine-optimization.php` |
| [ ] | `ai-search-optimization` | Marketing & Advertising | `scripts/content/ai-search-optimization.php` |
| [ ] | `pay-per-click` | Marketing & Advertising | `scripts/apply-ppc-copy.php`, `scripts/build-ppc-templates.php` |
| [ ] | `social-media-marketing` | Marketing & Advertising | `scripts/content/social-media-advertising.php` |
| [ ] | `email-marketing` | Marketing & Advertising | `scripts/content/email-marketing.php` |
| [ ] | `ai-automation-systems` | Marketing & Advertising | `scripts/content/ai-marketing-automation.php` |
| [ ] | `digital-strategy-marketing` | Marketing & Advertising | `scripts/apply-strategy-copy.php`, `scripts/build-strategy-templates.php` |
| [ ] | `media-production` | Marketing & Advertising | `scripts/content/media-production.php` |
| [ ] | `targeted-tv-advertising` | Marketing & Advertising | `scripts/content/targeted-tv-advertising.php` |
| [ ] | `billboard-advertising` | Marketing & Advertising | `scripts/content/billboard-advertising.php` |

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

| Done | Piece | WP source |
|---|---|---|
| [~] | Header + menus | `inc/header-footer.php`, `inc/service-menu.php`, `inc/industry-menu.php`, `nav.css` — structure done, visual pass pending |
| [~] | Footer | `footer-4.css`, tf-footer post (DB) — placeholder; social links still to fill |
| [ ] | Off-canvas panel | `inc/offcanvas-panel.php` |
| [ ] | Breadcrumbs | `inc/breadcrumb.php` |
| [ ] | SEO meta + schema | `inc/seo-meta.php` |

## Forms

From `inc/supabase-forms.php`. The Next.js forms post JSON to `/api/leads`
with the old CF7 id as `formId`, so Supabase rows stay comparable.

| Form | `formId` | Fields | Table |
|---|---|---|---|
| Contact Form H_1 (service pages, popup) | `8` | name, email, message | `form_submissions` |
| Contact Form H_5 (newer service pages) | `4603` | name, email, budget, company, message | `form_submissions` |
| Book Strategy Call | `4005` | name, email, phone, message | `form_submissions` |
| Newsletter H_2 (home inline) | `324` | email | `newsletter_signups` |
| Newsletter H_4 (unplaced) | `328` | email | `newsletter_signups` |

Validation rules: `src/lib/forms/rules.ts` (from `inc/form-rules.php`).
Still to build: the form UI components, the success modal
(`pc-form-success-modal.css/js`), and an end-to-end test like the WP repo's
`scripts/test-forms.py`.

## Redirects

`next.config.ts` mirrors `inc/legacy-redirects.php`:
`ai-marketing-automation` → `ai-automation-systems`,
`social-media-advertising` → `social-media-marketing`,
`google-ads-ppc` → `pay-per-click`,
`marketing-strategy` → `digital-strategy-marketing` (all under `/services/`),
and `/our-services/` → `/services/`.

## Known gaps

- Unknown slugs render the 404 page with `noindex`, but the HTTP status is
  200 because Cache Components stream the response.
- Blog posts and any DB-only pages need an export from the WP database
  (`make wp CMD="post list ..."` in the WP repo) before they can be ported.
- `public/images/pillar/` is ~89 MB of JPGs, unoptimised; serve through
  `next/image` and consider re-encoding.
