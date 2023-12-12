import { Instruction } from "./types.ts";

export default (function (
  instructions: Instruction[],
  currentInstruction: Instruction,
  direction: string,
) {
  if (direction === `L`) {
    const nextInstruction = instructions.find((nextInstruction) =>
      nextInstruction.id === currentInstruction.l
    );
    if (!nextInstruction) {
      throw new Error(
        `No instruction found with id ${currentInstruction.l} in instructions array`,
      );
    }
    return nextInstruction;
  } else if (direction === `R`) {
    const nextInstruction = instructions.find((nextInstruction) =>
      nextInstruction.id === currentInstruction.r
    );
    if (!nextInstruction) {
      throw new Error(
        `No instruction found with id ${currentInstruction.r} in instructions array`,
      );
    }
    return nextInstruction;
  } else throw new Error(`Direction must be R or L`);
});
