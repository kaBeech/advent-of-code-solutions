import { placeItemTemporarily } from "./placeItemTemporarily.ts";
import { BoxAndItemsRecord } from "./types.ts";
import { unplaceTemporarilyPlacedItem } from "./unplaceTemporarilyPlacedItem.ts";

export function findNumberOfPossibleArrangements(
  record: BoxAndItemsRecord,
): number {
  const box = record.box;
  const items = record.items;

  let numberOfPossibleArrangements = 0;

  if (items.every((item) => item.placement_status === "permanently placed")) {
    return 1;
  }

  for (const item of items) {
    if (item.placement_status === "unplaced") {
      placeItemTemporarily(item, box);
      numberOfPossibleArrangements += findNumberOfPossibleArrangements(record);
      unplaceTemporarilyPlacedItem(item, box);
    }
  }

  return numberOfPossibleArrangements;
}
