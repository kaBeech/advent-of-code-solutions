import { XYCoordinate } from "../tools/commonTypes.ts";
import { handleHeadPositionChange } from "./handleHeadPositionChange.ts";

interface RopeSegmentState {
  nextSegment: { moveTail: () => XYCoordinate } | null;
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
      return state.nextSegment.moveTail();
    } else return state.currentSegmentPosition;
  },
});

const RopeSegment = () => {
  const state = {
    currentSegmentPosition: [0, 0] as XYCoordinate,
    nextSegment: null as { moveTail: () => XYCoordinate } | null,
  };

  return {
    ...tailMover(state),
  };
};

export { RopeSegment };
