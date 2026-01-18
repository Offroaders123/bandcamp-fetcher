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
