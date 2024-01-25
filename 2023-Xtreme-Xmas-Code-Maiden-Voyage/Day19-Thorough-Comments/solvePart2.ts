import parseInput from "./parseInput.ts";
import {
  AcceptablePartsRange,
  Comparison,
  EndingFilter,
  Rule,
} from "./types.ts";

export default (async function (): Promise<number> {
  // Parse the input into workflows and parts.
  const workflows = (await parseInput()).workflows;

  const unprocessedRules: Rule[] = [];
  const endingFilters: EndingFilter[] = [];

  // Evaluate each part and make a list of the accepted parts.
  let numberOfAcceptablePartCombinations = 0;
  for (
    const workflow of workflows
  ) {
    unprocessedRules.push(...workflow.rules);
    const finalRule = workflow.rules[workflow.rules.length - 1];
    let endingComparison: Comparison;
    let endingValue = finalRule.value;
    if (finalRule.comparison === `>`) {
      endingComparison = `<`;
      endingValue += 1;
    } else {
      endingComparison = `>`;
      endingValue -= 1;
    }
    const endingCondition = {
      workflowName: workflow.name,
      index: workflow.rules.length,
      category: finalRule.category,
      comparison: endingComparison,
      value: 0,
      destination: workflow.endDestination,
    };
    unprocessedRules.push(endingCondition);

    if (workflow.endDestination === `A`) {
      // Do something.
    }

    console.log(numberOfAcceptablePartCombinations);
  }

  // process all rules with destination A
  const rulesWithDestinationA = unprocessedRules.filter((rule) =>
    rule.destination === `A`
  );
  for (const finalRule of rulesWithDestinationA) {
    const workflow = workflows.find((workflow) =>
      workflow.name === finalRule.workflowName
    )!;
    const acceptablePartsRange: AcceptablePartsRange = {
      x: { min: 1, max: 4000 },
      m: { min: 1, max: 4000 },
      a: { min: 1, max: 4000 },
      s: { min: 1, max: 4000 },
    };
    for (let i = 0; i < finalRule.index; i++) {
      const rule = workflow.rules[i];
      switch (rule.comparison) {
        case ">":
          acceptablePartsRange[rule.category].max = rule.value;
          break;
        case "<":
          acceptablePartsRange[rule.category].min = rule.value;
          break;
      }
    }
    switch (finalRule.comparison) {
      case ">":
        acceptablePartsRange[finalRule.category].min = finalRule.value + 1;
        break;
      case "<":
        acceptablePartsRange[finalRule.category].max = finalRule.value - 1;
        break;
    }
    endingFilters.push({
      workflowName: workflow.name,
      index: finalRule.index,
      acceptablePartsRange,
    });
    unprocessedRules.splice(unprocessedRules.indexOf(finalRule), 1);
  }

  // Get the sum of all parts' rating numbers added together.

  console.log(
    `Part 2: The number of distinct combinations of acceptable ratings is ${numberOfAcceptablePartCombinations}`,
  );

  return numberOfAcceptablePartCombinations;
})();
