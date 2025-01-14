import { PassSequence } from "./types.ts";

export const comparePassSequenceEquality = (
  passSequence1: PassSequence,
  passSequence2: PassSequence,
  isAnagram?: boolean,
) => {
  if (isAnagram) {
    passSequence1.sort();
    passSequence2.sort();
  }
  if (passSequence1.length !== passSequence2.length) {
    return false;
  }
  for (let i = 0; i < passSequence1.length; i++) {
    if (passSequence1[i] !== passSequence2[i]) {
      return false;
    }
  }
  return true;
};
