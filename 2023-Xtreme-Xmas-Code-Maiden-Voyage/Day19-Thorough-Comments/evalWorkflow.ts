import calculateStepValue from "./calculateStepValue.ts";
import evalRule from "./evalRule.ts";
import processDestination from "./processDestination.ts";
import { EvaluationResult, Part, RuleInstance, Workflow } from "./types.ts";

export default (
  part: Part,
  workflow: Workflow,
  workflows: Workflow[],
  ruleStack: RuleInstance[],
): EvaluationResult => {
  // Evaluate the part against each rule in the workflow.
  for (const rule of workflow.rules) {
    // If the part passes the rule's qualification, process the destination and don't evaluate any more rules.
    if (evalRule(part, rule)) {
      if (
        !ruleStack.find((ruleInstance) => ruleInstance.rule === rule) &&
        rule.destination !== `A` &&
        rule.destination !== `R`
      ) {
        // console.log(ruleStack);
        // console.log(
        //   ruleStack.find((ruleInstance) => ruleInstance.rule === rule),
        // );
        ruleStack.push({
          rule,
          partBeingProcessed: { x: part.x, m: part.m, a: part.a, s: part.s },
        });
        // console.log(ruleStack);
      } else {
        // console.log(
        //   ruleStack.find((ruleInstance) => ruleInstance.rule === rule),
        // );
      }
      const result = processDestination(
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
        ruleStack,
      );
      if (result.value > 0) {
        return result;
      } else {
        // console.log(ruleStack);
        return result;
      }
    } else if (
      rule.comparison === `>` &&
      !ruleStack.find((ruleInstance) => ruleInstance.rule === rule)
    ) {
      // console.log(ruleStack);
      // console.log(
      //   ruleStack.find((ruleInstance) => ruleInstance.rule === rule),
      // );
      ruleStack.push({
        rule,
        partBeingProcessed: { x: part.x, m: part.m, a: part.a, s: part.s },
      });
      // console.log(ruleStack);
    } else {
      // console.log(
      //   ruleStack.find((ruleInstance) => ruleInstance.rule === rule),
      // );
    }
  }

  // If the part didn't pass any rules, process the end destination without adding to any categories.
  const endRule = workflow.rules[workflow.rules.length - 1];
  // console.log(endRule);
  const result = processDestination(
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
    // [...ruleStack, endRule],
    ruleStack,
  );
  if (result.value > 0) {
    return result;
  } else {
    // console.log(ruleStack);
    return result;
  }
};
