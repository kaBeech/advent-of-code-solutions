import { convertMultiLineFileToArray } from "../tools/conversionFunctions.ts";
import { singleDigitInteger } from "../tools/commonTypes.ts";

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

const moveCrates = (numberOfCrates: singleDigitInteger, sourceStack: singleDigitInteger, destinationStack: singleDigitInteger) => {
  for (let i = 0; i < numberOfCrates; i++) {
    crateStacks[destinationStack].push(crateStacks[sourceStack].pop() as string)
  }
};

const getTopCrates = async (instructionsLocation: string) => {
  crateStacks = [["0"]];
  numberOfCrateStacks = 0;
  topCrateString = "";

  const instructionsLines = await convertMultiLineFileToArray(
    instructionsLocation,
  ) as string[];

  while (!forEachBreaker) {
    instructionsLines.forEach(findNumberOfCrateStacks);
  }
  forEachBreaker = false;

  while (currentCrateStackNumber <= numberOfCrateStacks) {
    while (!forEachBreaker) instructionsLines.forEach(stackCrate);
    forEachBreaker = false;
    currentCrateStackNumber += 1;
  }
  currentCrateStackNumber = 1;

  instructionsLines.forEach(directCrateMovement)

  return topCrateString;
};

export { getTopCrates };
