import evalWorkflow from "./evalWorkflow.ts";
import { Part, Workflow } from "./types.ts";

export default (
  part: Part,
  workflows: Workflow[],
  destination: string,
): boolean => {
  switch (destination) {
    case `A`:
      return true;
    case `R`:
      return false;
    default:
      return evalWorkflow(
        part,
        workflows.find((workflow) => workflow.name === destination)!,
        workflows,
      );
  }
};
