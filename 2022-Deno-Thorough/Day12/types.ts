import { XYCoordinate } from "../../tools/commonTypes.ts";

interface TileType {
  coordinates: XYCoordinate;
  elevation: string;
  accessibleAdjacentTilesByPreference: Tile[];
}

export type { TileType };
