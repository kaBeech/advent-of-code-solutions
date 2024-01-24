import evalRule from "./evalRule.ts";
import { Part, Rule } from "./types.ts";

export default (
  part: Part,
  rule: Rule,
): boolean => {
  // Evaluate whether the part passes the rule based on which category we're evaluating.
  switch (rule.category) {
    case `x`:
      if (evalRule(part.x, rule)) {
        return true;
      }
      break;
    case `m`:
      if (evalRule(part.m, rule)) {
        return true;
      }
      break;
    case `a`:
      if (evalRule(part.a, rule)) {
        return true;
      }
      break;
    case `s`:
      if (evalRule(part.s, rule)) {
        return true;
      }
      break;
    default:
      throw new Error(`Unknown category ${rule.category}`);
  }
  return false;
};
