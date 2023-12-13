import { TypeInstruction } from "./types.ts";

export default (function (
  instructions: TypeInstruction[],
  currentInstruction: TypeInstruction,
  direction: string,
) {
  if (direction === `L`) {
    const fetchedInstruction = instructions.find((nextInstruction) =>
      nextInstruction.id === currentInstruction.l
    );
    if (!fetchedInstruction) {
      throw new Error(
        `No instruction found with id ${currentInstruction.l} in instructions array`,
      );
    }
    return fetchedInstruction;
  } else if (direction === `R`) {
    const fetchedInstruction = instructions.find((nextInstruction) =>
      nextInstruction.id === currentInstruction.r
    );
    if (!fetchedInstruction) {
      throw new Error(
        `No instruction found with id ${currentInstruction.r} in instructions array`,
      );
    }
    return fetchedInstruction;
  } else throw new Error(`Direction must be R or L`);
});
