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

  let nextTileCoordinates: XYCoordinates;
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
          nextTileCoordinates = adjacentCoordinatesNorth;
          break;
        case `East`:
          nextTileCoordinates = adjacentCoordinatesEast;
          break;
        case `South`:
          nextTileCoordinates = adjacentCoordinatesSouth;
          break;
        case `West`:
          nextTileCoordinates = adjacentCoordinatesWest;
          break;
      }
      processBeamIfWithinRange(grid, nextTileCoordinates, beamIsTravelingToThe);
      break;
    case `mirror slash`:
      switch (beamIsTravelingToThe) {
        case `North`:
          nextTileCoordinates = adjacentCoordinatesEast;
          beamIsTravelingToThe = `East`;
          break;
        case `East`:
          nextTileCoordinates = adjacentCoordinatesNorth;
          beamIsTravelingToThe = `North`;
          break;
        case `South`:
          nextTileCoordinates = adjacentCoordinatesWest;
          beamIsTravelingToThe = `West`;
          break;
        case `West`:
          nextTileCoordinates = adjacentCoordinatesSouth;
          beamIsTravelingToThe = `South`;
          break;
      }
      processBeamIfWithinRange(grid, nextTileCoordinates, beamIsTravelingToThe);
      break;
    case `mirror backslash`:
      switch (beamIsTravelingToThe) {
        case `North`:
          nextTileCoordinates = adjacentCoordinatesWest;
          beamIsTravelingToThe = `West`;
          break;
        case `East`:
          nextTileCoordinates = adjacentCoordinatesSouth;
          beamIsTravelingToThe = `South`;
          break;
        case `South`:
          nextTileCoordinates = adjacentCoordinatesEast;
          beamIsTravelingToThe = `East`;
          break;
        case `West`:
          nextTileCoordinates = adjacentCoordinatesNorth;
          beamIsTravelingToThe = `North`;
          break;
      }
      processBeamIfWithinRange(grid, nextTileCoordinates, beamIsTravelingToThe);
      break;
  }
};
