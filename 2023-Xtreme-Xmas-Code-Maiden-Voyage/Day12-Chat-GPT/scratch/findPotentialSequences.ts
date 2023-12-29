// SEEMS OK FOR NOW BUT REMEMBER TO REFACTOR SO THE EMPTY SECTIONS GET PLACED INTO FIRST

import { getAdjacentSections } from "./getAdjacentSections.ts";
import { BoxSection, Sequence } from "./types.ts";

export function findPotentialSequences(
  length: number,
  box: BoxSection[],
): Sequence[] {
  const potentialSequences: Sequence[] = [];

  for (const boxSection1 of box) {
    let sequenceBroken = false;
    const currentSequence: Sequence = {
      sections: [],
      allEmpty: false,
    };
    if (
      boxSection1.contains === "empty" || boxSection1.contains === "unknown"
    ) {
      currentSequence.sections.push(boxSection1);
      if (currentSequence.sections.length === length) {
        const adjacentSections = getAdjacentSections(
          currentSequence.sections,
          box,
        );
        if (
          adjacentSections.length === 0 ||
          (adjacentSections.every((section) =>
            section.contains === "unknown" ||
            section.contains === "buffer material"
          ))
        ) {
          if (
            currentSequence.sections.every((section) =>
              section.contains === "empty"
            )
          ) {
            currentSequence.allEmpty = true;
          }
          potentialSequences.push(currentSequence);
        }
      } else {
        for (const boxSection2 of box) {
          if (
            boxSection2.id > boxSection1.id &&
            sequenceBroken === false &&
            (boxSection2.contains === "empty" ||
              boxSection2.contains === "unknown")
          ) {
            currentSequence.sections.push(boxSection2);
            const adjacentSections = getAdjacentSections(
              currentSequence.sections,
              box,
            );
            if (
              currentSequence.sections.length === length &&
              (adjacentSections.length === 0 ||
                (adjacentSections.every((section) =>
                  section.contains === "unknown" ||
                  section.contains === "buffer material"
                )))
            ) {
              if (
                currentSequence.sections.every((section) =>
                  section.contains === "empty"
                )
              ) {
                currentSequence.allEmpty = true;
              }
              potentialSequences.push(currentSequence);
              sequenceBroken = true;
            }
          } else if (boxSection2.id > boxSection1.id) {
            sequenceBroken = true;
          }
        }
      }
    }
  }

  return potentialSequences;
}
