@AGENTS.md

# production-connections-nextjs

Next.js rebuild of the Production Connections WordPress site, converted page
by page. The WordPress source is the `latestAllPagesAt-21-10` branch of
Dev-Suthar/production-connections; its PHP build scripts hold the page copy.

- Start with `MIGRATION.md`: route map, the WP source file of every page, and
  the per-page checklist. Tick pages off there as they are converted.
- Page data goes in `src/content/`, types in `src/types/content.ts`, page
  sections in `src/components/<page-type>/`.
- Use the design tokens and glass utilities in `src/app/globals.css`
  (`glass-dark`, `glass-white`, `glass-amber`, `glass-edge`, `fade-line`).
  Glass is for surfaces only — never behind copy.
- URLs must match WordPress exactly, trailing slash included.
- Brand voice for any copy lives in the `production-connections-voice` skill.
- Run `npm run lint` and `npm run build` before committing.
