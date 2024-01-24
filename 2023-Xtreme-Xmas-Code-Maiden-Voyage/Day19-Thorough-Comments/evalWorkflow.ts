import calculateStepValue from "./calculateStepValue.ts";
import evalRule from "./evalRule.ts";
import processDestination from "./processDestination.ts";
import { EvaluationResult, Part, Workflow } from "./types.ts";

export default (
  part: Part,
  workflow: Workflow,
  workflows: Workflow[],
): EvaluationResult => {
  // Evaluate the part against each rule in the workflow.
  for (const rule of workflow.rules) {
    // If the part passes the rule's qualification, process the destination and don't evaluate any more rules.
    if (evalRule(part, rule)) {
      return processDestination(
        part,
        workflows,
        rule.category,
        calculateStepValue(
          part,
          rule.category,
          rule.comparison,
          rule.value,
          true,
        ),
        rule.destination,
      );
    }
  }
  // If the part didn't pass any rules, process the end destination without adding to any categories.
  const endRule = workflow.rules[workflow.rules.length - 1];
  // console.log(endRule);
  return processDestination(
    part,
    workflows,
    endRule.category,
    calculateStepValue(
      part,
      endRule.category,
      endRule.comparison,
      endRule.value,
      false,
    ),
    workflow.endDestination,
  );
};
