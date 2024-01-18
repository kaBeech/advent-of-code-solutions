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
        adjacentCoordinates.north,
        beamIsTravelingToThe,
      );
      break;
    case `East`:
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.east,
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
    case `West`:
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.west,
        beamIsTravelingToThe,
      );
      break;
  }
};
