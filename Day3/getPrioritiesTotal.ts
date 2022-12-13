import { convertMultiLineFileToArray } from "../tools/conversionFunctions/convertFileToArray.ts";
import { getBadge } from "./getBadge.ts";
import { getDuplicateItem } from "./getDuplicateItem.ts";

const prioritiesLegend =
  "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let itemMethod = "duplicate";
let prioritiesTotal = 0;

const sumPriorities = (inventory: string | string[]) => {
  let targetItem;

  if (typeof (inventory) === "string") {
    targetItem = getDuplicateItem(inventory);
  } else targetItem = getBadge(inventory);

  if (!prioritiesLegend.includes(targetItem)) {
    throw `Item does not have a listed priority: ${targetItem}`;
  }

  prioritiesTotal += prioritiesLegend.indexOf(targetItem);
};

const getPrioritiesTotal = async (
  rucksacksFile: string,
  method: "badge" | "duplicate",
) => {
  itemMethod = method;
  prioritiesTotal = 0;
  let rucksacks = [];
  const rucksacksRaw = await convertMultiLineFileToArray(rucksacksFile);

  if (itemMethod === "badge") {
    let rucksackGroup = [] as string[];
    for (let i = 0; i < rucksacksRaw.length; i++) {
      rucksackGroup.push(rucksacksRaw[i]);
      if ((i + 1) % 3 === 0) {
        rucksacks.push(rucksackGroup);
        rucksackGroup = [];
      }
    }
  } else {
    rucksacks = rucksacksRaw;
  }

  rucksacks.forEach(sumPriorities);

  return prioritiesTotal;
};

export { getPrioritiesTotal };
