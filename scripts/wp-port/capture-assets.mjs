/**
 * Pull the stylesheets, fonts and images a WordPress page uses into
 * public/wp/, preserving their wp-content paths, and write the ordered
 * stylesheet list for each page to src/wp/styles.json.
 *
 *   node scripts/wp-port/capture-assets.mjs http://localhost:8090 home about contact
 *
 * Reads scripts/wp-port/snapshots/<page>.html (saved with curl from the WP
 * mirror). Re-running is safe: files already on disk are skipped.
 */

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { parse } from "node-html-parser";

const [origin, ...pages] = process.argv.slice(2);
if (!origin || pages.length === 0) {
  console.error("usage: capture-assets.mjs <wp-origin> <page> [page...]");
  process.exit(1);
}

const root = path.resolve(import.meta.dirname, "../..");
const publicWp = path.join(root, "public", "wp");

// Stylesheets the converted pages do not need: block editor, shop, emoji.
// Popup Maker's CSS stays: it is what keeps the contact popup hidden.
const SKIP_CSS = [/\/wp-includes\/css\/dist\//, /\/plugins\/woocommerce\//, /\/themes\/nimo\/woocommerce\//];
const SKIP_INLINE_IDS = ["wp-emoji-styles-inline-css", "woocommerce-inline-inline-css", "wp-img-auto-sizes-contain-inline-css", "classic-theme-styles-inline-css"];

// Scripts that drive the theme's behaviour. Everything else (WooCommerce, CF7's
// own submit, Elementor's frontend, emoji, popup-maker, the GeoGrid widget) is
// either unused or replaced by the Next.js runtime in src/wp/WpRuntime.tsx.
const KEEP_SCRIPT = [
  /^\/wp-includes\/js\/jquery\/jquery(-migrate)?\.min\.js$/,
  /^\/wp-content\/themes\/nimo\/assets\/js\//,
  /^\/wp-content\/uploads\/nimo-child-patched\//,
  /^\/wp-content\/themes\/nimo-child\/assets\/js\//,
  /^\/wp-content\/plugins\/nimo-core\/assets\/js\/elh-element\.js$/,
];
const KEEP_INLINE_SCRIPT = [
  { id: "nimo-child-form-validation-js-before", name: "pc-form-rules" },
  { match: /lazyloadRunObserver/, name: "elementor-lazyload" },
  { match: /data-pc-brand-spin/, name: "pc-brand-spin" },
  { match: /pc-network-track/, name: "pc-network-track" },
];

// The theme waits for DOMContentLoaded/load, which have long fired by the time
// the runtime loads scripts after hydration. Run those blocks straight away.
const READY = "(function (fn) { setTimeout(fn, 0); })";
const SCRIPT_PATCHES = [
  {
    test: /\/nimo-child-patched\/nimo-core\./,
    apply: (src) =>
      src
        .replace('document.addEventListener("DOMContentLoaded", function () {', `${READY}(function () {`)
        .replaceAll('window.addEventListener("load", function () {', `${READY}(function () {`),
  },
  {
    // Elementor's frontend fires these per widget; call them directly instead.
    test: /\/themes\/nimo\/assets\/js\/nimo-custom\.js$/,
    apply: (src) =>
      src.replace(
        /\}\)\(jQuery\);\s*$/,
        `\tvar has = function (w) { return !!document.querySelector(".elementor-widget-" + w); };
\tbgImageActive(null, $);
\tif (has("tx_testimonial")) tx_testimonial(null, $);
\tif (has("tx_team_lists")) tx_team_lists(null, $);
\tif (has("tx_hero_section")) tx_hero_section(null, $);
\tif (has("tx_hero_slider")) tx_hero_slider(null, $);
})(jQuery);
`,
      ),
  },
];

const exists = (file) => access(file).then(() => true, () => false);

/** Local path under public/wp/ for a same-origin URL. */
function localPath(url) {
  const { pathname } = new URL(url);
  return path.join(publicWp, decodeURIComponent(pathname));
}

