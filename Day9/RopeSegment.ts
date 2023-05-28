import { XYCoordinate } from "../tools/commonTypes.ts";
import { handleHeadPositionChange } from "./handleHeadPositionChange.ts";

interface RopeSegmentState {
  nextSegment: {
    moveTail: (newPreviousSegmentPosition: XYCoordinate) => XYCoordinate;
  } | null;
  currentSegmentPosition: XYCoordinate;
}

const tailMover = (state: RopeSegmentState) => ({
  moveTail: (
    newPreviousSegmentPosition: XYCoordinate,
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

const RopeSegment = (remainingSegments: number) => {
  const state = {
    currentSegmentPosition: [0, 0] as XYCoordinate,
    nextSegment: null as {
      moveTail: (newPreviousSegmentPosition: XYCoordinate) => XYCoordinate;
    } | null,
  };

  if (remainingSegments > 1) {
    state.nextSegment = RopeSegment(remainingSegments - 1);
  }

  return {
    ...tailMover(state),
  };
};

export { RopeSegment };
