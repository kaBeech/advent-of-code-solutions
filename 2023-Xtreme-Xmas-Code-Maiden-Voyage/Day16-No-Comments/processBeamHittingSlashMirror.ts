import { CardinalDirection, XYCoordinates } from "../../tools/commonTypes.ts";
import getAdjacentCoordinates from "./getAdjacentCoordinates.ts";
import processBeamIfWithinRange from "./processBeamIfWithinRange.ts";
import { Grid } from "./types.ts";

export default (
  grid: Grid,
  currentTileCoordinates: XYCoordinates,
  beamIsTravelingToThe: CardinalDirection,
) => {
  const adjacentCoordinates = getAdjacentCoordinates(currentTileCoordinates);
  switch (beamIsTravelingToThe) {
    case `North`:
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.east,
        `East`,
      );
      break;
    case `East`:
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.north,
        `North`,
      );
      break;
    case `South`:
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.west,
        `West`,
      );
      break;
    case `West`:
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.south,
        `South`,
      );
      break;
  }
};