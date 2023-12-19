import { BoxSection } from "./types.ts";

export function findPotentialSequences(
  length: number,
  box: BoxSection[],
): BoxSection[][] {
  const potentialSequences: BoxSection[][] = [];
  let currentSequence: BoxSection[] = [];

  for (const _boxSection1 of box) {
    for (const boxSection2 of box) {
      if (
        boxSection2.contains === "empty" || boxSection2.contains === "unknown"
      ) {
        currentSequence.push(boxSection2);

        if (currentSequence.length === length) {
          potentialSequences.push(currentSequence);
          break; // Add only the first potential sequence
        }
      } else {
        currentSequence = [];
      }
    }
  }

  return potentialSequences;
}
