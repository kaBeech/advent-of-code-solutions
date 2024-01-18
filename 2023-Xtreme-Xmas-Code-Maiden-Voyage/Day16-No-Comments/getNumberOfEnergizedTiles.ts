import { CardinalDirection, XYCoordinates } from "../../tools/commonTypes.ts";
import processBeam from "./processBeam.ts";
import { Grid } from "./types.ts";

export default (
  contraption: Grid,
  startingTileCoordinates: XYCoordinates,
  startingDirection: CardinalDirection,
): number => {
  processBeam(contraption, startingTileCoordinates, startingDirection);

  const energizedTiles = contraption.flat().filter((tile) => tile.isEnergized);

  const totalNumberOfEnergizedTiles = energizedTiles.length;

  return totalNumberOfEnergizedTiles;
};
