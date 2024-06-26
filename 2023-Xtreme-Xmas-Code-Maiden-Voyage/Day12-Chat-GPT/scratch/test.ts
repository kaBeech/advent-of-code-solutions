import {
  BoxAndItemsRecord,
  BoxSection,
  Item,
} from "../oldArchiveOfChatsWork/solvePart2.ts";

interface PossibleArrangementsRecord {
  boxIndex: number;
  numberOfUnplacedItems: number;
  possibleArrangements: number;
}

const getUnplacedItems = (items: Item[]) => {
  return items.filter((item) => item.placement_status === "unplaced");
};

const countEmptyBoxSections = (box: BoxSection[]) => {
  return box.filter((boxSection) => boxSection.contains === "empty").length;
};

const checkIfRoomForItem = (
  box: BoxSection[],
  boxIndex: number,
  item: Item,
) => {
  for (let i = 0; i < item.length; i++) {
    const boxSection = box[boxIndex + i];
    if (boxSection.contains !== "empty" && boxSection.contains !== "unknown") {
      return false;
    }
  }
  return true;
};

const getPossibleArrangements = (
  record: BoxAndItemsRecord,
  boxIndex: number,
) => {
  const cache: PossibleArrangementsRecord[] = [];
  if (
    getUnplacedItems(record.items).length === 0
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
  if (
    cache.some((cacheItem) =>
      cacheItem.boxIndex === boxIndex &&
      cacheItem.numberOfUnplacedItems === getUnplacedItems(record.items).length
    )
  ) {
    return cache.find((cacheItem) =>
      cacheItem.boxIndex === boxIndex &&
      cacheItem.numberOfUnplacedItems === getUnplacedItems(record.items).length
    )!
      .possibleArrangements;
  }

  const currentItem = getUnplacedItems(record.items)[0];
  let cachedResult = 0;
  if (
    checkIfRoomForItem(record.box, boxIndex, currentItem)
  ) {
    currentItem.placement_status = "temporarily placed";
    cachedResult = getPossibleArrangements(
      record,
      boxIndex + currentItem.length + 1,
    );
  }

  if (record.box[boxIndex].contains === "unknown") {
    cachedResult = getPossibleArrangements(record, boxIndex + 1);
  }

  cache.push({
    boxIndex,
    numberOfUnplacedItems: getUnplacedItems(record.items).length,
    possibleArrangements: cachedResult,
  });

  return cachedResult;
};
