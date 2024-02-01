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
    case `east`:
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.east,
        beamIsTravelingToThe,
      );
      break;
    case `west`:
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.west,
        beamIsTravelingToThe,
      );
      break;
    case `north`:
    case `south`:
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.east,
        `east`,
      );
      processBeamIfWithinRange(
        grid,
        adjacentCoordinates.west,
        `west`,
      );
      break;
  }
};
