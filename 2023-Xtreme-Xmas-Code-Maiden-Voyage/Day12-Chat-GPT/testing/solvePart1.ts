import { findNumberOfPossibleArrangements } from "./findNumberOfPossibleArrangements.ts";
import { parseInput } from "./parseInput.ts";
import { placeItemsInUnambiguousPlacements } from "./placeItemsInUnambiguousPlacements.ts";

function readInputFromFile(filename: string): string {
  return Deno.readTextFileSync(filename);
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
