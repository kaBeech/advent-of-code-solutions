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
  if (acceptablePartsRanges.length === 0) {
    endingFilters.push({
      workflowName: workflow.name,
      index: finalRule.index,
      acceptablePartsRange: null,
    });
  } else {
    for (const acceptablePartsRange of acceptablePartsRanges) {
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
      if (finalRule.destination === `R`) {
        endingFilters.push({
          workflowName: workflow.name,
          index: finalRule.index,
          acceptablePartsRange: null,
        });
      } else {
        endingFilters.push({
          workflowName: workflow.name,
          index: finalRule.index,
          acceptablePartsRange,
        });
      }
    }
  }
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
  return {
    processedRules,
    unprocessedRules,
    processedWorkflows,
    endingFilters,
  };
};
