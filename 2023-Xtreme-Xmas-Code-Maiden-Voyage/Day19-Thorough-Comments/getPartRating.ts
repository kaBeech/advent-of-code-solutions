import { Part } from "./types.ts";

export default (
  part: Part,
): number => {
  // Add the values of all the part's categories together and return the result.
  return +part.x + +part.m + +part.a + +part.s;
};
