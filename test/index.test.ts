import { fetchReleases, type Release } from "../src/index.js";

const artist = "rBnaodn";
const releases: Release[] = await fetchReleases(artist);

for (const release of releases) {
  console.log(release);
}