const downloaded = new Map();

// URLs that 404 on WordPress too (dead theme references). WordPress renders a
// full page for every 404, which is slow, so they are remembered between runs.
const missingFile = path.join(import.meta.dirname, "missing.json");
const missing = new Set(await readFile(missingFile, "utf8").then(JSON.parse, () => []));

async function download(url) {
  if (downloaded.has(url)) return downloaded.get(url);
  const target = localPath(url);
  const job = (async () => {
    if (await exists(target)) return target;
    if (missing.has(url)) return null;
    let response;
    try {
      response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
    } catch (error) {
      console.warn(`  ! ${error.name} ${url}`);
      return null;
    }
    if (!response.ok) {
      console.warn(`  ! ${response.status} ${url}`);
      if (response.status === 404) {
        missing.add(url);
        await writeFile(missingFile, JSON.stringify([...missing].sort(), null, 2) + "\n");
      }
      return null;
    }
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, Buffer.from(await response.arrayBuffer()));
    return target;
  })();
  downloaded.set(url, job);
  return job;
}

/** Download every same-origin url(...) a stylesheet references. */
async function fetchCssAssets(css, baseUrl) {
  const refs = [...css.matchAll(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g)].map((m) => m[2]);
  for (const ref of refs) {
    if (ref.startsWith("data:") || ref.startsWith("#")) continue;
    let absolute;
    try {
      absolute = new URL(ref, baseUrl);
    } catch {
      continue;
    }
    if (absolute.origin !== origin) continue;
    absolute.search = "";
    absolute.hash = "";
    await download(absolute.toString());
  }
}

/** Point absolute same-origin URLs inside CSS at /wp/. */
function rewriteCss(css) {
  return css.replaceAll(`${origin}/wp-content/`, "/wp/wp-content/").replaceAll(`${origin}/wp-includes/`, "/wp/wp-includes/");
}

const manifest = {};

