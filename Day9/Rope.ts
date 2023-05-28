import { XYCoordinate } from "../tools/commonTypes.ts";
import { handleHeadPositionChange } from "./handleHeadPositionChange.ts";
import { handleSingleMove } from "./handleSingleMove.ts";
import { MovementDirection } from "./types.ts";

interface RopeState {
  headPosition: XYCoordinate;
  tailPosition: XYCoordinate;
  storedInstruction: [MovementDirection, number] | null;
  visitedTailLocations: string[];
  length: number;
}

const visitedTailLocationsGetter = (state: RopeState) => ({
  getVisitedTailLocations: () => state.visitedTailLocations,
});

const movementInstructionHandler = (state: RopeState) => ({
  handleMovementInstruction: (movementInstructionRaw: string) => {
    if (state.storedInstruction) {
      throw new Error(
        `There is already an instruction stored! storedInstruction: [${state.storedInstruction}], Received headPosition: [${state.headPosition}]`,
      );
    }

    const movementInstructionFormatted = movementInstructionRaw.split(" ");

    const orthagonalDirections = ["U", "D", "L", "R"];
    if (
      !(movementInstructionFormatted.length === 2 &&
        orthagonalDirections.includes(movementInstructionFormatted[0]) &&
        (Number.isInteger(+movementInstructionFormatted[1])))
    ) {
      throw new Error(
        `Invalid movement instruction received. Expected input: a string consisting of one of the letters "U", "D", "L", and "R", followed by a space, followed by an integer. Example: "U 9". Input received: "${movementInstructionRaw}"`,
      );
    }

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
        state.length,
      );
      if (
        !state.visitedTailLocations.includes(String(state.tailPosition))
      ) {
        state.visitedTailLocations.push(String(state.tailPosition));
      }
      state.storedInstruction = [
        state.storedInstruction[0],
        state.storedInstruction[1] - 1,
      ];
    }
    state.storedInstruction = null;
  },
});

const Rope = (length: number) => {
  const state = {
    headPosition: [0, 0] as XYCoordinate,
    tailPosition: [0, 0] as XYCoordinate,
    storedInstruction: null as [MovementDirection, number] | null,
    visitedTailLocations: [] as string[],
    length,
  };

  return {
    ...visitedTailLocationsGetter(state),
    ...movementInstructionHandler(state),
  };
};

export { Rope };
