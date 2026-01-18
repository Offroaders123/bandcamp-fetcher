import { type HTMLElement, parse } from "node-html-parser";

export async function fetcher(artist: string): Promise<string> {
  const response: Response = await fetch(`https://${artist}.bandcamp.com/`);
  const html: string = await response.text();
  return html;
}

export async function parser(html: string): Promise<HTMLElement> {
  const root: HTMLElement = parse(html);
  return root;
}

export function clientItems(root: HTMLElement): string {
  const musicGrid: HTMLElement | null = root.querySelector("#music-grid");
  if (!musicGrid) throw new Error("Could not find music grid!");
  const clientItems: string | undefined = musicGrid.getAttribute("data-client-items");
  if (!clientItems) throw new Error("Could not find client items attribute!");
  // console.warn("MANDATORY: Listen to more Mike Keneally.");
  return clientItems;
}

export function artistData(clientItems: string): ArtistData {
  const artistData: ArtistData = JSON.parse(clientItems) as ArtistData;
  return artistData;
}

export type ArtistData = ArtistDataEntry[];

export interface ArtistDataEntry {
  artist?: string;
  art_id: number;
  band_id: number;
  id: number;
  page_url: string;
  title: string;
  type: "track" | "album";
}
