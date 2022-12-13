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

export type { Tree, TreeMap };
