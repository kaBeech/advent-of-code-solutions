import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { countVisitedPositions } from "../countVisitedPositions.ts";

const testInput1 = "tests/testInput1.txt";
const testInput2 = "tests/testInput2.txt";
const challengeInput = "tests/ropeMovementInstructions.txt";

Deno.test("returns an integer", async () => {
  const result1 = await countVisitedPositions(1, testInput1);
  const result2 = await countVisitedPositions(1, testInput2);

  assertEquals(result1, Math.floor(result1));
  assertEquals(result2, Math.floor(result2));
});

Deno.test("returns a positive number", async () => {
  const result1 = await countVisitedPositions(1, testInput1);
  const result2 = await countVisitedPositions(1, testInput2);

  assert(result1 >= 0);
  assert(result2 >= 0);
});

Deno.test("returns correct answer", async () => {
  const result1 = await countVisitedPositions(1, testInput1);
  const result2 = await countVisitedPositions(1, testInput2);

  assertEquals(result1, 13);
  assertEquals(result2, 6);
});

Deno.test("challengeInput returns correct answer (Part 1)", async () => {
  const result = await countVisitedPositions(1, challengeInput);

  assertEquals(result, 5710);
});

Deno.test("challengeInput returns correct answer (Part 2)", async () => {
  const result = await countVisitedPositions(9, challengeInput);

  assertEquals(result, 2259);
});
