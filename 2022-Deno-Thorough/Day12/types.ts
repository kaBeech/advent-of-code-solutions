import { XYCoordinates } from "../../tools/commonTypes.ts";

interface TileType {
  getCoordinates: () => XYCoordinates;
  getElevation: () => number;
  getFewestSteps: () => number | undefined;
}

interface TileMap {
  allTiles: TileType[][];
  startTile: TileType;
  endTile: TileType;
}

export type { TileMap, TileType };
