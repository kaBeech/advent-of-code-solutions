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
    case `East`:
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.east,
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
    case `North`:
    case `South`:
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.east,
        `East`,
      );
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.west,
        `West`,
      );
      break;
  }
};
