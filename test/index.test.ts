import type { Release } from "../src/bandcamp.js";
import { closeCookieBanner, getInitialValues, launchBrowser } from "../src/index.js";

const browser = await launchBrowser();
const page = await browser.newPage();
await page.goto("https://rbnaodn.bandcamp.com", { waitUntil: "networkidle0" });

await closeCookieBanner(page);
const initialValues: Release[] = await getInitialValues(page);
console.log(initialValues);
