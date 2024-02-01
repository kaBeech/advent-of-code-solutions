import getNumberOfEnergizedTiles from "./getNumberOfEnergizedTiles.ts";
import { Grid } from "./types.ts";

export default (
  contraption: Grid,
): number => {
  let maximumNumberOfEnergizedTiles = 0;

  for (let i = 0; i < contraption.length; i += 1) {
    const numberOfEastgoingEnergizedTiles = getNumberOfEnergizedTiles(
      contraption,
      { x: 0, y: i },
      `east`,
    );
    const numberOfWestgoingEnergizedTiles = getNumberOfEnergizedTiles(
      contraption,
      { x: contraption.length - 1, y: i },
      `west`,
    );
    maximumNumberOfEnergizedTiles = Math.max(
      maximumNumberOfEnergizedTiles,
      numberOfEastgoingEnergizedTiles,
      numberOfWestgoingEnergizedTiles,
    );
  }

  for (let i = 0; i < contraption[0].length; i += 1) {
    const numberOfNorthgoingEnergizedTiles = getNumberOfEnergizedTiles(
      contraption,
      { x: i, y: 0 },
      `south`,
    );
    const numberOfSouthgoingEnergizedTiles = getNumberOfEnergizedTiles(
      contraption,
      { x: i, y: contraption[0].length - 1 },
      `north`,
    );
    maximumNumberOfEnergizedTiles = Math.max(
      maximumNumberOfEnergizedTiles,
      numberOfNorthgoingEnergizedTiles,
      numberOfSouthgoingEnergizedTiles,
    );
  }

  return maximumNumberOfEnergizedTiles;
};
