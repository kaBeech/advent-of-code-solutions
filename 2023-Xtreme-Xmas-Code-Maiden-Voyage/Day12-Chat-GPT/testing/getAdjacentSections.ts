import { BoxSection } from "./types.ts";

export function getAdjacentSections(
  sequence: BoxSection[],
  box: BoxSection[],
): BoxSection[] {
  const adjacentSections: BoxSection[] = [];
  for (const boxSection of sequence) {
    const leftAdjacent = boxSection.id - 1;
    const rightAdjacent = boxSection.id + 1;

    if (leftAdjacent >= 0) {
      adjacentSections.push(box[leftAdjacent]);
    }

    if (rightAdjacent < box.length) {
      adjacentSections.push(box[rightAdjacent]);
    }
  }

  return adjacentSections;
}
