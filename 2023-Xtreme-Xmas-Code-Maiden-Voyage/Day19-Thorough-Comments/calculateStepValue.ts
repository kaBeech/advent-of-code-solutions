import { Category, Comparison, Part } from "./types.ts";

export default (
  part: Part,
  category: Category,
  comparison: Comparison,
  value: number,
): number => {
  // Evaluate whether the part passes the rule based on the rule's comparison value.
  if (comparison === `>`) {
    return 4000 - part[category];
  } else {
    return value - part[category];
  }
};
