import { findPotentialSequences } from "./findPotentialSequences.ts";
import { placeItemPermanently } from "./placeItemPermanently.ts";
import { BoxAndItemsRecord } from "./types.ts";

export function placeItemsInUnambiguousPlacements(
  record: BoxAndItemsRecord,
): BoxAndItemsRecord {
  const box = record.box;
  const items = record.items;

  while (true) {
    const unplacedItems = items.filter((item) =>
      item.placement_status === "unplaced"
    );
    if (unplacedItems.length === 0) {
      break;
    }

    const selectedItem = unplacedItems.reduce((maxItem, currentItem) =>
      currentItem.length > maxItem.length ? currentItem : maxItem
    );

    const potentialSequences = findPotentialSequences(selectedItem.length, box);

    if (potentialSequences.length === 1) {
      placeItemPermanently(selectedItem, box, potentialSequences[0]);
    } else if (potentialSequences.length > 1) {
      const sameLengthItems = items.filter(
        (item) =>
          item.length === selectedItem.length &&
          item.placement_status === "unplaced",
      );

      if (potentialSequences.length === sameLengthItems.length) {
        for (
          const [item, sequence] of sameLengthItems.map((
            item,
            index,
          ) => [item, potentialSequences[index]])
        ) {
          placeItemPermanently(item, box, sequence);
        }
      }
    }
  }

  return record;
}
