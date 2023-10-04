import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { solvePart2 } from "../solvePart2.ts";

const testInput = "./tests/testInput.txt";
const challengeInput = "./tests/challengeInput.txt";

Deno.test("testInput returns a number", async () => {
  const result = await solvePart2(testInput);

  assertEquals(typeof (result), "number");
});

Deno.test("testInput returns 140", async () => {
  const result = await solvePart2(testInput);

  assertEquals(result, 140);
});

Deno.test("challengeInput returns 0", async () => {
  const result = await solvePart2(challengeInput);

  assertEquals(result, 27648);
});
