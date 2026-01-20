import { type HTMLElement } from "node-html-parser";
import { fetchHTML, fetchReleaseHTML, getRootPath, parseHTML, releasePaths } from "../src/index.js";

const rootPath: string = getRootPath("rBnaodn");
const html: string = await fetchHTML(rootPath);
const root: HTMLElement = parseHTML(html);
const releases: string[] = releasePaths(root);
console.log(releases);

const releaseHTMLs: string[] = await Promise.all(
  releases.map(async releasePath =>
    await fetchReleaseHTML(rootPath, releasePath)
  )
);

for (const releaseHTML of releaseHTMLs) {
  console.log(releaseHTML);
}
