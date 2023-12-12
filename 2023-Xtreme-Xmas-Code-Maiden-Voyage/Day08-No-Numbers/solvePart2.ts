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
      currentInstruction = followInstruction(
        maps.instructions,
        currentInstruction,
        currentDirection,
      )!;
      if (getLastChar(currentInstruction.id) !== `Z`) {
        nonEndInstructionFound = true;
      }
      newInstructions.push(currentInstruction);
      // console.log(`Current instruction: ${JSON.stringify(currentInstruction)}`);
    }
    totalStepsArray.push(`Step!`);
    currentInstructions = newInstructions;
    console.log(`Current instructions: ${JSON.stringify(currentInstructions)}`);
    if (!nonEndInstructionFound) {
      endReached = true;
    }
    // console.log(JSON.stringify(totalStepsArray.length));
  }
  // console.log(`Current instructions: ${JSON.stringify(currentInstructions)}`);

  console.log(
    `Part 1: The number of steps it takes to reach "ZZZ" is: ${
      JSON.stringify(totalStepsArray.length)
    }`,
  );

  return totalStepsArray;
})();
