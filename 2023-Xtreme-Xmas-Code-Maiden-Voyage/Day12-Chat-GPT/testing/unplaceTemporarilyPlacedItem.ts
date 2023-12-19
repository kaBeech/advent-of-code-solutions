import { getAdjacentSections } from "./getAdjacentSections.ts";
import { BoxSection, Item } from "./types.ts";

export function unplaceTemporarilyPlacedItem(
  item: Item,
  box: BoxSection[],
  sequence: BoxSection[],
): void {
  item.placement_status = "unplaced";
  for (const boxSection of sequence) {
    if (boxSection.originally_unknown) {
      boxSection.contains = "unknown";
    } else {
      boxSection.contains = "empty";
    }
  }

  for (const adjacentSection of getAdjacentSections(sequence, box)) {
    if (adjacentSection.originally_unknown) {
      adjacentSection.contains = "unknown";
    }
  }
}
