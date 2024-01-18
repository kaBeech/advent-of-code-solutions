import { CardinalDirection, XYCoordinates } from "../../tools/commonTypes.ts";
import processBeam from "./processBeam.ts";
import { Grid } from "./types.ts";

export default (
  grid: Grid,
  currentTileCoordinates: XYCoordinates,
  beamIsTravelingToThe: CardinalDirection,
) => {
  if (
    currentTileCoordinates.x >= 0 && currentTileCoordinates.y >= 0 &&
    currentTileCoordinates.x < grid[0].length &&
    currentTileCoordinates.y < grid.length
  ) {
    processBeam(grid, currentTileCoordinates, beamIsTravelingToThe);
  }
};
