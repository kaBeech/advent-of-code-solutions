import { XYCoordinates } from "../../tools/commonTypes.ts";

interface TileType {
  getCoordinates: () => XYCoordinates;
  getElevation: () => string;
  getNextSteps: () => TileType[];
  getDistanceFromStart: () => number;
}

interface TileMap {
  map: TileType[][];
  startTile: TileType;
  endTile: TileType;
}

export type { TileMap, TileType };
