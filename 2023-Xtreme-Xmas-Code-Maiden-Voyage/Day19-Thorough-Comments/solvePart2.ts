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
  // Parse the input into workflows.
  const workflows = (await parseInput()).workflows;

  // Set up our arrays.
  // Since we're replacing the arrays with the values returned from the functions, we use let instead of const.
  // Paradoxically, this helps us use a more functional approach by using more pure functions.
  let unprocessedRules: Rule[] = [];
  let processedRules: Rule[] = [];
  let processedWorkflows: ProcessedWorkflow[] = [];
  let endingFilters: EndingFilter[] = [];

  // Populate rules from each workflow.
  for (
    const workflow of workflows
  ) {
    unprocessedRules.push(...workflow.rules);
    const finalRule = workflow.rules[workflow.rules.length - 1];

    // Add the ending condition as a rule.
    let endingComparison: Comparison;
    let endingValue = finalRule.value;
    // The ending condition has the opposite comparison of the final rule.
    // Since we didn't build in >= or <= comparisons, we instead add or subtract 1 from the value.
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

  // Process all rules with a Rejected destination.
  // Since there are no acceptablePartsRanges in these rules, we can move them immediately without another processing step.
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

    // Update our arrays.
    processedRules = moveProcessedRuleResult.processedRules;
    unprocessedRules = moveProcessedRuleResult.unprocessedRules;
    processedWorkflows = moveProcessedRuleResult.processedWorkflows;
  }

  // Process all rules with an Accepted destination.
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
      // Since there are no acceptablePartsRanges in these rules, we use a completely open acceptablePartsRange.
      [{
        x: { min: 1, max: 4000 },
        m: { min: 1, max: 4000 },
        a: { min: 1, max: 4000 },
        s: { min: 1, max: 4000 },
      }],
    );

    // Update our arrays.
    processedRules = processRuleResult.processedRules;
    unprocessedRules = processRuleResult.unprocessedRules;
    processedWorkflows = processRuleResult.processedWorkflows;
    endingFilters = processRuleResult.endingFilters;
  }

  // Process all rules with destinations pointing to other workflows
  while (unprocessedRules.length > 0) {
    // Get all rules with destinations pointing to processed workflows.
    const rulesToBeProcessed = unprocessedRules.filter((rule) =>
      processedWorkflows.find((processedWorkflow) =>
        processedWorkflow.name === rule.destination
      ) !== undefined
    );

    // Process all rules with destinations pointing to processed workflows.
    for (const finalRule of rulesToBeProcessed) {
      const endingFiltersMatchingWorkflowName = endingFilters.filter((
        endingFilter,
      ) => endingFilter.workflowName === finalRule.destination)!;
      const acceptablePartsRanges: AcceptablePartsRange[] = [];

      // Add all acceptable parts ranges from the ending filters to the acceptable parts ranges array
      for (const endingFilter of endingFiltersMatchingWorkflowName) {
        acceptablePartsRanges.push({
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
        });
      }

      // Process the rule.
      const processRuleResult = processRule(
        workflows,
        finalRule,
        processedRules,
        unprocessedRules,
        processedWorkflows,
        endingFilters,
        acceptablePartsRanges,
      );

      // Update our arrays.
      processedRules = processRuleResult.processedRules;
      unprocessedRules = processRuleResult.unprocessedRules;
      processedWorkflows = processRuleResult.processedWorkflows;
      endingFilters = processRuleResult.endingFilters;
    }
  }

  // Get the entrypoint workflow.
  const entry = processedWorkflows.find((processedWorkflow) =>
    processedWorkflow.name === `in`
  )!;

  // Count the number of distinct combinations of acceptable ratings.
  let numberOfAcceptablePartCombinations = 0;
  for (const acceptablePartsRange of entry.acceptablePartsRanges) {
    const xRange = acceptablePartsRange.x.max - acceptablePartsRange.x.min +
      1;
    const mRange = acceptablePartsRange.m.max - acceptablePartsRange.m.min +
      1;
    const aRange = acceptablePartsRange.a.max - acceptablePartsRange.a.min +
      1;
    const sRange = acceptablePartsRange.s.max - acceptablePartsRange.s.min +
      1;
    numberOfAcceptablePartCombinations += xRange * mRange * aRange * sRange;
  }

  // Log the result.
  console.log(
    `Part 2: The number of distinct combinations of acceptable ratings is ${numberOfAcceptablePartCombinations} of ${
      4000 ** 4
    }`,
  );

  // Return the result.
  return numberOfAcceptablePartCombinations;
})();
