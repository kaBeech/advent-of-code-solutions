import { convertMultiLineStringToArray } from "../tools/convertMultiLineStringToArray.ts";
import { convertMultiParagraphStringToArray } from "../tools/convertMultiParagraphStringToArray.ts";
import { getBadge } from "./getBadge.ts";
import { getDuplicateItem } from "./getDuplicateItem.ts";

const prioritiesLegend =
  "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let itemMethod = "duplicate";
let prioritiesTotal = 0;

const sumPriorities = (inventoryString: string) => {
  let targetItem;
  if (itemMethod === "badge") {
    const inventory = convertMultiLineStringToArray(inventoryString);
    targetItem = getBadge(inventory)}
  else targetItem = getDuplicateItem(inventoryString);
  console.log(targetItem);

  prioritiesTotal += prioritiesLegend.indexOf(targetItem);
};

const getPrioritiesTotal = async (rucksacksFile: string) => {
  itemMethod = "duplicate";
  prioritiesTotal = 0;
  let rucksacks = [] as string[];

  const rucksacksString = await Deno.readTextFile(rucksacksFile);
  if (rucksacksString.includes("\n\n")) {
    itemMethod = "badge";
    rucksacks = convertMultiParagraphStringToArray(rucksacksString);
  } else {
    rucksacks = convertMultiLineStringToArray(rucksacksString);
  }

  rucksacks.forEach(sumPriorities);

  return prioritiesTotal;
};

export { getPrioritiesTotal };
