import { CardinalDirection, XYCoordinates } from "../../tools/commonTypes.ts";
import getAdjacentCoordinates from "./getAdjacentCoordinates.ts";
import processBeamIfWithinRange from "./processBeamIfWithinRange.ts";
import { Grid } from "./types.ts";

export default (
  grid: Grid,
  currentTileCoordinates: XYCoordinates,
  beamIsTravelingToThe: CardinalDirection,
) => {
  const currentTile = grid[currentTileCoordinates.y][currentTileCoordinates.x];

  if (currentTile.isHalfProcessed) currentTile.isFullyProcessed = true;
  else currentTile.isHalfProcessed = true;

  const adjacentCoordinates = getAdjacentCoordinates(currentTileCoordinates);

  switch (beamIsTravelingToThe) {
    case `North`:
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.north,
        beamIsTravelingToThe,
      );
      break;
    case `South`:
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.south,
        beamIsTravelingToThe,
      );
      break;
    case `East`:
    case `West`:
      processBeamIfWithinRange(grid, adjacentCoordinates.north, `North`);
      processBeamIfWithinRange(grid, adjacentCoordinates.south, `South`);
      break;
  }
};
