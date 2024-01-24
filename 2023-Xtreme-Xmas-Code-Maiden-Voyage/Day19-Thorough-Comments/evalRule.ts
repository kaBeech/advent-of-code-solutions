import { Rule } from "./types.ts";

export default (partValue: number, rule: Rule): boolean => {
  // Evaluate whether the part passes the rule based on the rule's comparison value.
  if (rule.comparison === `>`) {
    return partValue > rule.value;
  } else {
    return partValue < rule.value;
  }
};
