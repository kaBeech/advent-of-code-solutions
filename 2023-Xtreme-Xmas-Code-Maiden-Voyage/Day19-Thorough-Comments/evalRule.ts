import { Part, Rule } from "./types.ts";

export default (part: Part, rule: Rule): boolean => {
  // Evaluate whether the part passes the rule based on the rule's comparison value.
  if (rule.comparison === `>`) {
    return part[rule.category] > rule.value;
  } else {
    return part[rule.category] < rule.value;
  }
};
