// SEEMS OKAY? DOUBLE CHECK CHAT'S RECURSIVE FUNCTION IF THINGS SEEM WEIRD

import { findPotentialSequences } from "./findPotentialSequences.ts";
import { placeItemTemporarily } from "./placeItemTemporarily.ts";
import { BoxAndItemsRecord, Item } from "./types.ts";
import { unplaceTemporarilyPlacedItem } from "./unplaceTemporarilyPlacedItem.ts";

export function findNumberOfPossibleArrangements(
  record: BoxAndItemsRecord,
): number {
  const box = record.box;
  const items = record.items;

  let numberOfPossibleArrangements = 0;

  if (
    (items.every((item) =>
      item.placement_status === "permanently placed" ||
      item.placement_status === "temporarily placed"
    )) && (box.every((boxSection) => boxSection.contains !== "empty"))
  ) {
    return 1;
  }

  const unplacedItems = items.filter((item) =>
    item.placement_status === "unplaced"
  );

  let lowestIdUnplacedItem: Item | undefined = undefined;

  if (unplacedItems.length > 0) {
    lowestIdUnplacedItem = unplacedItems.reduce((lowestIdItem, item) => {
      if (item.id < lowestIdItem.id) {
        return item;
      }
      return lowestIdItem;
    });
  }

  for (const item of unplacedItems) {
    const potentialSequences = findPotentialSequences(
      item.length,
      box,
    );

    const higherPlacedItems = items.filter((
      placedItem,
    ) =>
      (placedItem.placement_status === "permanently placed" ||
        placedItem.placement_status === "temporarily placed") &&
      placedItem.id > item.id
    );

    let nextHighestPlacedItem: Item | undefined = undefined;

    if (higherPlacedItems.length > 0) {
      nextHighestPlacedItem = higherPlacedItems.reduce((lowestIdItem, item) => {
        if (item.id < lowestIdItem.id) {
          return item;
        }
        return lowestIdItem;
      });
    }

    const lowerPlacedItems = items.filter((
      placedItem,
    ) =>
      (placedItem.placement_status === "permanently placed" ||
        placedItem.placement_status === "temporarily placed") &&
      placedItem.id < item.id
    );

    let nextLowestPlacedItem: Item | undefined = undefined;

    if (lowerPlacedItems.length > 0) {
      nextLowestPlacedItem = lowerPlacedItems.reduce((highestIdItem, item) => {
        if (item.id > highestIdItem.id) {
          return item;
        }
        return highestIdItem;
      });
    }

    for (const sequence of potentialSequences) {
      if (
        lowestIdUnplacedItem!.id === item.id &&
        (!nextHighestPlacedItem ||
          (
            box.findIndex((boxSection) =>
              boxSection.contains ===
                nextHighestPlacedItem!.id.toString()
            ) > sequence.sections[0].id
          )) &&
        (!nextLowestPlacedItem ||
          (
            box.findIndex((boxSection) =>
              boxSection.contains ===
                nextLowestPlacedItem!.id.toString()
            ) < sequence.sections[0].id
          ))
      ) {
        placeItemTemporarily(item, box, sequence);
        numberOfPossibleArrangements += findNumberOfPossibleArrangements(
          record,
        );
        unplaceTemporarilyPlacedItem(item, box, sequence);
      }
    }
  }

  return numberOfPossibleArrangements;
}
