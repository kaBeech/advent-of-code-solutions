import { XYCoordinate } from "../tools/commonTypes.ts";
import { handleHeadPositionChange } from "./handleHeadPositionChange.ts";
import { handleSingleMove } from "./handleSingleMove.ts";
import { MovementDirection } from "./types.ts";

interface RopeState {
  headPosition: XYCoordinate;
  tailPosition: XYCoordinate;
  storedInstruction: [MovementDirection, number] | null;
  visitedTailLocations: XYCoordinate[];
}

const visitedTailLocationsGetter = (state: RopeState) => ({
  getVisitedTailLocations: () => state.visitedTailLocations,
});

const movementInstructionHandler = (state: RopeState) => ({
  handleMovementInstruction: (movementInstructionRaw: string) => {
    // if (state.storedInstruction) {throw error}
    const movementInstructionFormatted = movementInstructionRaw.split(" ");
    // if movementInstructionFormatted is not of type [MovementDirection, number], throw error
    state.storedInstruction = movementInstructionFormatted as [
      MovementDirection,
      number,
    ];

    while (state.storedInstruction[1] > 0) {
      const newHeadPosition = handleSingleMove(
        state.headPosition,
        state.storedInstruction[0],
      );
      state.headPosition = newHeadPosition;
      state.tailPosition = handleHeadPositionChange(
        state.tailPosition,
        state.headPosition,
      );
      if (
        !state.visitedTailLocations.includes(state.tailPosition)
      ) {
        state.visitedTailLocations.push(state.tailPosition);
      }
      state.storedInstruction = [
        state.storedInstruction[0],
        state.storedInstruction[1]--,
      ];
    }
  },
});

const Rope = () => {
  const state = {
    headPosition: [0, 0] as XYCoordinate,
    tailPosition: [0, 0] as XYCoordinate,
    storedInstruction: null as [MovementDirection, number] | null,
    visitedTailLocations: [[0, 0]] as XYCoordinate[],
  };

  return {
    ...visitedTailLocationsGetter(state),
    ...movementInstructionHandler(state),
  };
};

export { Rope };
