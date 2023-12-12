import { parseInput } from "./parseInput.ts";
import { Instruction, Maps, PeriodicNode } from "./types.ts";
import processDirectionData from "./processDirectionData.ts";
import followInstructions from "./followInstructions.ts";
import initializePeriodicNodes from "./initializePeriodicNodes.ts";

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
  let surveyedEndingNodePathLoops: Instruction[] = [];

  while (surveyedEndingNodePathLoops.length < 6) {
    let nonEndInstructionFound = false;

    const directionData = processDirectionData(
      reservoirInUse,
      directions,
      directionsReservoir,
    );

    reservoirInUse = directionData.reservoirInUse;
    directions = directionData.processedDirections;
    directionsReservoir = directionData.processedDirectionsReservoir;
    const currentDirection = directionData.currentDirection;

    const instructionsResults = followInstructions(
      currentDirection,
      currentInstructions,
      maps,
      surveyedEndingNodePathLoops,
      nonEndInstructionFound,
    );

    currentInstructions = instructionsResults.newInstructions;
    nonEndInstructionFound = instructionsResults.nonEndInstructionFound;
    surveyedEndingNodePathLoops =
      instructionsResults.surveyedEndingNodePathLoops;
    totalStepsArray.push(`Step!`);

    if (!nonEndInstructionFound) {
      endReached = true;
    }
  }

  const stepsSpentSurveying = totalStepsArray.length;

  const { periodicNodes, harmonizedNodes } = initializePeriodicNodes(
    currentInstructions,
  );

  console.log(
    periodicNodes,
    harmonizedNodes,
  );

  console.log(
    `Part 2: The number of steps it takes before all current nodes' ids end in "Z" is: ${
      JSON.stringify(totalStepsArray.length)
    }`,
  );

  return totalStepsArray;
})();
