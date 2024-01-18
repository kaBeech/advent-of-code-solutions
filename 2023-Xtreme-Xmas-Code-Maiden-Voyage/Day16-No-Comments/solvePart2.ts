import getNumberOfEnergizedTiles from "./getNumberOfEnergizedTiles.ts";
import { parseInput } from "./parseInput.ts";
import { Grid } from "./types.ts";

export default (async function (): Promise<number> {
  const contraption: Grid = await parseInput();

  let maximumNumberOfEnergizedTiles = 0;

  for (let i = 0; i < contraption.length; i += 1) {
    const numberOfEastgoingEnergizedTiles = getNumberOfEnergizedTiles(
      contraption,
      { x: 0, y: i },
      "East",
    );
    if (numberOfEastgoingEnergizedTiles > maximumNumberOfEnergizedTiles) {
      maximumNumberOfEnergizedTiles = numberOfEastgoingEnergizedTiles;
    }
    const numberOfWestgoingEnergizedTiles = getNumberOfEnergizedTiles(
      contraption,
      { x: contraption.length - 1, y: i },
      "West",
    );
    if (numberOfWestgoingEnergizedTiles > maximumNumberOfEnergizedTiles) {
      maximumNumberOfEnergizedTiles = numberOfWestgoingEnergizedTiles;
    }
  }

  const totalNumberOfEnergizedTiles = getNumberOfEnergizedTiles(
    contraption,
    { x: 0, y: 0 },
    "East",
  );

  console.log(
    `Part 2: The maximum total number of energized tiles is ${totalNumberOfEnergizedTiles}.`,
  );

  return totalNumberOfEnergizedTiles;
})();
