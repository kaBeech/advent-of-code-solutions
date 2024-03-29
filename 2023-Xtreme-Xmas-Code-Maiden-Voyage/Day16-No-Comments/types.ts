import { XYCoordinates } from "../../tools/commonTypes.ts";

export interface Tile {
  coordinates: XYCoordinates;
  contains:
    | `empty space`
    | `mirror slash`
    | `mirror backslash`
    | `splitter vertical`
    | `splitter horizontal`;
  isEnergized: boolean;
  isHalfProcessed: boolean;
  isFullyProcessed: boolean;
}

export type Grid = Tile[][];
