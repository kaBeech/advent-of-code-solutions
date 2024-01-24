import evalRule from "./evalRule.ts";
import processDestinationPart1 from "./processDestinationPart1.ts";
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
      return processDestinationPart1(part, workflows, rule.destination);
    }
  }
  // If the part didn't pass any rules, process the end destination.
  return processDestinationPart1(part, workflows, workflow.endDestination);
};
