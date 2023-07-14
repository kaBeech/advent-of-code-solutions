import { XYCoordinate } from "../../tools/commonTypes.ts";

interface Tile {
  coordinates: XYCoordinate;
  elevation: string;
  accessibleAdjacentTilesByPreference: Tile[];
}

export type { Tile };
