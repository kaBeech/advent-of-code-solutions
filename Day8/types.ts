import { integer } from "../tools/commonTypes.ts";

interface Tree {
  location: number[],
  height: integer
}

interface TreeMap {
  trees: Tree[]
  sideLength: number
}

export type { Tree, TreeMap };
