interface PossibleArrangementsRecord {
  boxIndex: number;
  numberOfUnplacedItems: number;
  possibleArrangements: number;
}

const getPossibleArrangements = (
  box: string,
  items: number[],
  boxIndex: number,
) => {
  const cache: PossibleArrangementsRecord[] = [];
  if (
    items.length === 0
  ) {
    return 1;
  }

  while (
    box[boxIndex] === "."
  ) {
    boxIndex += 1;
  }

  if (box.length < boxIndex) {
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
    checkIfRoomForItem(box, items[0], boxIndex)
  ) {
    cachedResult += placeItem(
      box,
      items,
      boxIndex,
    );
  }

  if (box[boxIndex] === "?") {
    cachedResult += getPossibleArrangements(box, items.slice(), boxIndex + 1);
  }

  cache.push({
    boxIndex,
    numberOfUnplacedItems: items.length,
    possibleArrangements: cachedResult,
  });

  return cachedResult;
};

const checkIfRoomForItem = (
  box: string,
  itemLength: number,
  boxIndex: number,
) => {
  if (box.length - boxIndex < itemLength) {
    return false;
  }

  let i = boxIndex;

  while (i < itemLength + boxIndex) {
    if (box[i] === ".") {
      return false;
    }
    i += 1;
  }

  if (box[i] === "#") {
    return false;
  }

  return true;
};

const placeItem = (box: string, items: number[], boxIndex: number) => {
  const newItems = items.slice();
  boxIndex += newItems[0] + 1;
  newItems.shift();
  return getPossibleArrangements(
    box,
    newItems,
    boxIndex,
  );
};

console.log("Hello, World!");

console.log(getPossibleArrangements("???.###", [1, 1, 3], 0));
console.log(getPossibleArrangements(".??..??...?##.", [1, 1, 3], 0));
console.log(getPossibleArrangements("?#?#?#?#?#?#?#?", [1, 3, 1, 6], 0));
console.log(getPossibleArrangements("????.#...#...", [4, 1, 1], 0));
console.log(getPossibleArrangements("????.######..#####.", [1, 6, 5], 0));
console.log(getPossibleArrangements("?###????????", [3, 2, 1], 0));
console.log(getPossibleArrangements("??#???#?????.?", [5, 1, 1], 0));
