import { BoxAndItemsRecord, BoxSection, Item } from "./types.ts";

export function parseInput(inputString: string): BoxAndItemsRecord[] {
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
