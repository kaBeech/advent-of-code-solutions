interface PossibleArrangementsRecord {
  boxIndex: number;
  numberOfUnplacedItems: number;
  possibleArrangements: number;
}

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

let cache: PossibleArrangementsRecord[] = [];

const getPossibleArrangements = (
  box: string,
  items: number[],
  boxIndex: number,
) => {
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
    const newBox = box;
    let newBoxIndex = boxIndex;
    const newItems = items.slice();
    let currentItem = newItems[0];
    while (currentItem > 0) {
      currentItem -= 1;
      newBoxIndex += 1;
    }
    newBoxIndex += 1;
    newItems.shift();
    cachedResult += getPossibleArrangements(
      newBox,
      newItems,
      newBoxIndex,
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

console.log("Hello, World!");

cache = [];
console.log(getPossibleArrangements("???.###", [1, 1, 3], 0));
cache = [];
console.log(getPossibleArrangements(".??..??...?##.", [1, 1, 3], 0));
cache = [];
console.log(getPossibleArrangements("?#?#?#?#?#?#?#?", [1, 3, 1, 6], 0));
cache = [];
console.log(getPossibleArrangements("????.#...#...", [4, 1, 1], 0));
cache = [];
console.log(getPossibleArrangements("????.######..#####.", [1, 6, 5], 0));
cache = [];
console.log(getPossibleArrangements("?###????????", [3, 2, 1], 0));
cache = [];
console.log(getPossibleArrangements("??#???#?????.?", [5, 1, 1], 0));
cache = [];
