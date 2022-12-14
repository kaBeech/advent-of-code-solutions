import { ModalBoolean, SingleDigitInteger } from "../tools/commonTypes.ts";

interface Tree {
  getLocation: { (): number[] };
  getHeight: { (): SingleDigitInteger };
  getVisibility: { (): ModalBoolean[] };
  setVisibility: {
    (visibility: boolean, direction: OrthagonalDirection2D): undefined;
  };
}

interface TreeMap {
  trees: Tree[];
  sideLength: number;
}

//Legend: 0 = -X, 1 = -Y, 2 = +X, 3 = +Y
type OrthagonalDirection2D = 0 | 1 | 2 | 3;

export type { OrthagonalDirection2D, Tree, TreeMap };
