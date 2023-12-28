import { BoxAndItemsRecord, BoxSection, Item } from "./solvePart2.ts";

interface PossibleArrangementsRecord {
  boxIndex: number;
  numberOfUnplacedItems: number;
  possibleArrangements: number;
}

const countUnplacedItems = (items: Item[]) => {
  return items.filter((item) => item.placement_status === "unplaced").length;
};

const getPossibleArrangements = (
  record: BoxAndItemsRecord,
  boxIndex: number,
) => {
  const cache: PossibleArrangementsRecord[] = [];
  if (
    countUnplacedItems(record.items) === 0
  ) {
  }
};
