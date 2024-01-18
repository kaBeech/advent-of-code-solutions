import { CardinalDirection, XYCoordinates } from "../../tools/commonTypes.ts";
import { Grid } from "./types.ts";

const processBeamIfWithinRange = (
  grid: Grid,
  currentTileCoordinates: XYCoordinates,
  beamIsTravelingToThe: CardinalDirection,
) => {
  if (currentTileCoordinates.x >= 0 && currentTileCoordinates.y >= 0) {
    processBeam(grid, currentTileCoordinates, beamIsTravelingToThe);
  }
};

export const processBeam = (
  grid: Grid,
  currentTileCoordinates: XYCoordinates,
  beamIsTravelingToThe: CardinalDirection,
) => {
  const currentTile = grid[currentTileCoordinates.y][currentTileCoordinates.x];

  currentTile.energized = true;

  const adjacentCoordinatesNorth = {
    x: currentTileCoordinates.x,
    y: currentTileCoordinates.y - 1,
  };
  const adjacentCoordinatesEast = {
    x: currentTileCoordinates.x + 1,
    y: currentTileCoordinates.y,
  };
  const adjacentCoordinatesSouth = {
    x: currentTileCoordinates.x,
    y: currentTileCoordinates.y + 1,
  };
  const adjacentCoordinatesWest = {
    x: currentTileCoordinates.x - 1,
    y: currentTileCoordinates.y,
  };

  switch (currentTile.contains) {
    case `empty space`:
      switch (beamIsTravelingToThe) {
        case `North`:
          processBeamIfWithinRange(
            grid,
            adjacentCoordinatesNorth,
            beamIsTravelingToThe,
          );
          break;
        case `East`:
          processBeamIfWithinRange(
            grid,
            adjacentCoordinatesEast,
            beamIsTravelingToThe,
          );
          break;
        case `South`:
          processBeamIfWithinRange(
            grid,
            adjacentCoordinatesSouth,
            beamIsTravelingToThe,
          );
          break;
        case `West`:
          processBeamIfWithinRange(
            grid,
            adjacentCoordinatesWest,
            beamIsTravelingToThe,
          );
          break;
      }
      break;
    case `mirror slash`:
      switch (beamIsTravelingToThe) {
        case `North`:
          processBeamIfWithinRange(
            grid,
            adjacentCoordinatesEast,
            `East`,
          );
          break;
        case `East`:
          processBeamIfWithinRange(
            grid,
            adjacentCoordinatesNorth,
            `North`,
          );
          break;
        case `South`:
          processBeamIfWithinRange(
            grid,
            adjacentCoordinatesWest,
            `West`,
          );
          break;
        case `West`:
          processBeamIfWithinRange(
            grid,
            adjacentCoordinatesSouth,
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
            adjacentCoordinatesWest,
            `West`,
          );
          break;
        case `East`:
          processBeamIfWithinRange(
            grid,
            adjacentCoordinatesSouth,
            `South`,
          );
          break;
        case `South`:
          processBeamIfWithinRange(
            grid,
            adjacentCoordinatesEast,
            `East`,
          );
          break;
        case `West`:
          processBeamIfWithinRange(
            grid,
            adjacentCoordinatesNorth,
            `North`,
          );
          break;
      }
      break;
  }
};
