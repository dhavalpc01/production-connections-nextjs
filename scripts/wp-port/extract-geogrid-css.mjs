/**
 * The GeoGrid reporting widget (gg-widget.js, loaded on every WordPress page)
 * injects its own stylesheet — normalize.css plus utility classes — as the
 * last element of <head>. That normalize pass changes form-field line
 * heights across the site, so the Next.js pages need the same stylesheet,
 * without the widget itself.
 *
 *   curl -s https://reporting.productionconnectionsllc.com/gg-widget.js > gg-widget.js
 *   node scripts/wp-port/extract-geogrid-css.mjs gg-widget.js
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const [widgetFile] = process.argv.slice(2);
const src = await readFile(widgetFile, "utf8");

const marker = "rn.textContent=`";
const start = src.indexOf(marker);
if (start < 0) throw new Error("stylesheet literal not found");
const bodyStart = start + marker.length;
const end = src.indexOf("`", bodyStart);
const raw = src.slice(bodyStart, end);
if (raw.includes("${")) throw new Error("stylesheet literal has interpolation; extract it by hand");

// Cook the template literal: \n is a newline, any other escaped character stands for itself.
const css = raw.replace(/\\(.)/g, (_, c) => (c === "n" ? "\n" : c));

const out = path.resolve(import.meta.dirname, "../../public/wp/inline/geogrid-widget.css");
await writeFile(
  out,
  "/* Injected into every WordPress page by the GeoGrid reporting widget (gg-widget.js),\n" +
    "   last in <head>. Kept so form fields and type match WordPress exactly. */\n" +
    css,
);
console.log(`wrote ${out} (${css.length} chars)`);
