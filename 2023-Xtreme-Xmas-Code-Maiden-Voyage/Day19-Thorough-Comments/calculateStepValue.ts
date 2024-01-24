import { Category, Comparison, Part } from "./types.ts";

export default (
  part: Part,
  category: Category,
  comparison: Comparison,
  value: number,
  passes: boolean,
): number => {
  let stepValue = 0;
  if (passes) {
    if (comparison === `>`) {
      stepValue = 4000 - part[category];
    } else {
      stepValue = value - part[category];
    }
  } else {
    if (comparison === `>`) {
      stepValue = value - part[category];
    } else {
      stepValue = 4000 - part[category];
    }
  }
  return stepValue;
};
