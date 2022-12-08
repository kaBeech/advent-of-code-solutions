import { convertMultiLineFileToArray } from "../tools/conversionFunctions.ts";
import { integer } from "../tools/commonTypes.ts";

let crateStacks: string[][] = [["0"]];
let currentCrateStackNumber = 1;
let temporaryCrateStack: string[] = [];
let topCrateString = "";
let forEachBreaker = false;
let numberOfCrateStacks = 0;

const findNumberOfCrateStacks = (instructionsLine: string) => {
  if (instructionsLine[1] === "1") {
    numberOfCrateStacks = (instructionsLine.length + 1) / 4;
    return forEachBreaker = true;
  }
  return;
};

const stackCrate = (instructionsLine: string) => {
  if (instructionsLine[1] === "1") {
    crateStacks.push(temporaryCrateStack);
    temporaryCrateStack = [];
    return forEachBreaker = true;
  }
  const indexLocationOfCurrentStack = currentCrateStackNumber * 4 - 3;
  const currentCrateLetter = instructionsLine[indexLocationOfCurrentStack];
  if (currentCrateLetter <= "Z" && currentCrateLetter >= "A") {
    return temporaryCrateStack.unshift(
      currentCrateLetter,
    );
  }
};

const getTopCrates = async (input: string) => {
  crateStacks = [["0"]];
  numberOfCrateStacks = 0;
  topCrateString = "";

  const inputStringArray = await convertMultiLineFileToArray(input) as string[];

  while (!forEachBreaker) {
    inputStringArray.forEach(findNumberOfCrateStacks);
  }
  forEachBreaker = false;

  while (currentCrateStackNumber <= numberOfCrateStacks) {
    while (!forEachBreaker) inputStringArray.forEach(stackCrate);
    forEachBreaker = false;
    currentCrateStackNumber += 1;
  }
  currentCrateStackNumber = 1;

  return topCrateString;
};

export { getTopCrates };
