import { XYCoordinates } from "../../tools/commonTypes.ts";

interface TileType {
  getCoordinates: () => XYCoordinates;
  getElevation: () => number;
  getNextSteps: () => TileType[];
  getDistanceFromFinish: () => number;
}

interface TileMap {
  allTiles: TileType[][];
  startTile: TileType;
  endTile: TileType;
}

export type { TileMap, TileType };
