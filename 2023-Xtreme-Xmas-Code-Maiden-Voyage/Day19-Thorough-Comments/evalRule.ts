import evalRuleByCategory from "./evalRuleByCategory.ts";
import { Part, Rule } from "./types.ts";

export default (
  part: Part,
  rule: Rule,
): boolean => {
  // Evaluate whether the part passes the rule based on which category we're evaluating.
  switch (rule.category) {
    case `x`:
      if (evalRuleByCategory(part.x, rule)) {
        return true;
      }
      break;
    case `m`:
      if (evalRuleByCategory(part.m, rule)) {
        return true;
      }
      break;
    case `a`:
      if (evalRuleByCategory(part.a, rule)) {
        return true;
      }
      break;
    case `s`:
      if (evalRuleByCategory(part.s, rule)) {
        return true;
      }
      break;
    default:
      throw new Error(`Unknown category ${rule.category}`);
  }
  return false;
};
