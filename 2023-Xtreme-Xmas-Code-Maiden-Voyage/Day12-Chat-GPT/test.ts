import { BoxAndItemsRecord, BoxSection, Item } from "./solvePart2.ts";

interface PossibleArrangementsRecord {
  boxIndex: number;
  numberOfUnplacedItems: number;
  possibleArrangements: number;
}

const countUnplacedItems = (items: Item[]) => {
  return items.filter((item) => item.placement_status === "unplaced").length;
};

const countEmptyBoxSections = (box: BoxSection[]) => {
  return box.filter((boxSection) => boxSection.contains === "empty").length;
};

const getPossibleArrangements = (
  record: BoxAndItemsRecord,
  boxIndex: number,
) => {
  const cache: PossibleArrangementsRecord[] = [];
  if (
    countUnplacedItems(record.items) === 0
  ) {
    if (countEmptyBoxSections(record.box) === 0) {
      return 1;
    } else {
      return 0;
    }
  }
  while (
    boxIndex < record.box.length && record.box[boxIndex].contains !== "empty" &&
    record.box[boxIndex].contains !== "unknown"
  ) {
    boxIndex += 1;
  }
  if (boxIndex === record.box.length) {
    return 0;
  }
};
