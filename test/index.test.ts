import { fetchReleases } from "../src/index.js";

const artist = "rBnaodn";
const releases = await fetchReleases(artist);

// for (const release of releases) {
console.log(JSON.stringify(releases, null, 2));
// }
