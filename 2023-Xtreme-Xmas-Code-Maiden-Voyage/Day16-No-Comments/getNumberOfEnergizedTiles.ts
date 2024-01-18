import { CardinalDirection, XYCoordinates } from "../../tools/commonTypes.ts";
import processBeam from "./processBeam.ts";
import { Grid } from "./types.ts";

export default (
  contraption: Grid,
  startingTileCoordinates: XYCoordinates,
  startingDirection: CardinalDirection,
): number => {
  const contraptionCopy = contraption.map((row) =>
    row.map((tile) => ({ ...tile }))
  );

  processBeam(contraptionCopy, startingTileCoordinates, startingDirection);

  const energizedTiles = contraptionCopy.flat().filter((tile) =>
    tile.isEnergized
  );

  const totalNumberOfEnergizedTiles = energizedTiles.length;

  return totalNumberOfEnergizedTiles;
};
