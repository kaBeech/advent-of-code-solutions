import { parseInput } from "./parseInput.ts";
import { Maps, PeriodicNode } from "./types.ts";
import initializePeriodicNodes from "./initializePeriodicNodes.ts";
import surveyEndingNodePathLoops from "./surveyEndingNodePathLoops.ts";
import getLeastCommonMultiple from "../../tools/mathFunctions/getLeastCommonMultiple.ts";

export default (async function (): Promise<number> {
  const maps: Maps = await parseInput();
  const instructionsCopy = maps.instructions.slice();
  const startingInstructions = instructionsCopy.filter((instruction) => {
    const idArray = instruction.id.split(``);
    const idLastChar = idArray.pop();
    return idLastChar === `A`;
  });

  const periodicNodes = surveyEndingNodePathLoops(
    startingInstructions,
    maps,
  ).sort((a, b) => {
    return a.distanceFromNextEndingNode - b.distanceFromNextEndingNode;
  });

  const periodicNodesPeriods: number[] = [];

  for (const periodicNode of periodicNodes) {
    periodicNodesPeriods.push(periodicNode.period);
  }

  const numberOfStepsUntilHarmony = getLeastCommonMultiple(
    ...periodicNodesPeriods,
  );

  console.log(
    `Part 2: The number of steps it takes before all current nodes' ids end in "Z" is: ${
      JSON.stringify(numberOfStepsUntilHarmony)
    }`,
  );

  return numberOfStepsUntilHarmony;
})();
