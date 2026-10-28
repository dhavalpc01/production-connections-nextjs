import { readFile } from "node:fs/promises";
import path from "node:path";
import { parse, serialize } from "parse5";

/**
 * A snapshot's HTML, re-serialised by parse5 so it is tree-shaped the way a
 * browser would build it. WordPress output is not always well-formed (the
 * industry pages close one div too many), and node-html-parser, which the
 * port scripts walk, does not apply the HTML spec's error recovery: it would
 * otherwise hoist half a page out of <body>.
 */
export async function readSnapshot(page) {
  const html = await readFile(path.join(import.meta.dirname, "snapshots", `${page}.html`), "utf8");
  return serialize(parse(html));
}
