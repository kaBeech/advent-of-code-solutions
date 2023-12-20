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
  const leftAdjacent = box[sequence[0].id - 1];
  const rightAdjacent = box[sequence[sequence.length - 1].id + 1];

  return [leftAdjacent, rightAdjacent].filter(Boolean) as BoxSection[];
}

function findPotentialSequences(
  length: number,
  box: BoxSection[],
): BoxSection[][] {
  const potentialSequences: BoxSection[][] = [];

  for (const boxSection1 of box) {
    const currentSequence: BoxSection[] = [];
    let sequenceBroken = false;

    if (
      boxSection1.contains === "empty" || boxSection1.contains === "unknown"
    ) {
      currentSequence.push(boxSection1);

      for (const boxSection2 of box) {
        if (
          boxSection2.contains === "empty" || boxSection2.contains === "unknown"
        ) {
          currentSequence.push(boxSection2);

          if (currentSequence.length === length) {
            potentialSequences.push(currentSequence);
            sequenceBroken = true;
            break;
          }
        } else {
          sequenceBroken = true;
          break;
        }
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

    for (let i = 0; i < items.length; i++) {
      const unplacedItems = items.filter((item) =>
        item.placement_status === "unplaced"
      );

      if (unplacedItems.length === 0) {
        break;
      }

      const selectedItem = unplacedItems.reduce((maxItem, currentItem) =>
        currentItem.length > maxItem.length ? currentItem : maxItem
      );

      const potentialSequences = findPotentialSequences(
        selectedItem.length,
        box,
      )
        .filter((sequence) => sequence.length > 0);

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
          for (let i = 0; i < sameLengthItems.length; i++) {
            const itemPlacement = {
              item: sameLengthItems[i],
              sequence: potentialSequences[i],
            };
            placeItemPermanently(
              itemPlacement.item,
              box,
              itemPlacement.sequence,
            );
            itemPlacedThisSequence = true;
          }
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

  if (
    items.every((item) =>
      item.placement_status === "permanently placed" ||
      item.placement_status === "temporarily placed"
    ) &&
    box.every((boxSection) => boxSection.contains !== "empty")
  ) {
    return 1;
  }

  const unplacedItems = items.filter((item) =>
    item.placement_status === "unplaced"
  );

  const lowestIdUnplacedItem = unplacedItems.reduce((minItem, currentItem) =>
    currentItem.id < minItem.id ? currentItem : minItem
  );

  const potentialSequences = findPotentialSequences(
    lowestIdUnplacedItem.length,
    box,
  );

  for (const sequence of potentialSequences) {
    const hasLowerIdInEarlierSequence = box.some(
      (boxSection) =>
        boxSection.contains !== "empty" &&
        parseInt(boxSection.contains) > lowestIdUnplacedItem.id &&
        box.indexOf(boxSection) < box.indexOf(sequence[0]),
    );

    const hasHigherIdInLaterSequence = box.some(
      (boxSection) =>
        boxSection.contains !== "empty" &&
        parseInt(boxSection.contains) < lowestIdUnplacedItem.id &&
        box.indexOf(boxSection) > box.indexOf(sequence[0]),
    );

    if (!hasLowerIdInEarlierSequence && !hasHigherIdInLaterSequence) {
      placeItemTemporarily(lowestIdUnplacedItem, box, sequence);
      numberOfPossibleArrangements += findNumberOfPossibleArrangements(record);
      unplaceTemporarilyPlacedItem(lowestIdUnplacedItem, box, sequence);
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
