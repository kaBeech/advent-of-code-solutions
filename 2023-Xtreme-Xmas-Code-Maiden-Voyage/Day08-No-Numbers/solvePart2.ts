import followInstruction from "./followInstruction.ts";
import { parseInput } from "./parseInput.ts";
import { Maps } from "./types.ts";
import getLastChar from "./getLastChar.ts";

export default (async function (): Promise<string[]> {
  const maps: Maps = await parseInput();
  const instructionsCopy = maps.instructions.slice();
  const startingInstructions = instructionsCopy.filter((instruction) => {
    const idArray = instruction.id.split(``);
    const idLastChar = idArray.pop();
    return idLastChar === `A`;
  });
  const directions = maps.directions.split(``);
  const directionsReservoir = [];
  const totalStepsArray = [];
  let currentInstructions = startingInstructions;
  let reservoirInUse = false;
  let endReached = false;

  while (!endReached) {
    // console.log(`Current instructions: ${JSON.stringify(currentInstructions)}`);
    let nonEndInstructionFound = false;
    let currentDirection: string;
    if (reservoirInUse) {
      // This checks whether directionsReservoir is empty without using any numbers
      if (directionsReservoir == false) {
        reservoirInUse = false;
        currentDirection = directions.shift()!;
        directionsReservoir.push(currentDirection);
      } else {
        currentDirection = directionsReservoir.shift()!;
        directions.push(currentDirection);
      }
    } else {
      // This checks whether directions is empty without using any numbers
      if (directions == false) {
        reservoirInUse = true;
        currentDirection = directionsReservoir.shift()!;
        directions.push(currentDirection);
      } else {
        currentDirection = directions.shift()!;
        directionsReservoir.push(currentDirection);
      }
    }
    const newInstructions = [];
    for (let currentInstruction of currentInstructions) {
      // console.log(`Current instruction: ${JSON.stringify(currentInstruction)}`);
      // console.log(
      //   `last char: ${getLastChar(currentInstruction.id)}`,
      //   currentDirection,
      // );
      const lastEndingNode = currentInstruction.lastEndingNode;
      let distanceFromLastEndingNode =
        currentInstruction.distanceFromLastEndingNode;
      currentInstruction = followInstruction(
        maps.instructions,
        currentInstruction,
        currentDirection,
      )!;
      if (getLastChar(currentInstruction.id) !== `Z`) {
        nonEndInstructionFound = true;
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
          currentInstruction.lastEndingNode.nextEndingNode = currentInstruction;
          currentInstruction.lastEndingNode.distanceFromNextEndingNode =
            currentInstruction.distanceFromLastEndingNode;
        }
        currentInstruction.lastEndingNode = currentInstruction;
        currentInstruction.distanceFromLastEndingNode = 0;
      }
      newInstructions.push(currentInstruction);
      // console.log(`Current instruction: ${JSON.stringify(currentInstruction)}`);
    }
    totalStepsArray.push(`Step!`);
    currentInstructions = newInstructions;
    // console.log(`Current instructions: ${JSON.stringify(currentInstructions)}`);
    if (!nonEndInstructionFound) {
      endReached = true;
    }
    // console.log(JSON.stringify(totalStepsArray.length));
  }
  // console.log(`Current instructions: ${JSON.stringify(currentInstructions)}`);

  console.log(
    `Part 2: The number of steps it takes before all current nodes' ids end in "Z" is: ${
      JSON.stringify(totalStepsArray.length)
    }`,
  );

  return totalStepsArray;
})();
