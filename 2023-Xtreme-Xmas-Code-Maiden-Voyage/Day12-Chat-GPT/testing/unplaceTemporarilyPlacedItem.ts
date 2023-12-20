// SEEMS GOOD

import { getAdjacentSections } from "./getAdjacentSections.ts";
import { BoxSection, Item, Sequence } from "./types.ts";

export function unplaceTemporarilyPlacedItem(
  item: Item,
  box: BoxSection[],
  sequence: Sequence,
): void {
  // console.log(`Unplacing item ${item.id}`);
  item.placement_status = "unplaced";
  for (const boxSection of sequence.sections) {
    if (boxSection.originally_unknown) {
      boxSection.contains = "unknown";
    } else {
      boxSection.contains = "empty";
    }
  }

  for (const adjacentSection of getAdjacentSections(sequence.sections, box)) {
    if (adjacentSection.originally_unknown) {
      adjacentSection.contains = "unknown";
    }
  }
}
