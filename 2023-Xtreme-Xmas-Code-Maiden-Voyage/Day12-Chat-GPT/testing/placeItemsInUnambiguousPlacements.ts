// SEEMS GOOD

import { findPotentialSequences } from "./findPotentialSequences.ts";
import { placeItemPermanently } from "./placeItemPermanently.ts";
import { BoxAndItemsRecord } from "./types.ts";

export function placeItemsInUnambiguousPlacements(
  record: BoxAndItemsRecord,
): BoxAndItemsRecord {
  const box = record.box;
  const items = record.items;
  let itemPlacedThisSequence = true;

  while (itemPlacedThisSequence) {
    itemPlacedThisSequence = false;
    for (let i = 0; i < items.length; i++) {
      const unplacedItems = items.filter((item) =>
        item.placement_status === "unplaced"
      );
      if (unplacedItems.length === 0) {
        break;
      }

      const selectedItem = unplacedItems.reduce((maxItem, currentItem) =>
        currentItem.length > maxItem.length ? currentItem : maxItem
      );

      let potentialSequences = findPotentialSequences(
        selectedItem.length,
        box,
      );

      potentialSequences = potentialSequences.filter((sequence) =>
        sequence.sections.length > 0
      );

      if (
        potentialSequences.length === 1
      ) {
        placeItemPermanently(selectedItem, box, potentialSequences[0]);
        itemPlacedThisSequence = true;
      } else if (potentialSequences.length > 1) {
        const sameLengthItems = items.filter(
          (item) =>
            item.length === selectedItem.length &&
            item.placement_status === "unplaced",
        );

        if (potentialSequences.length === sameLengthItems.length) {
          for (
            const itemPlacement of sameLengthItems.map((
              item,
              index,
            ) => {
              return {
                item: item,
                sequence: potentialSequences[index],
              };
            })
          ) {
            placeItemPermanently(
              itemPlacement.item,
              box,
              itemPlacement.sequence,
            );
          }
          itemPlacedThisSequence = true;
        }
      }
    }
  }

  return record;
}
