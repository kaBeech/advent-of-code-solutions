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
    case `North`:
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.west,
        `West`,
      );
      break;
    case `East`:
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.south,
        `South`,
      );
      break;
    case `South`:
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.east,
        `East`,
      );
      break;
    case `West`:
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.north,
        `North`,
      );
      break;
  }
};
