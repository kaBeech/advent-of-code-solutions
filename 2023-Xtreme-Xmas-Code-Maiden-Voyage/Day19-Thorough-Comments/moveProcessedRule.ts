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
  // Move the rule from the unprocessed list to the processed list.
  processedRules.push(
    unprocessedRules.splice(unprocessedRules.indexOf(ruleBeingProcessed), 1)[0],
  );

  // Record the workflow and processed rules in that workflow to use as shorthand later.
  const finalRuleWorkflow = workflows.find((workflow) =>
    workflow.name === ruleBeingProcessed.workflowName
  )!;
  const processedRulesInWorkflow = processedRules.filter((rule) =>
    rule.workflowName === ruleBeingProcessed.workflowName
  );

  // If all rules in the workflow have been processed, process the workflow.
  // We add 1 to the length of the processed rules for the ending condition.
  if (
    processedRulesInWorkflow.length === finalRuleWorkflow.rules.length + 1
  ) {
    const acceptablePartsRanges: AcceptablePartsRange[] = [];

    // Get all ending filters for the workflow
    const ruleEndingFilters = processedRulesInWorkflow.map((rule) =>
      endingFilters.filter((endingFilter) =>
        endingFilter.workflowName === rule.workflowName &&
        endingFilter.index === rule.index
      )
    ).flat();
    // Add all acceptable parts ranges from the ending filters to the acceptable parts ranges array.
    for (const endingFilter of ruleEndingFilters) {
      if (endingFilter!.acceptablePartsRange !== null) {
        acceptablePartsRanges.push(
          endingFilter!.acceptablePartsRange,
        );
      }
    }

    // Add the workflow to the processed workflows array.
    processedWorkflows.push({
      name: ruleBeingProcessed.workflowName,
      acceptablePartsRanges,
    });
  }

  // Return the modified arrays.
  return {
    processedRules,
    unprocessedRules,
    processedWorkflows,
  };
};
