import { XYCoordinates } from "../../tools/commonTypes.ts";

export type PseudoNumber =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J";

export type TileValue = PseudoNumber | "X" | ".";

export interface Tile {
  value: TileValue;
  coordinates: XYCoordinates;
}

export type TileMap = Tile[][];
