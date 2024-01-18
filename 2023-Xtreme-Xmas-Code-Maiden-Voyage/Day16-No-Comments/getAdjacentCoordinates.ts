import { XYCoordinates } from "../../tools/commonTypes.ts";

export default (currentTileCoordinates: XYCoordinates) => {
  const adjacentCoordinates = {
    north: {
      x: currentTileCoordinates.x,
      y: currentTileCoordinates.y - 1,
    },
    east: {
      x: currentTileCoordinates.x + 1,
      y: currentTileCoordinates.y,
    },
    south: {
      x: currentTileCoordinates.x,
      y: currentTileCoordinates.y + 1,
    },
    west: {
      x: currentTileCoordinates.x - 1,
      y: currentTileCoordinates.y,
    },
  };
  return adjacentCoordinates;
};
