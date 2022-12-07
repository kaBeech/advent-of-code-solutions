import { convertMultiLineStringToArray } from "../tools/convertMultiLineStringToArray.ts";
import { convertMultiParagraphStringToArray } from "../tools/convertMultiParagraphStringToArray.ts";
import { getDuplicateItem } from "./getDuplicateItem.ts";

const prioritiesLegend =
  "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let itemMethod = "duplicate";
let prioritiesTotal = 0;

const sumPriorities = (rucksack: string) => {
  let targetItem;
  if (itemMethod === "badge") {targetItem = getBadge(rucksack);}
  else {targetItem = getDuplicateItem(rucksack);}

  prioritiesTotal += prioritiesLegend.indexOf(targetItem);
};

const getPrioritiesTotal = async (rucksacks: string | string[]) => {
  itemMethod = "duplicate";
  prioritiesTotal = 0;

  if (typeof (rucksacks) === "string") {
    if (rucksacks.includes("\n\n")) {
      itemMethod = "badge";
      rucksacks = await convertMultiLineStringToArray(rucksacks);
      rucksacks.forEach(convertMultiParagraphStringToArray);
    } else {
      rucksacks = await convertMultiLineStringToArray(rucksacks);
    }
  }


  rucksacks.forEach(sumPriorities);

  return prioritiesTotal;
};

export { getPrioritiesTotal };
