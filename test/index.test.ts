import { HTMLElement } from "node-html-parser";
import { getRootPath, parseHTML, releases } from "../src/index.js";

/**
 * This is used as a demo instead of `fetcher()`.
 */
async function fetchHTMLTest(_path: string): Promise<string> {
  const { readFile } = await import("node:fs/promises");
  const html: string = await readFile("./test/fixtures/index.html", "utf-8");
  return html;
}

const rootPath: string = getRootPath("rBnaodn");
const html: string = await fetchHTMLTest(rootPath);
const root: HTMLElement = parseHTML(html);
const releasePaths: string[] = releases(root);
console.log(releasePaths);
