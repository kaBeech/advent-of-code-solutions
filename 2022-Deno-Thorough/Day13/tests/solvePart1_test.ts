import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { solvePart1 } from "../solvePart1.ts";

const testInput = "tests/testInput.txt";
const challengeInput = "tests/challengeInput.txt";

Deno.test("testInput returns a number", async () => {
  const result = await solvePart1(testInput);

  assertEquals(typeof (result), "number");
});

Deno.test("testInput returns 0", async () => {
  const result = await solvePart1(testInput);

  assertEquals(result, 13);
});

Deno.test("challengeInput returns 0", async () => {
  const result = await solvePart1(challengeInput);

  assertEquals(result, 0);
});
