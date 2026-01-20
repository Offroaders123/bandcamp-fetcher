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

export interface ClientItem {
  art_id: number;
  artist?: string;
  band_id: number;
  id: number;
  page_url: string;
  title: string;
  type: "track" | "album";
}

export function clientItems(root: HTMLElement): ClientItem[] {
  return JSON.parse(root
    .querySelector("#music-grid:not(.private)")!
    .attrs["data-client-items"]!) as ClientItem[];
}

export function releases(root: HTMLElement): string[] {
  return root
    .querySelectorAll("#music-grid:not(.private) .music-grid-item a")
    .map(gridItem => gridItem.attrs["href"]!);
}
