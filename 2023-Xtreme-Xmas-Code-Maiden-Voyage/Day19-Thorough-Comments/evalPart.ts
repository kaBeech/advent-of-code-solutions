import evalRule from "./evalRule.ts";
import { Part, Workflow } from "./types.ts";

export default (
  part: Part,
  workflow: Workflow,
  workflows: Workflow[],
): boolean => {
  for (const rule of workflow.rules) {
    if (evalRule(part, rule)) {
      switch (rule.destination) {
        case `A`:
          return true;
        case `R`:
          return false;
        default:
          return evalWorkflow(
            part,
            workflows.find((workflow) => workflow.name === rule.destination)!,
            workflows,
          );
      }
    }
  }
  return evalWorkflow(part, workflow, workflows);
};
