import { HTMLElement } from "node-html-parser";
import { artistData, type ArtistData, clientItems, parser } from "../src/index.js";

/**
 * This is used as a demo instead of `fetcher()`.
 */
async function fetcherTest(_artist: string): Promise<string> {
  const { readFile } = await import("node:fs/promises");
  const html: string = await readFile("./test/fixtures/index.html", "utf-8");
  return html;
}

const html: string = await fetcherTest("rbnaodn");
const root: HTMLElement = await parser(html);
const items: string = clientItems(root);
const data: ArtistData = artistData(items);
console.log(data);
