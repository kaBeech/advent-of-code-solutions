import { convertMultiLineStringToArray } from "../tools/convertMultiLineStringToArray.ts";
import { getDuplicateItem } from "./getDuplicateItem.ts";

const prioritiesLegend =
  "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let prioritiesTotal = 0;

const sumPriorities = (rucksack: string) => {
  const duplicateItem = getDuplicateItem(rucksack);
  prioritiesTotal += prioritiesLegend.indexOf(duplicateItem);
};

const getPrioritiesTotal = async (rucksacks: string | string[]) => {
  if (typeof (rucksacks) === "string") {
    rucksacks = await convertMultiLineStringToArray(rucksacks) as string[];
  }
  prioritiesTotal = 0;

  rucksacks.forEach(sumPriorities);

  return prioritiesTotal;
};

export { getPrioritiesTotal };
