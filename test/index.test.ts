import { HTMLElement } from "node-html-parser";
import { fetchHTML, getRootPath, parseHTML, releases } from "../src/index.js";

const rootPath: string = getRootPath("rBnaodn");
const html: string = await fetchHTML(rootPath);
const root: HTMLElement = parseHTML(html);
const releasePaths: string[] = releases(root);
console.log(releasePaths);
