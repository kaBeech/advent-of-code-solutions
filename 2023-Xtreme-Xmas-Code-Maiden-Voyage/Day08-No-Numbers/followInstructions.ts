import followInstruction from "./followInstruction.ts";
import getLastChar from "./getLastChar.ts";
import { Instruction, Maps } from "./types.ts";

export default (
  currentDirection: string,
  currentInstructions: Instruction[],
  maps: Maps,
  surveyedEndingNodePathLoops: Instruction[],
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
    const nextEndingNode = currentInstruction.nextEndingNode;
    // deno-lint-ignore prefer-const
    let distanceFromNextEndingNode =
      currentInstruction.distanceFromNextEndingNode;
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
      if (nextEndingNode) {
        distanceFromNextEndingNode!--;
        if (!currentInstruction.nextEndingNode) {
          currentInstruction.nextEndingNode = nextEndingNode,
            currentInstruction.distanceFromNextEndingNode =
              distanceFromNextEndingNode;
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
      } else if (
        currentInstruction.lastEndingNode &&
        currentInstruction.lastEndingNode.nextEndingNode
      ) {
        surveyedEndingNodePathLoops.push(currentInstruction.lastEndingNode);
      }
      currentInstruction.lastEndingNode = currentInstruction;
      currentInstruction.distanceFromLastEndingNode = 0;
    }
    newInstructions.push(currentInstruction);
  }
  return {
    newInstructions,
    nonEndInstructionFound,
    surveyedEndingNodePathLoops,
  };
};
