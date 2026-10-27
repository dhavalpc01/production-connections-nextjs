@AGENTS.md

# production-connections-nextjs

Next.js rebuild of the Production Connections WordPress site, converted page
by page. The WordPress source is the `latestAllPagesAt-21-10` branch of
Dev-Suthar/production-connections; its PHP build scripts hold the page copy.

- Start with `MIGRATION.md`: route map, the WP source file of every page, the
  per-page checklist, and how pages are ported. Tick pages off as they land.
- Pages must match WordPress same-to-same. They are ported from the local
  WordPress mirror (`http://localhost:8090`, `D:\Project\Wordpress\production-connections`
  on `latestAllPagesAt-21-10`) with the scripts in `scripts/wp-port/`. Files in
  `src/wp/` (except `WpDocument.tsx`, `WpRuntime.tsx`) and `public/wp/` are
  generated: change the converter or capture script and regenerate rather than
  hand-editing them.
- Page data goes in `src/content/`, types in `src/types/content.ts`, page
  sections in `src/components/<page-type>/`.
- Use the design tokens and glass utilities in `src/app/globals.css`
  (`glass-dark`, `glass-white`, `glass-amber`, `glass-edge`, `fade-line`).
  Glass is for surfaces only — never behind copy.
- URLs must match WordPress exactly, trailing slash included.
- Brand voice for any copy lives in the `production-connections-voice` skill.
- Run `npm run lint` and `npm run build` before committing.
