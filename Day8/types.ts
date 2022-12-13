import { integer, ModalBoolean } from "../tools/commonTypes.ts";

interface Tree {
  location: number[];
  height: integer;
  visibility: ModalBoolean[];
}

interface TreeMap {
  trees: Tree[];
  sideLength: number;
}

//Legend: 0 = -X, 1 = -Y, 2 = +X, 3 = +Y
type CardinalDirection2D = 0 | 1 | 2 | 3

export type { Tree, TreeMap, CardinalDirection2D };
