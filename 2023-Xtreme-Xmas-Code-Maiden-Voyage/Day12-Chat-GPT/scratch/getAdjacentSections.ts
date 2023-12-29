// SEEMS GOOD

import { BoxSection } from "./types.ts";

export function getAdjacentSections(
  sequence: BoxSection[],
  box: BoxSection[],
): BoxSection[] {
  const adjacentSections: BoxSection[] = [];
  const leftAdjacent = sequence[0].id - 1;
  const rightAdjacent = sequence[sequence.length - 1].id + 1;

  if (leftAdjacent >= 0) {
    adjacentSections.push(box[leftAdjacent]);
  }

  if (rightAdjacent < box.length) {
    adjacentSections.push(box[rightAdjacent]);
  }

  return adjacentSections;
}
