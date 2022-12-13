import { ModalBoolean, SingleDigitInteger } from "../tools/commonTypes.ts";
import { OrthagonalDirection2D } from "./types.ts";

interface TreeState {
  location: number[];
  height: SingleDigitInteger;
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

const Tree = (row: number, column: number, height: SingleDigitInteger) => {
  if (row < 0 || row % 1 !== 0) {
    throw new Error(
      `Row must be a positive integer! Received: ${row}`,
    );
  }
  if (column < 0 || column % 1 !== 0) {
    throw new Error(
      `Column must be a positive integer! Received: ${column}`,
    );
  }

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
