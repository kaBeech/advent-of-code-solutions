import evalWorkflow from "./evalWorkflow.ts";
import getNextPart from "./getNextPart.ts";
import parseInput from "./parseInput.ts";
import { EvaluationResult } from "./types.ts";

export default (async function (): Promise<number> {
  // Parse the input into workflows and parts.
  const workflows = (await parseInput()).workflows;

  let currentPart = {
    x: 1,
    m: 1,
    a: 1,
    s: 1,
  };

  // Evaluate each part and make a list of the accepted parts.
  let numberOfAcceptablePartCombinations = 0;
  while (
    currentPart.x < 4000 || currentPart.m < 4000 || currentPart.a < 4000 ||
    currentPart.s < 4000
  ) {
    // If a part is accepted, add it to the acceptedParts array.
    const result: EvaluationResult = evalWorkflow(
      currentPart,
      workflows.find((workflow) => workflow.name === `in`)!,
      workflows,
    );
    if (
      result.passes
    ) {
      numberOfAcceptablePartCombinations += result.value;
    }
    currentPart = getNextPart(currentPart, result);
    if (currentPart.s === 4000) {
      currentPart.s = 1;
      if (currentPart.a === 4000) {
        currentPart.a = 1;
        if (currentPart.m === 4000) {
          currentPart.m = 1;
          currentPart.x++;
        } else {
          currentPart.m++;
        }
      } else {
        currentPart.a++;
      }
    } else {
      currentPart.s++;
    }
  }

  // Get the sum of all parts' rating numbers added together.

  console.log(
    `Part 2: The number of distinct combinations of acceptable ratings is ${numberOfAcceptablePartCombinations}`,
  );

  return numberOfAcceptablePartCombinations;
})();
