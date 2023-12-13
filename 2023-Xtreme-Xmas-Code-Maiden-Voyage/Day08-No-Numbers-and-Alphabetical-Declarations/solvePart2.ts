import parseInput from "./parseInput.ts";
import { TypeMaps } from "./types.ts";
import surveyEndingNodePathLoops from "./surveyEndingNodePathLoops.ts";
import getLeastCommonMultiple from "../../tools/mathFunctions/getLeastCommonMultiple.ts";

// If you have crazy high memory available, you may be able to make Part 2 work
// without numbers as well. Just use getLeastCommonMultipleWithoutNumbers() instead
// of getLeastCommonMultiple()

export default (async function (): Promise<number> {
  const allTheMaps: TypeMaps = await parseInput();
  const allTheMapsInstructionsCopy = allTheMaps.instructions.slice();
  const allTheMapsStartingInstructions = allTheMapsInstructionsCopy.filter(
    (Typeinstruction) => {
      const arrayOfIds = Typeinstruction.id.split(``);
      const arrayOfIdsLastChar = arrayOfIds.pop();
      return arrayOfIdsLastChar === `A`;
    },
  );

  const arrayOfPeriodicNodes = surveyEndingNodePathLoops(
    allTheMapsStartingInstructions,
    allTheMaps,
  );

  const arrayOfPeriodicNodePeriods: number[] = [];

  for (const aSinglePeriodicNode of arrayOfPeriodicNodes) {
    arrayOfPeriodicNodePeriods.push(aSinglePeriodicNode.period.length);
  }

  const aSumOfStepsUntilHarmony = getLeastCommonMultiple(
    ...arrayOfPeriodicNodePeriods,
  );

  console.log(
    `Part 2: The number of steps it takes before all current nodes' ids end in "Z" is: ${aSumOfStepsUntilHarmony}`,
  );

  return aSumOfStepsUntilHarmony;
})();
