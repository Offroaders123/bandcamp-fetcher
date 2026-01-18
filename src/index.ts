const demo = await fetcher("rbnaodn");
console.log(demo);

export async function fetcher(artist: string): Promise<string> {
  const response: Response = await fetch(`https://${artist}.bandcamp.com/`);
  const html: string = await response.text();
  return html;
}