for (const page of pages) {
  console.log(`# ${page}`);
  const html = await readFile(path.join(import.meta.dirname, "snapshots", `${page}.html`), "utf8");
  const doc = parse(html, { comment: false });
  const styles = [];

  for (const node of doc.querySelectorAll('link[rel="stylesheet"], style')) {
    if (node.tagName === "LINK") {
      const href = node.getAttribute("href");
      if (!href) continue;
      const url = new URL(href, origin);
      if (url.origin !== origin) {
        styles.push(url.toString()); // Google Fonts: linked as-is.
        continue;
      }
      if (SKIP_CSS.some((re) => re.test(url.pathname))) continue;
      url.search = "";
      const file = await download(url.toString());
      if (!file) continue;
      const css = await readFile(file, "utf8");
      await fetchCssAssets(css, url.toString());
      const rewritten = rewriteCss(css);
      if (rewritten !== css) await writeFile(file, rewritten);
      const local = `/wp${url.pathname}`;
      if (!styles.includes(local)) styles.push(local);
    } else {
      const id = node.getAttribute("id") ?? "";
      if (SKIP_INLINE_IDS.includes(id)) continue;
      const css = node.textContent.trim();
      if (!css) continue;
      await fetchCssAssets(css, origin + "/");
      const hash = createHash("sha1").update(css).digest("hex").slice(0, 12);
      const name = `${id ? id.replace(/[^a-z0-9-]/gi, "") + "-" : ""}${hash}.css`;
      const file = path.join(publicWp, "inline", name);
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, rewriteCss(css));
      styles.push(`/wp/inline/${name}`);
    }
  }

  // Images, videos and backgrounds referenced from the markup.
  const assetRefs = new Set();
  for (const m of html.matchAll(/(?:src|data-src|data-background|data-bg|poster|href)=["']([^"']+)["']/g)) assetRefs.add(m[1]);
  for (const m of html.matchAll(/srcset=["']([^"']+)["']/g)) {
    for (const part of m[1].split(",")) assetRefs.add(part.trim().split(/\s+/)[0]);
  }
  for (const m of html.matchAll(/url\(\s*(?:&quot;|['"])?([^'")&]+)/g)) assetRefs.add(m[1]);

  for (const ref of assetRefs) {
    let url;
    try {
      url = new URL(ref.replaceAll("\\/", "/"), origin);
    } catch {
      continue;
    }
    if (url.origin !== origin) continue;
    if (!/^\/wp-content\/(uploads|themes|plugins)\//.test(url.pathname)) continue;
    if (!/\.(png|jpe?g|webp|gif|svg|avif|mp4|webm|woff2?|ttf|ico)$/i.test(url.pathname)) continue;
    url.search = "";
    await download(url.toString());
  }

  // Scripts, in document order. Inline ones are kept only when listed, as files.
  const scripts = [];
  const scriptDoc = parse(html, { blockTextElements: { script: true } });
  for (const node of scriptDoc.querySelectorAll("script")) {
    const src = node.getAttribute("src");
    const id = node.getAttribute("id") ?? "";
    if (src) {
      const url = new URL(src, origin);
      if (url.origin !== origin || !KEEP_SCRIPT.some((re) => re.test(url.pathname))) continue;
      url.search = "";
      const file = await download(url.toString());
      if (!file) continue;
      const patch = SCRIPT_PATCHES.find((p) => p.test.test(url.pathname));
      if (patch) {
        const source = await readFile(file, "utf8");
        if (!source.includes("/* wp-port patched */")) await writeFile(file, "/* wp-port patched */\n" + patch.apply(source));
      }
      const local = `/wp${url.pathname}`;
      if (!scripts.includes(local)) scripts.push(local);
      continue;
    }
    const keep = KEEP_INLINE_SCRIPT.find((k) => (k.id ? k.id === id : k.match.test(node.rawText)));
    if (!keep) continue;
    const source = rewriteCss(node.rawText.trim());
    const hash = createHash("sha1").update(source).digest("hex").slice(0, 12);
    const file = path.join(publicWp, "inline", `${keep.name}-${hash}.js`);
    await writeFile(file, source + "\n");
    scripts.push(`/wp/inline/${keep.name}-${hash}.js`);
  }

  // What the page's root layout and metadata need, as WordPress rendered them.
  // The body class is taken after the WooCommerce script has run (no-js -> js).
  const meta = (selector, attr) => doc.querySelector(selector)?.getAttribute(attr) ?? null;
  const ogImage = meta('meta[property="og:image"]', "content");
  // Yoast's schema graph, pointed at the production domain instead of the mirror.
  const jsonLd = scriptDoc.querySelector('script[type="application/ld+json"]')?.rawText.trim() ?? null;
  manifest[page] = {
    jsonLd: jsonLd ? jsonLd.replaceAll(origin.replaceAll("/", "\\/"), "https:\\/\\/productionconnections.com").replaceAll(origin, "https://productionconnections.com") : null,
    bodyClass: (doc.querySelector("body")?.getAttribute("class") ?? "").replace("woocommerce-no-js", "woocommerce-js").trim(),
    title: doc.querySelector("title")?.text.trim() ?? "",
    description: meta('meta[name="description"]', "content"),
    ogImage: ogImage ? rewriteCss(ogImage).replace(origin, "") : null,
    styles,
    scripts,
  };
  console.log(`  ${styles.length} stylesheets, ${scripts.length} scripts, ${assetRefs.size} asset refs`);
}

const manifestFile = path.join(root, "src", "wp", "assets.json");
await mkdir(path.dirname(manifestFile), { recursive: true });
let existing = {};
try {
  existing = JSON.parse(await readFile(manifestFile, "utf8"));
} catch {}
await writeFile(manifestFile, JSON.stringify({ ...existing, ...manifest }, null, 2) + "\n");
console.log(`wrote ${path.relative(root, manifestFile)}`);
