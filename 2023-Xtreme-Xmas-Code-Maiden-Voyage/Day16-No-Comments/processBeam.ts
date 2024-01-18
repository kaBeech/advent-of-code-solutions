import { CardinalDirection, XYCoordinates } from "../../tools/commonTypes.ts";
import { Grid } from "./types.ts";

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
      if (nextTileCoordinates.x >= 0 && nextTileCoordinates.y >= 0) {
        processBeam(grid, nextTileCoordinates, beamIsTravelingToThe);
        break;
      }
  }
};
