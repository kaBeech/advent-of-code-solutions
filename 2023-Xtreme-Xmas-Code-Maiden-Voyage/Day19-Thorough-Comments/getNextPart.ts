import { EvaluationResult, Part } from "./types.ts";

export default (
  currentPart: Part,
  evaluationResult: EvaluationResult,
): Part => {
  // Skip all consecutive parts that would give the same result as the current part.
  switch (evaluationResult.category) {
    case `x`:
      // If the category is x, add the value to the part's x value.
      currentPart.x += evaluationResult.value;
      break;
    case `m`:
      // If the category is m, add the value to the part's m value.
      currentPart.m += evaluationResult.value;
      break;
    case `a`:
      // If the category is a, add the value to the part's a value.
      currentPart.a += evaluationResult.value;
      break;
    case `s`:
      // If the category is s, add the value to the part's s value.
      currentPart.s += evaluationResult.value;
      break;
  }
  return currentPart;
};
