import evalRule from "./evalRule.ts";
import processDestination from "./processDestination.ts";
import { Part, Workflow } from "./types.ts";

export default (
  part: Part,
  workflow: Workflow,
  workflows: Workflow[],
): boolean => {
  for (const rule of workflow.rules) {
    if (evalRule(part, rule)) {
      return processDestination(part, workflows, rule.destination);
    }
  }
  return processDestination(part, workflows, workflow.endDestination);
};
