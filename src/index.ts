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

function getClientItems(root: HTMLElement): ClientItem[] {
  return JSON.parse(root
    .querySelector("#music-grid:not(.private)")!
    .attrs["data-client-items"]!) as ClientItem[];
}

function getGridItemPaths(root: HTMLElement): string[] {
  return root
    .querySelectorAll("#music-grid:not(.private) .music-grid-item a")
    .map(gridItem => gridItem.attrs["href"]!);
}

function getReleasePaths(root: HTMLElement): string[] {
  const items: ClientItem[] = getClientItems(root);
  const gridPaths: string[] = getGridItemPaths(root);
  return [...gridPaths, ...items.map(item => item.page_url)];
}

function fetchReleaseHTML(rootPath: string, releasePath: string): Promise<string> {
  const path: string = rootPath + releasePath;
  return fetchHTML(path);
}

export interface Release { }

function getRelease(releaseRoot: HTMLElement): Release {
  return JSON.parse(releaseRoot.querySelector("script[type='application/ld+json']")!.innerHTML) as Release;
}

export async function fetchReleases(artist: string): Promise<Release[]> {
  const rootPath: string = getRootPath(artist);
  const root: HTMLElement = parseHTML(await fetchHTML(rootPath));
  const releasePaths: string[] = getReleasePaths(root);
  const releaseRoots: HTMLElement[] = await Promise.all(
    releasePaths.map(async releasePath =>
      parseHTML(await fetchReleaseHTML(rootPath, releasePath))
    )
  );
  return releaseRoots.map(releaseRoot => getRelease(releaseRoot));
}
