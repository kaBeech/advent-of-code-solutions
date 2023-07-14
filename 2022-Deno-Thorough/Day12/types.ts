import { XYCoordinates } from "../../tools/commonTypes.ts";

interface TileType {
  getCoordinates: () => XYCoordinates;
  getElevation: () => number;
  getAccessibleAdjacentTilesByPreference: () => TileType[];
  getDistanceFromStart: (startCoordinates: XYCoordinates) => number;
}

interface TileMap {
  test: TileType;
}

export type { TileMap, TileType };
