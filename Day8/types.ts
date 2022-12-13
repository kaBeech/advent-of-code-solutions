import { integer, ModalBoolean, SingleDigitInteger } from "../tools/commonTypes.ts";

interface Tree {
  location: number[];
  height: SingleDigitInteger;
  visibility: ModalBoolean[];
}

interface TreeMap {
  trees: Tree[];
  sideLength: number;
}

//Legend: 0 = -X, 1 = -Y, 2 = +X, 3 = +Y
type OrthagonalDirection2D = 0 | 1 | 2 | 3

export type { Tree, TreeMap, OrthagonalDirection2D };
