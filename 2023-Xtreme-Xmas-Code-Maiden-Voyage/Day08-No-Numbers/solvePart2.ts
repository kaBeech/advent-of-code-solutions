import { parseInput } from "./parseInput.ts";
import { Maps } from "./types.ts";
import processDirectionData from "./processDirectionData.ts";
import followInstructions from "./followInstructions.ts";

export default (async function (): Promise<string[]> {
  const maps: Maps = await parseInput();
  const instructionsCopy = maps.instructions.slice();
  const startingInstructions = instructionsCopy.filter((instruction) => {
    const idArray = instruction.id.split(``);
    const idLastChar = idArray.pop();
    return idLastChar === `A`;
  });
  let directions = maps.directions.split(``);
  let directionsReservoir: string[] = [];
  const totalStepsArray: string[] = [];
  let currentInstructions = startingInstructions;
  let reservoirInUse = false;
  let endReached = false;

  while (!endReached) {
    // console.log(`Current instructions: ${JSON.stringify(currentInstructions)}`);
    let nonEndInstructionFound = false;

    const directionData = processDirectionData(
      reservoirInUse,
      directions,
      directionsReservoir,
    );

    // Evaluate whether these are necessary
    reservoirInUse = directionData.reservoirInUse;
    directions = directionData.directions;
    directionsReservoir = directionData.directionsReservoir;
    const currentDirection = directionData.currentDirection;

    const instructionsResults = followInstructions(
      currentDirection,
      currentInstructions,
      maps,
      nonEndInstructionFound,
    );

    currentInstructions = instructionsResults.newInstructions;
    nonEndInstructionFound = instructionsResults.nonEndInstructionFound;
    totalStepsArray.push(`Step!`);

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
