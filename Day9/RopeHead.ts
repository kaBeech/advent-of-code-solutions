import { XYCoordinate } from "../tools/commonTypes.ts";
import { handleSingleMove } from "./handleSingleMove.ts";
import { MovementDirection } from "./types.ts";

interface RopeHeadState {
  currentPosition: XYCoordinate;
  storedInstruction: [MovementDirection, number] | null;
  visitedLocations: XYCoordinate[];
}

const currentPositionGetter = (state: RopeHeadState) => ({
  getCurrentPosition: () => state.currentPosition,
});

const currentPositionSetter = (state: RopeHeadState) => ({
  setCurrentPosition: (newCurrentPosition: XYCoordinate) => {
    state.currentPosition = newCurrentPosition;
  },
});

const movementInstructionHandler = (state: RopeHeadState) => ({
  handleMovementInstruction: (movementInstructionRaw: string) => {
    // if (state.storedInstruction) {throw error}
    const movementInstructionFormatted = movementInstructionRaw.split(" ");
    // if movementInstructionFormatted is not of type [MovementDirection, number], throw error
    state.storedInstruction = movementInstructionFormatted as [
      MovementDirection,
      number,
    ];

    while (state.storedInstruction[1] > 0) {
      const newPosition = handleSingleMove(
        state.currentPosition,
        state.storedInstruction[0],
      );
      state.currentPosition = newPosition;
      //   Pass current position to RopeTail
      state.storedInstruction = [
        state.storedInstruction[0],
        state.storedInstruction[1]--,
      ];
    }
  },
});

const RopeHead = (
  currentPosition: XYCoordinate,
) => {
  const state = {
    currentPosition: [0, 0] as XYCoordinate,
    storedInstruction: null as [MovementDirection, number] | null,
    visitedLocations: [[0, 0]] as XYCoordinate[],
  };

  return {
    ...movementInstructionHandler(state),
  };
};

export { RopeHead };
