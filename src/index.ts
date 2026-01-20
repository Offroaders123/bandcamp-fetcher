import { type HTMLElement, parse } from "node-html-parser";

export function getRootPath(artist: string): string {
  return `https://${artist}.bandcamp.com/`;
}

export async function fetchHTML(path: string): Promise<string> {
  const response: Response = await fetch(path);
  return response.text();
}

export function parseHTML(html: string): HTMLElement {
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

export function releasePaths(root: HTMLElement): string[] {
  const items: ClientItem[] = clientItems(root);
  const gridPaths: string[] = gridItemPaths(root);
  return [...gridPaths, ...items.map(item => item.page_url)];
}
