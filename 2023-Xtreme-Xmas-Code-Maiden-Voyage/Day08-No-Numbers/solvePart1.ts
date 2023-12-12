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
  let reservoirInUse = false;

  while (currentInstruction.id !== `ZZZ`) {
    let currentDirection: string;
    if (reservoirInUse) {
      // This checks whether directionsReservoir is empty without using any numbers
      if (directionsReservoir == false) {
        reservoirInUse = false;
        currentDirection = directions.shift()!;
        directionsReservoir.push(currentDirection);
      } else {
        currentDirection = directionsReservoir.shift()!;
        directions.push(currentDirection);
      }
    } else {
      // This checks whether directions is empty without using any numbers
      if (directions == false) {
        reservoirInUse = true;
        currentDirection = directionsReservoir.shift()!;
        directions.push(currentDirection);
      } else {
        currentDirection = directions.shift()!;
        directionsReservoir.push(currentDirection);
      }
    }
    currentInstruction = followInstruction(
      maps.instructions,
      currentInstruction,
      currentDirection,
    )!;
    totalStepsArray.push(`Step!`);
  }

  console.log(
    `Part 1: The number of steps it takes to reach "ZZZ" is: ${
      JSON.stringify(totalStepsArray.length)
    }`,
  );

  return totalStepsArray;
})();
