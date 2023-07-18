import { XYCoordinateArray } from "../../tools/commonTypes.ts";
import { handleHeadPositionChange } from "./handleHeadPositionChange.ts";

interface TailSegmentState {
  nextSegment: {
    moveTail: (
      newPreviousSegmentPosition: XYCoordinateArray,
    ) => XYCoordinateArray;
  } | null;
  currentSegmentPosition: XYCoordinateArray;
}

const tailMover = (state: TailSegmentState) => ({
  moveTail: (
    newPreviousSegmentPosition: XYCoordinateArray,
  ) => {
    state.currentSegmentPosition = handleHeadPositionChange(
      state.currentSegmentPosition,
      newPreviousSegmentPosition,
    );
    if (state.nextSegment) {
      return state.nextSegment.moveTail(state.currentSegmentPosition);
    } else return state.currentSegmentPosition;
  },
});

const TailSegment = (remainingSegments: number) => {
  const state = {
    currentSegmentPosition: [0, 0] as XYCoordinateArray,
    nextSegment: null as {
      moveTail: (
        newPreviousSegmentPosition: XYCoordinateArray,
      ) => XYCoordinateArray;
    } | null,
  };

  if (remainingSegments > 1) {
    state.nextSegment = TailSegment(remainingSegments - 1);
  }

  return {
    ...tailMover(state),
  };
};

export { TailSegment };
