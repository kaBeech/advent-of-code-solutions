import { XYCoordinates } from "../../tools/commonTypes.ts";

interface TileType {
  getCoordinates: () => XYCoordinates;
  getElevation: () => number;
  getAccessibleAdjacentTilesByPreference: () => TileType[];
  getDistanceFromStart: (startCoordinates: XYCoordinates) => number;
}

export type { TileType };
