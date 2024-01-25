import moveProcessedRule from "./moveProcessedRule.ts";
import parseInput from "./parseInput.ts";
import processRule from "./processRule.ts";
import {
  AcceptablePartsRange,
  Comparison,
  EndingFilter,
  ProcessedWorkflow,
  Rule,
} from "./types.ts";

export default (async function (): Promise<number> {
  // Parse the input into workflows and parts.
  const workflows = (await parseInput()).workflows;

  let unprocessedRules: Rule[] = [];
  let processedRules: Rule[] = [];
  let processedWorkflows: ProcessedWorkflow[] = [];
  let endingFilters: EndingFilter[] = [];

  // Evaluate each part and make a list of the accepted parts.
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
      value: endingValue,
      destination: workflow.endDestination,
    };
    unprocessedRules.push(endingCondition);
  }

  // Process all rules with destination R
  const rulesWithDestinationR = unprocessedRules.filter((rule) =>
    rule.destination === `R`
  );
  for (const finalRule of rulesWithDestinationR) {
    const moveProcessedRuleResult = moveProcessedRule(
      finalRule,
      processedRules,
      unprocessedRules,
      workflows,
      processedWorkflows,
      endingFilters,
    );
    processedRules = moveProcessedRuleResult.processedRules;
    unprocessedRules = moveProcessedRuleResult.unprocessedRules;
    processedWorkflows = moveProcessedRuleResult.processedWorkflows;
  }

  // Process all rules with destination A
  const rulesWithDestinationA = unprocessedRules.filter((rule) =>
    rule.destination === `A`
  );
  for (const finalRule of rulesWithDestinationA) {
    const processRuleResult = processRule(
      workflows,
      finalRule,
      processedRules,
      unprocessedRules,
      processedWorkflows,
      endingFilters,
      {
        x: { min: 1, max: 4000 },
        m: { min: 1, max: 4000 },
        a: { min: 1, max: 4000 },
        s: { min: 1, max: 4000 },
      },
    );
    processedRules = processRuleResult.processedRules;
    unprocessedRules = processRuleResult.unprocessedRules;
    processedWorkflows = processRuleResult.processedWorkflows;
    endingFilters = processRuleResult.endingFilters;
  }

  // Process all rules with destination other than A or R
  // while (unprocessedRules.length > 0) {
  const rulesToBeProcessed = unprocessedRules.filter((rule) =>
    processedWorkflows.find((processedWorkflow) =>
      processedWorkflow.name === rule.destination
    ) !== undefined
  );
  // console.log(rulesToBeProcessed);
  for (const finalRule of rulesToBeProcessed) {
    const endingFilter = endingFilters.find((endingFilter) =>
      endingFilter.workflowName === finalRule.destination &&
      endingFilter.index === finalRule.index
    )!;
    let acceptablePartsRange: AcceptablePartsRange | null;
    if (
      endingFilter === undefined || endingFilter.acceptablePartsRange === null
    ) {
      acceptablePartsRange = null;
    } else {
      acceptablePartsRange = {
        x: {
          min: endingFilter.acceptablePartsRange.x.min,
          max: endingFilter.acceptablePartsRange.x.max,
        },
        m: {
          min: endingFilter.acceptablePartsRange.m.min,
          max: endingFilter.acceptablePartsRange.m.max,
        },
        a: {
          min: endingFilter.acceptablePartsRange.a.min,
          max: endingFilter.acceptablePartsRange.a.max,
        },
        s: {
          min: endingFilter.acceptablePartsRange.s.min,
          max: endingFilter.acceptablePartsRange.s.max,
        },
      };
    }
    const processRuleResult = processRule(
      workflows,
      finalRule,
      processedRules,
      unprocessedRules,
      processedWorkflows,
      endingFilters,
      acceptablePartsRange,
    );
    processedRules = processRuleResult.processedRules;
    unprocessedRules = processRuleResult.unprocessedRules;
    processedWorkflows = processRuleResult.processedWorkflows;
    endingFilters = processRuleResult.endingFilters;
  }
  // }

  console.log(processedWorkflows);

  // const entry = processedWorkflows.find((processedWorkflow) =>
  //   processedWorkflow.name === `in`
  // )!;

  let numberOfAcceptablePartCombinations = 0;
  // for (const acceptablePartsRange of entry.acceptablePartsRanges) {
  //   const xRange = acceptablePartsRange.x.max - acceptablePartsRange.x.min +
  //     1;
  //   const mRange = acceptablePartsRange.m.max - acceptablePartsRange.m.min +
  //     1;
  //   const aRange = acceptablePartsRange.a.max - acceptablePartsRange.a.min +
  //     1;
  //   const sRange = acceptablePartsRange.s.max - acceptablePartsRange.s.min +
  //     1;
  //   numberOfAcceptablePartCombinations += xRange * mRange * aRange * sRange;
  // }

  console.log(
    `Part 2: The number of distinct combinations of acceptable ratings is ${numberOfAcceptablePartCombinations} of ${
      4000 ** 4
    }`,
  );

  return numberOfAcceptablePartCombinations;
})();
