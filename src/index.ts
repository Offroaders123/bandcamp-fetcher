import { type HTMLElement, parse } from "node-html-parser";

function getRootPath(artist: string): string {
  return `https://${artist}.bandcamp.com`;
}

async function fetchHTML(path: string): Promise<string> {
  const response: Response = await fetch(path);
  return response.text();
}

function parseHTML(html: string): HTMLElement {
  return parse(html);
}

interface ClientItem {
  art_id: number;
  artist?: string;
  band_id: number;
  id: number;
  page_url: string;
  title: string;
  type: "track" | "album";
}

function clientItems(root: HTMLElement): ClientItem[] {
  return JSON.parse(root
    .querySelector("#music-grid:not(.private)")!
    .attrs["data-client-items"]!) as ClientItem[];
}

function gridItemPaths(root: HTMLElement): string[] {
  return root
    .querySelectorAll("#music-grid:not(.private) .music-grid-item a")
    .map(gridItem => gridItem.attrs["href"]!);
}

function releasePaths(root: HTMLElement): string[] {
  const items: ClientItem[] = clientItems(root);
  const gridPaths: string[] = gridItemPaths(root);
  return [...gridPaths, ...items.map(item => item.page_url)];
}

function fetchReleaseHTML(rootPath: string, releasePath: string): Promise<string> {
  const path: string = rootPath + releasePath;
  return fetchHTML(path);
}

export interface Release { }

export async function fetchReleases(artist: string): Promise<Release[]> {
  const rootPath: string = getRootPath(artist);
  const root: HTMLElement = parseHTML(await fetchHTML(rootPath));
  const releases: string[] = releasePaths(root);
  const releaseHTMLs: HTMLElement[] = await Promise.all(
    releases.map(async releasePath =>
      parseHTML(await fetchReleaseHTML(rootPath, releasePath))
    )
  );
  return releaseHTMLs;
}
