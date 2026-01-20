import { getChromePath } from "chrome-launcher";
import { type Browser, launch, type Page } from "puppeteer-core";
import type { Release } from "./bandcamp.js";

const CHROME_PATH: string = getChromePath();

export async function launchBrowser(): Promise<Browser> {
  return launch({
    // headless: true,
    headless: false,
    executablePath: CHROME_PATH
  });
}

export async function closeCookieBanner(page: Page): Promise<void> {
  await page.evaluate(() => {
    // Accept necessary cookies
    document.querySelector("page-footer")?.shadowRoot?.querySelector<HTMLButtonElement>(".cookie-control .g-button.outline")?.click();
  });
}

export async function getInitialValues(page: Page): Promise<Release[]> {
  const initialValuesString: string = await page.evaluate(() => {
    return document.querySelector<HTMLOListElement>("#music-grid")!.dataset["initialValues"]!;
  });
  const initialValues = JSON.parse(initialValuesString);
  return initialValues;
}
