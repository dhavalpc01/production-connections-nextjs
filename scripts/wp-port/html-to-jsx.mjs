/**
 * Convert part of a WordPress page snapshot into a React component, keeping
 * the original markup and class names so the WP stylesheets render it
 * exactly as WordPress did.
 *
 *   node scripts/wp-port/html-to-jsx.mjs <page> "<css selector>" <out.tsx> <ComponentName> [--split]
 *
 * --split writes one component per child element of the match into the
 * output's directory (<ComponentName>01.tsx ...) plus an index that renders
 * them in order, so each section can be edited on its own.
 *
 * Text and attribute values are emitted as JS string literals, so entities,
 * braces and whitespace survive exactly; whitespace runs collapse to one
 * space, as the browser would have rendered them.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parse, NodeType } from "node-html-parser";

const ORIGIN = process.env.WP_ORIGIN ?? "http://localhost:8090";
const [page, selector, outFile, componentName, ...flags] = process.argv.slice(2);
if (!page || !selector || !outFile || !componentName) {
  console.error('usage: html-to-jsx.mjs <page> "<selector>" <out.tsx> <ComponentName> [--split]');
  process.exit(1);
}
const split = flags.includes("--split");

const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
const DROP_TAGS = new Set(["script", "noscript", "style", "link", "meta"]);
const BOOLEAN = new Set([
  "allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "defer", "disabled",
  "formnovalidate", "hidden", "loop", "multiple", "muted", "novalidate", "open", "playsinline", "readonly",
  "required", "reversed", "selected",
]);
const RENAME = {
  class: "className", for: "htmlFor", tabindex: "tabIndex", readonly: "readOnly", maxlength: "maxLength",
  minlength: "minLength", autocomplete: "autoComplete", autofocus: "autoFocus", srcset: "srcSet",
  crossorigin: "crossOrigin", frameborder: "frameBorder", allowfullscreen: "allowFullScreen", colspan: "colSpan",
  rowspan: "rowSpan", enctype: "encType", novalidate: "noValidate", playsinline: "playsInline", autoplay: "autoPlay",
  referrerpolicy: "referrerPolicy", "accept-charset": "acceptCharset", "http-equiv": "httpEquiv", datetime: "dateTime",
  inputmode: "inputMode", formnovalidate: "formNoValidate", "xlink:href": "xlinkHref", "xml:space": "xmlSpace",
  "xmlns:xlink": "xmlnsXlink", viewbox: "viewBox", contenteditable: "contentEditable", spellcheck: "spellCheck",
  fetchpriority: "fetchPriority", allow: "allow", sizes: "sizes", charset: "charSet", cellpadding: "cellPadding",
  cellspacing: "cellSpacing", usemap: "useMap", hreflang: "hrefLang", itemscope: "itemScope", itemtype: "itemType",
  itemprop: "itemProp", itemid: "itemID", itemref: "itemRef",
};
// Attributes React types as numbers.
const NUMERIC = new Set(["tabIndex", "size", "maxLength", "minLength", "rows", "cols", "colSpan", "rowSpan", "span", "start"]);
// The HTML parser lowercases SVG names; React needs their real case.
const SVG_TAGS = Object.fromEntries(
  [
    "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting",
    "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR",
    "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight",
    "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "linearGradient", "radialGradient", "clipPath",
    "foreignObject", "textPath", "animateTransform", "animateMotion",
  ].map((name) => [name.toLowerCase(), name]),
);
const SVG_ATTRS = Object.fromEntries(
  [
    "tableValues", "stdDeviation", "gradientUnits", "gradientTransform", "preserveAspectRatio", "patternUnits",
    "patternTransform", "patternContentUnits", "filterUnits", "primitiveUnits", "baseFrequency", "numOctaves",
    "stitchTiles", "xChannelSelector", "yChannelSelector", "maskUnits", "maskContentUnits", "clipPathUnits",
    "startOffset", "textLength", "lengthAdjust", "markerWidth", "markerHeight", "markerUnits", "refX", "refY",
    "pathLength", "spreadMethod", "kernelMatrix", "surfaceScale", "specularExponent", "specularConstant",
    "diffuseConstant", "limitingConeAngle", "pointsAtX", "pointsAtY", "pointsAtZ", "edgeMode", "targetX",
    "targetY", "kernelUnitLength", "attributeName", "repeatCount", "keyTimes", "keySplines", "calcMode",
  ].map((name) => [name.toLowerCase(), name]),
);
// Dashed SVG/presentation attributes become camelCase; aria-* and data-* stay.
const camel = (name) => name.replace(/[-:]([a-z])/g, (_, c) => c.toUpperCase());

function rewriteUrl(value) {
  const escapedOrigin = ORIGIN.replaceAll("/", "\\/");
  return value
    .replaceAll(`${ORIGIN}/wp-content/`, "/wp/wp-content/")
    .replaceAll(`${ORIGIN}/wp-includes/`, "/wp/wp-includes/")
    .replaceAll(`${escapedOrigin}\\/wp-content\\/`, "\\/wp\\/wp-content\\/")
    .replaceAll(`${ORIGIN}/`, "/")
    .replaceAll(`${escapedOrigin}\\/`, "\\/")
    .replaceAll(ORIGIN, "");
}

function styleObject(css) {
  const entries = [];
  for (const decl of css.split(";")) {
    const i = decl.indexOf(":");
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    // React style objects cannot carry !important. An inline style already
    // outranks every stylesheet rule that is not itself !important.
    const value = rewriteUrl(decl.slice(i + 1).trim()).replace(/\s*!important$/i, "");
    if (!prop) continue;
    const key = prop.startsWith("--") ? prop : prop.toLowerCase().replace(/^-ms-/, "ms-").replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    entries.push(`${JSON.stringify(key)}: ${JSON.stringify(value)}`);
  }
  return `{{ ${entries.join(", ")} }}`;
}

function attrs(el) {
  const out = [];
  const tag = el.rawTagName.toLowerCase();
  for (const [rawName, rawValue] of Object.entries(el.attributes)) {
    const name = rawName.toLowerCase();
    if (name.startsWith("on")) continue; // inline handlers do not port
    const value = rewriteUrl(rawValue);
    if (name === "style") {
      out.push(`style=${styleObject(rawValue)}`);
      continue;
    }
    let jsxName =
      name.startsWith("data-") || name.startsWith("aria-")
        ? name
        : RENAME[name] ?? SVG_ATTRS[name] ?? (name.includes("-") || name.includes(":") ? camel(name) : name);
    if ((tag === "input" || tag === "textarea" || tag === "select") && name === "value") jsxName = "defaultValue";
    if (tag === "input" && name === "checked") jsxName = "defaultChecked";
    if (tag === "option" && name === "selected") continue; // handled on <select>
    if (BOOLEAN.has(name) || name === "itemscope") {
      out.push(jsxName === "defaultChecked" ? "defaultChecked" : jsxName);
      continue;
    }
    if (NUMERIC.has(jsxName) && /^-?\d+$/.test(value.trim())) {
      out.push(`${jsxName}={${Number(value)}}`);
      continue;
    }
    out.push(`${jsxName}={${JSON.stringify(value)}}`);
  }
  if (tag === "select") {
    const selected = el.querySelector("option[selected]");
    if (selected) out.push(`defaultValue={${JSON.stringify(selected.getAttribute("value") ?? selected.text)}}`);
  }
  if (tag === "textarea" && el.text.trim()) out.push(`defaultValue={${JSON.stringify(el.text)}}`);
  return out.length ? " " + out.join(" ") : "";
}

function render(node, indent, inPre = false) {
  const pad = "  ".repeat(indent);
  if (node.nodeType === NodeType.TEXT_NODE) {
    const text = inPre ? node.text : node.text.replace(/\s+/g, " ");
    if (!text) return "";
    return `${pad}{${JSON.stringify(text)}}\n`;
  }
  if (node.nodeType !== NodeType.ELEMENT_NODE) return "";
  const lower = node.rawTagName.toLowerCase();
  const tag = SVG_TAGS[lower] ?? lower;
  if (DROP_TAGS.has(tag)) return "";
  const open = `${pad}<${tag}${attrs(node)}`;
  if (VOID.has(tag)) return `${open} />\n`;
  if (tag === "textarea") return `${open} />\n`;
  const pre = inPre || tag === "pre";
  const children = node.childNodes.map((child) => render(child, indent + 1, pre)).join("");
  if (!children) return `${open} />\n`;
  return `${open}>\n${children}${pad}</${tag}>\n`;
}

function component(name, body, note) {
  return `// Generated by scripts/wp-port/html-to-jsx.mjs from the WordPress page "${page}"${note ? ` (${note})` : ""}.
// Markup and class names match WordPress so the WP stylesheets apply unchanged.

export function ${name}() {
  return (
    <>
${body}    </>
  );
}
`;
}

const html = await readFile(path.join(import.meta.dirname, "snapshots", `${page}.html`), "utf8");
const doc = parse(html, { comment: false, blockTextElements: { script: false, noscript: false, style: false, pre: true } });
const match = doc.querySelector(selector);
if (!match) {
  console.error(`No element matches ${selector} in ${page}`);
  process.exit(1);
}

await mkdir(path.dirname(outFile), { recursive: true });

if (!split) {
  await writeFile(outFile, component(componentName, render(match, 3), selector));
  console.log(`wrote ${outFile}`);
} else {
  // Keep the wrapper element, render each child as its own component.
  const kids = match.childNodes.filter((c) => c.nodeType === NodeType.ELEMENT_NODE && !DROP_TAGS.has(c.rawTagName.toLowerCase()));
  const dir = path.dirname(outFile);
  const names = [];
  for (const [i, kid] of kids.entries()) {
    const name = `${componentName}${String(i + 1).padStart(2, "0")}`;
    const heading = kid.querySelector("h1, h2")?.text.replace(/\s+/g, " ").trim().slice(0, 60);
    await writeFile(path.join(dir, `${name}.tsx`), component(name, render(kid, 3), heading ? `section: ${heading}` : `section ${i + 1}`));
    names.push(name);
  }
  const wrapperOpen = `<${match.rawTagName.toLowerCase()}${attrs(match)}>`;
  const index = `// Generated by scripts/wp-port/html-to-jsx.mjs from the WordPress page "${page}" (${selector}).
${names.map((n) => `import { ${n} } from "./${n}";`).join("\n")}

export function ${componentName}() {
  return (
    ${wrapperOpen}
${names.map((n) => `      <${n} />`).join("\n")}
    </${match.rawTagName.toLowerCase()}>
  );
}
`;
  await writeFile(outFile, index);
  console.log(`wrote ${outFile} + ${names.length} sections`);
}
