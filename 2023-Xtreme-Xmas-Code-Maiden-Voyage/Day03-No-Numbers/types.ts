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

export interface Tile {
  value: PseudoNumber | "X" | ".";
  coordinates: XYCoordinates;
}

export type TileMap = Tile[][];
