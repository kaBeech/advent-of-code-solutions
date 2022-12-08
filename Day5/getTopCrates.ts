import { convertMultiLineFileToArray } from "../tools/conversionFunctions.ts";
import { integer } from "../tools/commonTypes.ts";

const crateStacks: string[][] = [["0"]];
let currentCrateStackNumber = 1;
const temporaryCrateStack: string[] = [];
let topCrateString = "";
let forEachBreaker: null | 1 = null;
let numberOfCrateStacks = 0;

const findNumberOfCrateStacks = (instructionsLine: string) => {
  if (instructionsLine[1] === "1") {
    numberOfCrateStacks = instructionsLine.length + 1 / 4;
    return forEachBreaker = 1;
  }
  return;
};

const stackCrate = (instructionsLine: string) => {
  if (instructionsLine[1] === "1") {
    crateStacks.push(temporaryCrateStack);
    temporaryCrateStack.slice(0, temporaryCrateStack.length);
    return forEachBreaker = 1;
  }
  // currentCrateStackNumber * 4 - 3 gives the index location
  // of that stack in the instructions string
  return temporaryCrateStack.unshift(
    instructionsLine[currentCrateStackNumber * 4 - 3],
  );
};

const getTopCrates = async (input: string) => {
  topCrateString = "";

  const inputStringArray = await convertMultiLineFileToArray(input) as string[];

  while (!forEachBreaker) {
    inputStringArray.forEach(findNumberOfCrateStacks);
  }
  forEachBreaker = null;

  while (currentCrateStackNumber <= numberOfCrateStacks) {
    while (!forEachBreaker) inputStringArray.forEach(stackCrate);
    forEachBreaker = null;
    currentCrateStackNumber += 1;
  }
  currentCrateStackNumber = 1

  console.log(inputStringArray);

  return topCrateString;
};

export { getTopCrates };
