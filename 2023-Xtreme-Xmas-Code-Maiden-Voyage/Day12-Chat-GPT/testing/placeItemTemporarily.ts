// SEEMS GOOD

import { getAdjacentSections } from "./getAdjacentSections.ts";
import { BoxSection, Item, Sequence } from "./types.ts";

export function placeItemTemporarily(
  item: Item,
  box: BoxSection[],
  sequence: Sequence,
): void {
  item.placement_status = "temporarily placed";
  for (const boxSection of sequence.sections) {
    boxSection.contains = item.id.toString();
  }

  for (const adjacentSection of getAdjacentSections(sequence.sections, box)) {
    if (adjacentSection.contains === "unknown") {
      adjacentSection.contains = "buffer material";
    }
  }
}
