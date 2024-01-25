import {
  AcceptablePartsRange,
  EndingFilter,
  ProcessedWorkflow,
  Rule,
  Workflow,
} from "./types.ts";

export default (
  ruleBeingProcessed: Rule,
  processedRules: Rule[],
  unprocessedRules: Rule[],
  workflows: Workflow[],
  processedWorkflows: ProcessedWorkflow[],
  endingFilters: EndingFilter[],
) => {
  processedRules.push(
    unprocessedRules.splice(unprocessedRules.indexOf(ruleBeingProcessed), 1)[0],
  );

  const finalRuleWorkflow = workflows.find((workflow) =>
    workflow.name === ruleBeingProcessed.workflowName
  )!;
  const processedRulesInWorkflow = processedRules.filter((rule) =>
    rule.workflowName === ruleBeingProcessed.workflowName
  );
  if (
    processedRulesInWorkflow.length === finalRuleWorkflow.rules.length + 1
  ) {
    const acceptablePartsRanges: AcceptablePartsRange[] = [];

    const ruleEndingFilters = processedRulesInWorkflow.map((rule) =>
      endingFilters.filter((endingFilter) =>
        endingFilter.workflowName === rule.workflowName &&
        endingFilter.index === rule.index
      )
    ).flat().filter((endingFilter) => endingFilter !== undefined);
    for (const endingFilter of ruleEndingFilters) {
      if (endingFilter!.acceptablePartsRange !== null) {
        acceptablePartsRanges.push(
          endingFilter!.acceptablePartsRange,
        );
      }
    }

    processedWorkflows.push({
      name: ruleBeingProcessed.workflowName,
      acceptablePartsRanges,
    });
  }

  return {
    processedRules,
    unprocessedRules,
    processedWorkflows,
  };
};
