import getMaximumNumberOfEnergizedTiles from "./getMaximumNumberOfEnergizedTiles.ts";
import { parseInput } from "./parseInput.ts";
import { Grid } from "./types.ts";

export default (async function (): Promise<number> {
  const contraption: Grid = await parseInput();

  const maximumNumberOfEnergizedTiles = getMaximumNumberOfEnergizedTiles(
    contraption,
  );

  console.log(
    `Part 2: The maximum total number of energized tiles is ${maximumNumberOfEnergizedTiles}.`,
  );

  return maximumNumberOfEnergizedTiles;
})();
