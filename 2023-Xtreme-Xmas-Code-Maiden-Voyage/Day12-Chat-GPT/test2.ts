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
  console.log("started");
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

  let cachedResult = 0;
  if (
    checkIfRoomForItem(box, items[0])
  ) {
    let newBox = box;
    let newBoxIndex = boxIndex;
    const newItems = items.slice();
    let currentItem = newItems[0];
    while (currentItem > 0) {
      currentItem -= 1;
      newBox = newBox.slice(1);
      newBoxIndex += 1;
    }
    newBox = newBox.slice(1);
    newBoxIndex += 1;
    console.count();
    newItems.shift();
    cachedResult += getPossibleArrangements(
      newBox,
      newItems,
      newBoxIndex,
    );
  }

  if (box[0] === "?") {
    box = box.slice(1);
    boxIndex += 1;
    cachedResult += getPossibleArrangements(box, items, boxIndex);
  }

  cache.push({
    boxIndex,
    numberOfUnplacedItems: items.length,
    possibleArrangements: cachedResult,
  });

  return cachedResult;
};
