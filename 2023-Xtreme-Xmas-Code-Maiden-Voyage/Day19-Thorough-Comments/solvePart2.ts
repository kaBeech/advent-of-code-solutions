import parseInput from "./parseInput.ts";
import {
  AcceptablePartsRange,
  Comparison,
  EndingFilter,
  ProcessedWorkflow,
  Rule,
  Workflow,
} from "./types.ts";

const processRule = (
  workflows: Workflow[],
  finalRule: Rule,
  processedRules: Rule[],
  unprocessedRules: Rule[],
  processedWorkflows: ProcessedWorkflow[],
  endingFilters: EndingFilter[],
  acceptablePartsRange: AcceptablePartsRange | null,
) => {
  const workflow = workflows.find((workflow) =>
    workflow.name === finalRule.workflowName
  )!;
  if (acceptablePartsRange === null) {
    endingFilters.push({
      workflowName: workflow.name,
      index: finalRule.index,
      acceptablePartsRange: null,
    });
  } else {
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

const moveProcessedRule = (
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
      endingFilters.find((endingFilter) =>
        endingFilter.workflowName === rule.workflowName &&
        endingFilter.index === rule.index
      )
    ).filter((endingFilter) => endingFilter !== undefined);
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

  while (unprocessedRules.length > 0) {
    const rulesToBeProcessed = unprocessedRules.filter((rule) =>
      processedWorkflows.find((processedWorkflow) =>
        processedWorkflow.name === rule.destination
      ) !== undefined
    );
    for (const finalRule of rulesToBeProcessed) {
      const endingFilter = endingFilters.find((endingFilter) =>
        endingFilter.workflowName === finalRule.destination
      )!;
      let acceptablePartsRange: AcceptablePartsRange | null;
      if (endingFilter === undefined) {
        acceptablePartsRange = {
          x: { min: 1, max: 4000 },
          m: { min: 1, max: 4000 },
          a: { min: 1, max: 4000 },
          s: { min: 1, max: 4000 },
        };
      } else {
        acceptablePartsRange = endingFilter.acceptablePartsRange;
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
  }

  console.log(processedWorkflows);

  const entry = processedWorkflows.find((processedWorkflow) =>
    processedWorkflow.name === `in`
  )!;

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

  console.log(
    `Part 2: The number of distinct combinations of acceptable ratings is ${numberOfAcceptablePartCombinations} of ${
      4000 ** 4
    }`,
  );

  return numberOfAcceptablePartCombinations;
})();
