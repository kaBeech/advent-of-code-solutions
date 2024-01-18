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

  for (let i = 0; i < contraption[0].length; i += 1) {
    const numberOfNorthgoingEnergizedTiles = getNumberOfEnergizedTiles(
      contraption,
      { x: i, y: 0 },
      "North",
    );
    if (numberOfNorthgoingEnergizedTiles > maximumNumberOfEnergizedTiles) {
      maximumNumberOfEnergizedTiles = numberOfNorthgoingEnergizedTiles;
    }
    const numberOfSouthgoingEnergizedTiles = getNumberOfEnergizedTiles(
      contraption,
      { x: i, y: contraption[0].length - 1 },
      "South",
    );
    if (numberOfSouthgoingEnergizedTiles > maximumNumberOfEnergizedTiles) {
      maximumNumberOfEnergizedTiles = numberOfSouthgoingEnergizedTiles;
    }
  }

  console.log(
    `Part 2: The maximum total number of energized tiles is ${maximumNumberOfEnergizedTiles}.`,
  );

  return maximumNumberOfEnergizedTiles;
})();
