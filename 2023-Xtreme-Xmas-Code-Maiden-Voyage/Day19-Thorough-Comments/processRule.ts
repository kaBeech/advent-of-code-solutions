import moveProcessedRule from "./moveProcessedRule.ts";
import {
  AcceptablePartsRange,
  EndingFilter,
  ProcessedWorkflow,
  Rule,
  Workflow,
} from "./types.ts";

export default (
  workflows: Workflow[],
  finalRule: Rule,
  processedRules: Rule[],
  unprocessedRules: Rule[],
  processedWorkflows: ProcessedWorkflow[],
  endingFilters: EndingFilter[],
  acceptablePartsRanges: AcceptablePartsRange[],
) => {
  const workflow = workflows.find((workflow) =>
    workflow.name === finalRule.workflowName
  )!;

  // Add an ending filter for each acceptable parts range.
  for (const acceptablePartsRange of acceptablePartsRanges) {
    // Filter the acceptable ranges through all rules leading up to the final rule.
    // Since we have to fail these rules to get to the final rule, we check for failing the comparisons.
    for (let i = 0; i < finalRule.index; i++) {
      const rule = workflow.rules[i];
      switch (rule.comparison) {
        case ">":
          acceptablePartsRange[rule.category].max = Math.min(
            acceptablePartsRange[rule.category].max,
            rule.value,
          );
          break;
        case "<":
          acceptablePartsRange[rule.category].min = Math.max(
            acceptablePartsRange[rule.category].min,
            rule.value,
          );
          break;
      }
    }
    // Filter the acceptable ranges through the final rule.
    switch (finalRule.comparison) {
      case ">":
        acceptablePartsRange[finalRule.category].min = Math.max(
          acceptablePartsRange[finalRule.category].min,
          finalRule.value + 1,
        );
        break;
      case "<":
        acceptablePartsRange[finalRule.category].max = Math.min(
          acceptablePartsRange[finalRule.category].max,
          finalRule.value - 1,
        );
        break;
    }

    // Add an ending filter. Set the ending filter's acceptable parts range to the filtered acceptable parts range.
    endingFilters.push({
      workflowName: workflow.name,
      index: finalRule.index,
      acceptablePartsRange,
    });
  }

  // Move the rule from the unprocessed list to the processed list and check if the workflow is completely processed.
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

  // Return the modified arrays.
  return {
    processedRules,
    unprocessedRules,
    processedWorkflows,
    endingFilters,
  };
};
