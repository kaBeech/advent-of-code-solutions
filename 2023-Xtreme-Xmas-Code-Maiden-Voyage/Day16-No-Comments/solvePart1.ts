import { parseInput } from "./parseInput.ts";
import processBeam from "./processBeam.ts";
import { Grid } from "./types.ts";

export default (async function (): Promise<number> {
  const contraption: Grid = await parseInput();

  processBeam(contraption, { x: 0, y: 0 }, "East");

  const totalEnergizedTiles =
    contraption.flat().filter((tile) => tile.energized).length;

  console.log(`Part 1: ${totalEnergizedTiles} tiles are energized.`);

  return totalEnergizedTiles;
})();
