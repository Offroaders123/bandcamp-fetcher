import { writeFile } from "node:fs/promises";
import { fetchReleases, type Release } from "../src/index.js";

const artist = "rBnaodn";
const releases: Release[] = await fetchReleases(artist);

// for (const release of releases) {
//   console.log(release);
// }

await writeFile("./release-data.json", JSON.stringify(releases, null, 2), "utf-8");
