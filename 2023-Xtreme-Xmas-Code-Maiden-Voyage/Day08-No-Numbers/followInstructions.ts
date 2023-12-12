import followInstruction from "./followInstruction.ts";
import getLastChar from "./getLastChar.ts";
import { Instruction, Maps } from "./types.ts";

export default (
  currentDirection: string,
  currentInstructions: Instruction[],
  maps: Maps,
  nonEndInstructionFound: boolean,
) => {
  const newInstructions: Instruction[] = [];

  for (let currentInstruction of currentInstructions) {
    // console.log(`Current instruction: ${JSON.stringify(currentInstruction)}`);
    // console.log(
    //   `last char: ${getLastChar(currentInstruction.id)}`,
    //   currentDirection,
    // );
    const lastEndingNode = currentInstruction.lastEndingNode;
    // deno-lint-ignore prefer-const
    let distanceFromLastEndingNode =
      currentInstruction.distanceFromLastEndingNode;
    currentInstruction = followInstruction(
      maps.instructions,
      currentInstruction,
      currentDirection,
    )!;
    if (getLastChar(currentInstruction.id) !== `Z`) {
      if (!nonEndInstructionFound) {
        nonEndInstructionFound = true;
      }
      if (lastEndingNode) {
        distanceFromLastEndingNode!++;
        if (!currentInstruction.lastEndingNode) {
          currentInstruction.lastEndingNode = lastEndingNode,
            currentInstruction.distanceFromLastEndingNode =
              distanceFromLastEndingNode;
        }
      }
    } else {
      if (
        currentInstruction.lastEndingNode &&
        !currentInstruction.lastEndingNode.nextEndingNode
      ) {
        distanceFromLastEndingNode!++;
        currentInstruction.lastEndingNode.nextEndingNode = currentInstruction;
        currentInstruction.lastEndingNode.distanceFromNextEndingNode =
          distanceFromLastEndingNode;
        console.log(
          currentInstruction.lastEndingNode.distanceFromNextEndingNode,
        );
      }
      currentInstruction.lastEndingNode = currentInstruction;
      currentInstruction.distanceFromLastEndingNode = 0;
    }
    newInstructions.push(currentInstruction);
    // console.log(`Current instruction: ${JSON.stringify(currentInstruction)}`);
  }
  return { newInstructions, nonEndInstructionFound };
};
