import { XYCoordinates } from "../../tools/commonTypes";

interface Tile {
  coordinates: XYCoordinates;
  value: "#" | "." | "<" | ">" | "^" | "v";
  reachableTiles: XYCoordinates[];
}

interface TrailMap {
  tiles: Tile[];
}


const inputFile = "./challengeInput.dat"

const inputLines = await Deno.readTextFile(inputFile).then((text: string) => text.trim().split("\n"));

export default (async function(): Promise<number> {

  const longestHikeSteps = 0

  console.log(inputLines);

  console.log(`Part 1: The longest hike is ${longestHikeSteps} steps long`);

  return longestHikeSteps;
})();
