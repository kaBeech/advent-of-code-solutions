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

  switch (currentTile.contains) {
    case `empty space`:
      switch (beamIsTravelingToThe) {
        case `North`:
          nextTileCoordinates = {
            x: currentTileCoordinates.x,
            y: currentTileCoordinates.y - 1,
          };
          break;
        case `East`:
          nextTileCoordinates = {
            x: currentTileCoordinates.x + 1,
            y: currentTileCoordinates.y,
          };
          break;
        case `South`:
          nextTileCoordinates = {
            x: currentTileCoordinates.x,
            y: currentTileCoordinates.y + 1,
          };
          break;
        case `West`:
          nextTileCoordinates = {
            x: currentTileCoordinates.x - 1,
            y: currentTileCoordinates.y,
          };
          break;
      }
      processBeamIfWithinRange(grid, nextTileCoordinates, beamIsTravelingToThe);
      break;
    case `mirror slash`:
      switch (beamIsTravelingToThe) {
        case `North`:
          nextTileCoordinates = {
            x: currentTileCoordinates.x + 1,
            y: currentTileCoordinates.y,
          };
          beamIsTravelingToThe = `East`;
          break;
        case `East`:
          nextTileCoordinates = {
            x: currentTileCoordinates.x,
            y: currentTileCoordinates.y + 1,
          };
          beamIsTravelingToThe = `South`;
          break;
        case `South`:
          nextTileCoordinates = {
            x: currentTileCoordinates.x - 1,
            y: currentTileCoordinates.y,
          };
          beamIsTravelingToThe = `West`;
          break;
        case `West`:
          nextTileCoordinates = {
            x: currentTileCoordinates.x,
            y: currentTileCoordinates.y - 1,
          };
          beamIsTravelingToThe = `North`;
          break;
      }
      processBeamIfWithinRange(grid, nextTileCoordinates, beamIsTravelingToThe);
      break;
    case `mirror backslash`:
      switch (beamIsTravelingToThe) {
        case `North`:
          nextTileCoordinates = {
            x: currentTileCoordinates.x - 1,
            y: currentTileCoordinates.y,
          };
          beamIsTravelingToThe = `West`;
          break;
        case `East`:
          nextTileCoordinates = {
            x: currentTileCoordinates.x,
            y: currentTileCoordinates.y + 1,
          };
          beamIsTravelingToThe = `South`;
          break;
        case `South`:
          nextTileCoordinates = {
            x: currentTileCoordinates.x + 1,
            y: currentTileCoordinates.y,
          };
          beamIsTravelingToThe = `East`;
          break;
        case `West`:
          nextTileCoordinates = {
            x: currentTileCoordinates.x,
            y: currentTileCoordinates.y - 1,
          };
          beamIsTravelingToThe = `North`;
          break;
      }
      processBeamIfWithinRange(grid, nextTileCoordinates, beamIsTravelingToThe);
      break;
  }
};
