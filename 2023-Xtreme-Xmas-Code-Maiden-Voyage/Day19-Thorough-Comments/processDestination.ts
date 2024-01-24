import evalWorkflow from "./evalWorkflow.ts";
import { Part, Workflow } from "./types.ts";

export default (
  part: Part,
  workflows: Workflow[],
  destination: string,
): boolean => {
  switch (destination) {
    case `A`:
      // If the destination is Accepted, return true so that the part is added to acceptedParts.
      return true;
    case `R`:
      // If the destination is Rejected, return false so that processing is halted.
      return false;
    default:
      // Otherwise, recursively evaluate the workflow that the destination refers to.
      return evalWorkflow(
        part,
        workflows.find((workflow) => workflow.name === destination)!,
        workflows,
      );
  }
};
