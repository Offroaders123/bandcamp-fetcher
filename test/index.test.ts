import { HTMLElement } from "node-html-parser";
import { type ClientItem, clientItems, fetchHTML, getRootPath, parseHTML, releases } from "../src/index.js";

const rootPath: string = getRootPath("rBnaodn");
const html: string = await fetchHTML(rootPath);
const root: HTMLElement = parseHTML(html);
const clientItemss: ClientItem[] = clientItems(root);
const releasePaths: string[] = releases(root);
console.log(clientItemss);
console.log(releasePaths);
