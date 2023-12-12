import { Instruction } from "./types.ts";

export default (function (
  instructions: Instruction[],
  currentInstruction: Instruction,
  direction: string,
) {
  if (direction === `L`) {
    return instructions.find((nextInstruction) =>
      nextInstruction.id === currentInstruction.l
    );
  } else if (direction === `R`) {
    return instructions.find((nextInstruction) =>
      nextInstruction.id === currentInstruction.r
    );
  } else throw new Error(`Direction must be R or L`);
});
