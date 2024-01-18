import { CardinalDirection, XYCoordinates } from "../../tools/commonTypes.ts";
import getAdjacentCoordinates from "./getAdjacentCoordinates.ts";
import processBeamIfWithinRange from "./processBeamIfWithinRange.ts";
import processBeamInEmptySpace from "./processBeamInEmptySpace.ts";
import { Grid } from "./types.ts";

export default (
  grid: Grid,
  currentTileCoordinates: XYCoordinates,
  beamIsTravelingToThe: CardinalDirection,
) => {
  const currentTile = grid[currentTileCoordinates.y][currentTileCoordinates.x];

  currentTile.energized = true;

  const adjacentCoordinates = getAdjacentCoordinates(currentTileCoordinates);

  switch (currentTile.contains) {
    case `empty space`:
      processBeamInEmptySpace(
        grid,
        currentTileCoordinates,
        beamIsTravelingToThe,
      );
      break;
    case `mirror slash`:
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
      break;
    case `mirror backslash`:
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
      break;
    case "splitter vertical":
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
        case "East" || "West":
          processBeamIfWithinRange(grid, adjacentCoordinates.north, "North");
          processBeamIfWithinRange(grid, adjacentCoordinates.south, "South");
          break;
      }
      break;
    case "splitter horizontal":
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
        case "North" || "South":
          processBeamIfWithinRange(grid, adjacentCoordinates.east, "East");
          processBeamIfWithinRange(grid, adjacentCoordinates.west, "West");
          break;
      }
      break;
  }
};
