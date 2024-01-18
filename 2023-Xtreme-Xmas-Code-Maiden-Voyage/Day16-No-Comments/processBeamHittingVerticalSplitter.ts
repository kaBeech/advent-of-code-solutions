import { CardinalDirection } from "../../tools/commonTypes.ts";
import getAdjacentCoordinates from "./getAdjacentCoordinates.ts";
import processBeamIfWithinRange from "./processBeamIfWithinRange.ts";
import { Grid, Tile } from "./types.ts";

export default (
  grid: Grid,
  currentTile: Tile,
  beamIsTravelingToThe: CardinalDirection,
) => {
  currentTile.isFullyProcessed = true;

  const adjacentCoordinates = getAdjacentCoordinates(currentTile.coordinates);

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
