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
    case `north`:
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.north,
        beamIsTravelingToThe,
      );
      break;
    case `south`:
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.south,
        beamIsTravelingToThe,
      );
      break;
    case `east`:
    case `west`:
      processBeamIfWithinRange(grid, adjacentCoordinates.north, `north`);
      processBeamIfWithinRange(grid, adjacentCoordinates.south, `south`);
      break;
  }
};
