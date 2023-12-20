class BoxSection {
  id: number;
  contains: string;
  originally_unknown: boolean;

  constructor(id: number, contains: string, originally_unknown: boolean) {
    this.id = id;
    this.contains = contains;
    this.originally_unknown = originally_unknown;
  }
}

class Item {
  id: number;
  length: number;
  placement_status: string;

  constructor(id: number, length: number, placement_status: string) {
    this.id = id;
    this.length = length;
    this.placement_status = placement_status;
  }
}

class BoxAndItemsRecord {
  box: BoxSection[];
  items: Item[];

  constructor(box: BoxSection[], items: Item[]) {
    this.box = box;
    this.items = items;
  }
}

function parseInput(inputString: string): BoxAndItemsRecord[] {
  const rows = inputString.trim().split("\n");
  const boxAndItemsRecords: BoxAndItemsRecord[] = [];

  for (const row of rows) {
    const [boxData, itemsList] = row.split(" ");

    // Parse box
    const boxSections: BoxSection[] = [];
    for (let i = 0; i < boxData.length; i++) {
      const char = boxData[i];
      if (char === ".") {
        boxSections.push(new BoxSection(i, "buffer material", false));
      } else if (char === "#") {
        boxSections.push(new BoxSection(i, "empty", false));
      } else if (char === "?") {
        boxSections.push(new BoxSection(i, "unknown", true));
      }
    }

    // Parse items
    const itemsData = itemsList.split(",");
    const items: Item[] = itemsData.map((length, i) =>
      new Item(i, parseInt(length), "unplaced")
    );

    const boxAndItemsRecord = new BoxAndItemsRecord(boxSections, items);
    boxAndItemsRecords.push(boxAndItemsRecord);
  }

  return boxAndItemsRecords;
}

function readInputFromFile(filename: string): string {
  return Deno.readTextFileSync(filename);
}

function placeItemPermanently(
  item: Item,
  box: BoxSection[],
  sequence: BoxSection[],
): void {
  item.placement_status = "permanently placed";
  for (const boxSection of sequence) {
    boxSection.contains = item.id.toString();
  }

  for (const adjacentSection of getAdjacentSections(sequence, box)) {
    if (adjacentSection.contains === "unknown") {
      adjacentSection.contains = "buffer material";
    }
  }
}

function placeItemTemporarily(
  item: Item,
  box: BoxSection[],
  sequence: BoxSection[],
): void {
  item.placement_status = "temporarily placed";
  for (const boxSection of sequence) {
    boxSection.contains = item.id.toString();
  }

  for (const adjacentSection of getAdjacentSections(sequence, box)) {
    if (adjacentSection.contains === "unknown") {
      adjacentSection.contains = "buffer material";
    }
  }
}

function unplaceTemporarilyPlacedItem(
  item: Item,
  box: BoxSection[],
  sequence: BoxSection[],
): void {
  item.placement_status = "unplaced";
  for (const boxSection of sequence) {
    if (boxSection.originally_unknown) {
      boxSection.contains = "unknown";
    } else {
      boxSection.contains = "empty";
    }
  }

  for (const adjacentSection of getAdjacentSections(sequence, box)) {
    if (adjacentSection.originally_unknown) {
      adjacentSection.contains = "unknown";
    }
  }
}

function getAdjacentSections(
  sequence: BoxSection[],
  box: BoxSection[],
): BoxSection[] {
  const leftAdjacent = sequence[0].id - 1;
  const rightAdjacent = sequence[sequence.length - 1].id + 1;

  const adjacentSections: BoxSection[] = [];

  if (leftAdjacent >= 0) {
    adjacentSections.push(box[leftAdjacent]);
  }

  if (rightAdjacent < box.length) {
    adjacentSections.push(box[rightAdjacent]);
  }

  return adjacentSections;
}

function findPotentialSequences(
  length: number,
  box: BoxSection[],
): BoxSection[][] {
  const potentialSequences: BoxSection[][] = [];
  let currentSequence: BoxSection[] = [];

  for (const boxSection of box) {
    for (const boxSection of box) {
      if (
        boxSection.contains === "empty" || boxSection.contains === "unknown"
      ) {
        currentSequence.push(boxSection);

        if (currentSequence.length === length) {
          potentialSequences.push(currentSequence);
          break; // Add only the first potential sequence
        }
      } else {
        currentSequence = [];
      }
    }
  }

  return potentialSequences;
}

function placeItemsInUnambiguousPlacements(
  record: BoxAndItemsRecord,
): BoxAndItemsRecord {
  const box = record.box;
  const items = record.items;
  let itemPlacedThisSequence = true;

  while (itemPlacedThisSequence) {
    itemPlacedThisSequence = false;

    const unplacedItems = items.filter((item) =>
      item.placement_status === "unplaced"
    );

    if (unplacedItems.length === 0) {
      break;
    }

    const selectedItem = unplacedItems.reduce((maxItem, currentItem) =>
      currentItem.length > maxItem.length ? currentItem : maxItem
    );

    const potentialSequences = findPotentialSequences(selectedItem.length, box);

    if (potentialSequences.length === 1) {
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
          const [item, sequence] of sameLengthItems.map((
            item,
            index,
          ) => [item, potentialSequences[index]])
        ) {
          placeItemPermanently(item, box, sequence);
          itemPlacedThisSequence = true;
        }
      }
    }
  }

  return record;
}

function findNumberOfPossibleArrangements(record: BoxAndItemsRecord): number {
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

function main(): number {
  let totalNumberOfPossibleArrangements = 0;

  const fileInput = readInputFromFile("testInput.dat");
  const parsedRecords = parseInput(fileInput);

  for (const record of parsedRecords) {
    placeItemsInUnambiguousPlacements(record);
    totalNumberOfPossibleArrangements += findNumberOfPossibleArrangements(
      record,
    );
  }

  console.log(
    `Part 1: The number of possible arrangements is ${totalNumberOfPossibleArrangements}`,
  );
  return totalNumberOfPossibleArrangements;
}

if (import.meta.main) {
  main();
}
