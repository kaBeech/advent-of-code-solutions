import { ModalBoolean } from "../tools/commonTypes.ts";
import { integer } from "../tools/commonTypes.ts";
import { OrthagonalDirection2D } from "./types.ts";

interface TreeState {
  location: number[];
  height: integer;
  visibility: ModalBoolean[];
}

const locationGetter = (state: TreeState) => ({
  getLocation: () => state.location,
});

const heightGetter = (state: TreeState) => ({
  getHeight: () => state.height,
});

const visibilityGetter = (state: TreeState) => ({
  getVisibility: () => state.visibility,
});

const visibilitySetter = (state: TreeState) => ({
  setVisibility: (visibility: boolean, direction: OrthagonalDirection2D) => {
    state.visibility[direction] = visibility;
  },
});

const Tree = (row: number, column: number, height: integer) => {
  const state = {
    location: [row, column],
    height,
    visibility: [null, null, null, null],
  };
  return {
    ...locationGetter(state),
    ...heightGetter(state),
    ...visibilityGetter(state),
    ...visibilitySetter(state),
  };
};

export default Tree;
