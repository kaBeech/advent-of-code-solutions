import followInstruction from "./followInstruction.ts";
import parseInput from "./parseInput.ts";
import { TypeInstruction, TypeMaps } from "./types.ts";

export default (async function (): Promise<number> {
  const maps: TypeMaps = await parseInput();
  const start = maps.instructions.find((instruction: TypeInstruction) =>
    instruction.id === `AAA`
  )!;
  const directions = maps.directions.split(``);
  const directionsReservoir: string[] = [];
  const totalStepsArray: string[] = [];
  let currentInstruction = start;
  let reservoirInUse = false;

  while (currentInstruction.id !== `ZZZ`) {
    let currentDirection: string;
    if (reservoirInUse) {
      if (directionsReservoir.toString() === ``) {
        reservoirInUse = false;
        currentDirection = directions.shift()!;
        directionsReservoir.push(currentDirection);
      } else {
        currentDirection = directionsReservoir.shift()!;
        directions.push(currentDirection);
      }
    } else {
      if (directions.toString() === ``) {
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
    totalStepsArray.push(`N`);
  }

  console.log(
    `Part 1: The number of steps it takes to reach "ZZZ" is: ${
      JSON.stringify(totalStepsArray.length)
    }`,
  );

  return totalStepsArray.length;
})();
