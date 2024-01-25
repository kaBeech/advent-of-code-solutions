import evalWorkflow from "./evalWorkflow.ts";
import {
  Category,
  EvaluationResult,
  Part,
  RuleInstance,
  Workflow,
} from "./types.ts";

export default (
  part: Part,
  workflows: Workflow[],
  category: Category,
  value: number,
  destination: string,
  ruleStack: RuleInstance[],
): EvaluationResult => {
  // if (part.x < 4000) {
  console.log(
    ` ${JSON.stringify(part)} ${category} ${value} ${destination}`,
  );
  // }
  switch (destination) {
    case `A`:
      // If the destination is Accepted, return true so that the part is added to acceptedParts.
      // console.count();
      return {
        category,
        value,
        passes: true,
        ruleStack,
        lastPartProcessed: part,
      };
    case `R`:
      // If the destination is Rejected, return false so that processing is halted.

      return {
        category,
        value,
        passes: false,
        ruleStack,
        lastPartProcessed: part,
      };
    default:
      // Otherwise, recursively evaluate the workflow that the destination refers to.
      return evalWorkflow(
        part,
        workflows.find((workflow) => workflow.name === destination)!,
        workflows,
        ruleStack,
      );
  }
};
