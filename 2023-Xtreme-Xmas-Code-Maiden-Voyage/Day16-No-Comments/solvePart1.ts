import getNumberOfEnergizedTiles from "./getNumberOfEnergizedTiles.ts";
import { parseInput } from "./parseInput.ts";
import processBeam from "./processBeam.ts";
import { Grid } from "./types.ts";

export default (async function (): Promise<number> {
  const contraption: Grid = await parseInput();

  processBeam(contraption, { x: 0, y: 0 }, "East");

  const totalNumberOfEnergizedTiles = getNumberOfEnergizedTiles(
    contraption,
    { x: 0, y: 0 },
    "East",
  );

  console.log(`Part 1: ${totalNumberOfEnergizedTiles} tiles are energized.`);

  return totalNumberOfEnergizedTiles;
})();
