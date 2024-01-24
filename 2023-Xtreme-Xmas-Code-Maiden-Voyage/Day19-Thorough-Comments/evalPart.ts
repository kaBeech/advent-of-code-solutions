import calculateStepValue from "./calculateStepValue.ts";
import evalRule from "./evalRule.ts";
import evalWorkflow from "./evalWorkflow.ts";
import processDestination from "./processDestination.ts";
import { EvaluationResult, Part, Rule, Workflow } from "./types.ts";

export default (
  part: Part,
  workflow: Workflow,
  workflows: Workflow[],
  rule: Rule,
): EvaluationResult => {
  // If the part passes the rule's qualification, process the destination.
  if (evalRule(part, rule)) {
    return processDestination(
      part,
      workflows,
      rule.category,
      calculateStepValue(part, rule.category, rule.comparison, rule.value),
      rule.destination,
    );
  }
  // Otherwise, recursively evaluate the next rule in the workflow.
  return evalWorkflow(part, workflow, workflows);
};
