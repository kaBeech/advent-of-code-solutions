import { CardinalDirection } from "../../tools/commonTypes.ts";
import getAdjacentCoordinates from "./getAdjacentCoordinates.ts";
import processBeamIfWithinRange from "./processBeamIfWithinRange.ts";
import { Grid, Tile } from "./types.ts";

export default (
  grid: Grid,
  currentTile: Tile,
  beamIsTravelingToThe: CardinalDirection,
) => {
  const adjacentCoordinates = getAdjacentCoordinates(currentTile.coordinates);

  switch (beamIsTravelingToThe) {
    case `north`:
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.east,
        `east`,
      );
      break;
    case `east`:
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.north,
        `north`,
      );
      break;
    case `south`:
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.west,
        `west`,
      );
      break;
    case `west`:
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.south,
        `south`,
      );
      break;
  }
};
