import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { countVisitedPositions } from "../countVisitedPositions.ts";

const testInput1 = "tests/testInput1.txt";
const testInput2 = "tests/testInput2.txt";
const challengeInput = "tests/ropeMovementInstructions.txt";

Deno.test("returns an integer", async () => {
  const result1 = await countVisitedPositions(testInput1, 2);
  const result2 = await countVisitedPositions(testInput2, 2);

  assertEquals(result1, Math.floor(result1));
  assertEquals(result2, Math.floor(result2));
});

Deno.test("returns a positive number", async () => {
  const result1 = await countVisitedPositions(testInput1, 2);
  const result2 = await countVisitedPositions(testInput2, 2);

  assert(result1 >= 0);
  assert(result2 >= 0);
});

Deno.test("returns correct answer", async () => {
  const result1 = await countVisitedPositions(testInput1, 2);
  const result2 = await countVisitedPositions(testInput2, 2);

  assertEquals(result1, 13);
  assertEquals(result2, 6);
});

Deno.test("challengeInput returns 0", async () => {
  const result = await countVisitedPositions(challengeInput, 2);

  assertEquals(result, 5710);
});
