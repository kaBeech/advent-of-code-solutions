import evalWorkflow from "./evalWorkflow.ts";
import getNextPart from "./getNextPart.ts";
import parseInput from "./parseInput.ts";
import { EvaluationResult, Part, RuleInstance, Workflow } from "./types.ts";

const myFunction = (
  numberOfAcceptablePartCombinations: number,
  workflows: Workflow[],
  currentPart: Part,
  ruleStack: RuleInstance[],
) => {
  let nextStepValue = Infinity;

  while (
    nextStepValue > 0
  ) {
    // If a part is accepted, add it to the acceptedParts array.
    const result: EvaluationResult = evalWorkflow(
      currentPart,
      workflows.find((workflow) => workflow.name === `in`)!,
      workflows,
      ruleStack,
    );
    if (
      result.passes
    ) {
      numberOfAcceptablePartCombinations += result.value;
    }
    nextStepValue = result.value;
    ruleStack = result.ruleStack;

    currentPart = getNextPart(currentPart, result.category, result.value);
  }
  const result = { numberOfAcceptablePartCombinations, ruleStack };
  return result;
};

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
  let ruleStack: RuleInstance[] = [];
  let finished = 0;
  while (numberOfAcceptablePartCombinations < 3000 || finished < 3) {
    if (numberOfAcceptablePartCombinations > 3000) {
      finished += 1;
    }
    const result = myFunction(
      numberOfAcceptablePartCombinations,
      workflows,
      currentPart,
      ruleStack,
    );
    numberOfAcceptablePartCombinations =
      result.numberOfAcceptablePartCombinations;
    ruleStack = result.ruleStack;
    const ruleInstanceToPass = ruleStack.pop()!;
    currentPart = ruleInstanceToPass.partBeingProcessed;
    currentPart[ruleInstanceToPass.rule.category] =
      ruleInstanceToPass.rule.value;
    console.log(numberOfAcceptablePartCombinations);
  }

  console.log(ruleStack);
  console.log(currentPart);

  // Get the sum of all parts' rating numbers added together.

  console.log(
    `Part 2: The number of distinct combinations of acceptable ratings is ${numberOfAcceptablePartCombinations}`,
  );

  return numberOfAcceptablePartCombinations;
})();
