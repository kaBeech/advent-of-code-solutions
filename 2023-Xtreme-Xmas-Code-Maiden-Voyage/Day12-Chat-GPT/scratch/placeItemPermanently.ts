// SEEMS GOOD

import { getAdjacentSections } from "./getAdjacentSections.ts";
import { BoxSection, Item, Sequence } from "./types.ts";

export function placeItemPermanently(
  item: Item,
  box: BoxSection[],
  sequence: Sequence,
): void {
  console.log(
    `Placing item ${item.id} permanently in ${sequence.sections[0].id}`,
  );
  item.placement_status = "permanently placed";
  for (const boxSection of sequence.sections) {
    boxSection.contains = item.id.toString();
  }
  for (const adjacentSection of getAdjacentSections(sequence.sections, box)) {
    if (adjacentSection.contains === "unknown") {
      adjacentSection.contains = "buffer material";
    }
  }
}
