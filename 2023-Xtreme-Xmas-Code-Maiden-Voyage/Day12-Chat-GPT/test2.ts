interface PossibleArrangementsRecord {
  boxIndex: number;
  numberOfUnplacedItems: number;
  possibleArrangements: number;
}

const checkIfRoomForItem = (
  box: string,
  itemLength: number,
) => {
  for (let i = 0; i < itemLength; i++) {
    if (box[i] === ".") {
      return false;
    }
  }
  return true;
};

const cache: PossibleArrangementsRecord[] = [];

export const duck = "quack";

export const getPossibleArrangements = (
  box: string,
  items: number[],
  boxIndex: number,
) => {
  if (
    items.length === 0
  ) {
    if (box.includes("#")) {
      return 0;
    } else {
      return 1;
    }
  }
  while (
    box.length > 0 &&
    box[0] === "."
  ) {
    boxIndex += 1;
    box = box.slice(1);
  }
  if (box.length === 0) {
    return 0;
  }
  if (
    cache.some((cachedRecord) =>
      cachedRecord.boxIndex === boxIndex &&
      cachedRecord.numberOfUnplacedItems === items.length
    )
  ) {
    return cache.find((cachedRecord) =>
      cachedRecord.boxIndex === boxIndex &&
      cachedRecord.numberOfUnplacedItems === items.length
    )!
      .possibleArrangements;
  }

  let currentItem = items[0];
  let cachedResult = 0;
  if (
    checkIfRoomForItem(box, currentItem)
  ) {
    while (currentItem > 0) {
      currentItem -= 1;
      box = box.slice(1);
      boxIndex += 1;
    }
    box = box.slice(1);
    boxIndex += 1;
    items.shift();
    cachedResult += getPossibleArrangements(
      box,
      items,
      boxIndex,
    );
  } else if (box[boxIndex] === "?") {
    box = box.slice(1);
    boxIndex += 1;
    cachedResult = getPossibleArrangements(box, items, boxIndex);
  }

  cache.push({
    boxIndex,
    numberOfUnplacedItems: items.length,
    possibleArrangements: cachedResult,
  });

  return cachedResult;
};
