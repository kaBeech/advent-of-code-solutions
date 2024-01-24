import { Rule } from "./types.ts";

export default (partValue: number, rule: Rule): boolean => {
  if (rule.comparison === `>`) {
    return partValue > rule.value;
  } else {
    return partValue < rule.value;
  }
};
