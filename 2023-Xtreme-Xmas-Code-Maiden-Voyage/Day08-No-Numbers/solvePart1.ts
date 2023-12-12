import followInstruction from "./followInstruction.ts";
import { parseInput } from "./parseInput.ts";
import { Instruction, Maps } from "./types.ts";

export default (async function (): Promise<string[]> {
  const maps: Maps = await parseInput();
  const start = maps.instructions.find((instruction: Instruction) =>
    instruction.id === `AAA`
  )!;
  const directions = maps.directions.split(``);
  const directionsReservoir = [];
  const totalStepsArray = [];
  let currentInstruction = start;

  while (currentInstruction.id !== `ZZZ`) {
    let currentDirection: string;
    if (directions == false) {
      currentDirection = directionsReservoir.shift()!;
      directions.push(currentDirection);
    } else {
      currentDirection = directions.shift()!;
      directionsReservoir.push(currentDirection);
    }
    currentInstruction = followInstruction(
      maps.instructions,
      currentInstruction,
      currentDirection,
    )!;
    totalStepsArray.push(`Step!`);
  }

  console.log(
    `Part 1: The number of steps it takes to reach "ZZZ" is equal to the number of elements in this array: ${
      JSON.stringify(totalStepsArray)
    }`,
  );

  return totalStepsArray;
})();
