import { getAdjacentSections } from "./getAdjacentSections.ts";
import { BoxSection, Item } from "./types.ts";

export function placeItemTemporarily(
  item: Item,
  box: BoxSection[],
  sequence: BoxSection[],
): void {
  item.placement_status = "temporarily placed";
  for (const boxSection of sequence) {
    boxSection.contains = item.id.toString();
  }

  for (const adjacentSection of getAdjacentSections(sequence, box)) {
    if (adjacentSection.contains === "unknown") {
      adjacentSection.contains = "buffer material";
    }
  }
}
