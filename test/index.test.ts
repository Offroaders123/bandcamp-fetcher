import { HTMLElement } from "node-html-parser";
import { fetchHTML, getRootPath, parseHTML, releasePaths } from "../src/index.js";

const rootPath: string = getRootPath("rBnaodn");
const html: string = await fetchHTML(rootPath);
const root: HTMLElement = parseHTML(html);
const releases: string[] = releasePaths(root);
console.log(releases);
