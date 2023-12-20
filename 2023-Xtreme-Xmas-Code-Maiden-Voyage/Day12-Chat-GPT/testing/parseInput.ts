// SEEMS GOOD

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
        boxSections.push({
          id: i,
          contains: "buffer material",
          originally_unknown: false,
        });
      } else if (char === "#") {
        boxSections.push({
          id: i,
          contains: "empty",
          originally_unknown: false,
        });
      } else if (char === "?") {
        boxSections.push({
          id: i,
          contains: "unknown",
          originally_unknown: true,
        });
      }
    }

    // Parse items
    const itemsData = itemsList.split(",");
    const items: Item[] = itemsData.map((length, i) => ({
      id: i,
      length: parseInt(length),
      placement_status: "unplaced",
    }));

    const boxAndItemsRecord = {
      box: boxSections,
      items: items,
    };
    boxAndItemsRecords.push(boxAndItemsRecord);
  }

  return boxAndItemsRecords;
}
