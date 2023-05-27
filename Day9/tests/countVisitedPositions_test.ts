import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { countVisitedPositions } from "../countVisitedPositions.ts";

const testInput = "tests/testInput.txt";
const testInput2 = "tests/testInput2.txt";
// const challengeInput = "tests/ropeMovementDirections.txt";

Deno.test("testInput returns a number", async () => {
  const result = await countVisitedPositions(testInput);

  assertEquals(typeof (result), "number");
});

Deno.test("testInput returns an integer", async () => {
  const result = await countVisitedPositions(testInput);

  assertEquals(result, Math.floor(result));
});

Deno.test("testInput returns a positive number", async () => {
  const result = await countVisitedPositions(testInput);

  assert(result >= 0);
});

Deno.test("testInput returns 13", async () => {
  const result = await countVisitedPositions(testInput);

  assertEquals(result, 13);
});

Deno.test("testInput2 returns 6", async () => {
  const result = await countVisitedPositions(testInput2);

  assertEquals(result, 6);
});

// Deno.test("challengeInput returns 0", async () => {
//   const result = await countVisitedPositions(challengeInput);

//   assertEquals(result, 0);
// });
