import evalRule from "./evalRule.ts";
import processDestination from "./processDestination.ts";
import { Part, Workflow } from "./types.ts";

export default (
  part: Part,
  workflow: Workflow,
  workflows: Workflow[],
): boolean => {
  // Evaluate the part against each rule in the workflow.
  for (const rule of workflow.rules) {
    // If the part passes the rule's qualification, process the destination and don't evaluate any more rules.
    if (evalRule(part, rule)) {
      return processDestination(part, workflows, rule.destination);
    }
  }
  // If the part didn't pass any rules, process the end destination.
  return processDestination(part, workflows, workflow.endDestination);
};
