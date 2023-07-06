import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { solvePart1 } from "../solvePart1.ts";

const challengeInput = "tests/challengeInput.txt";

Deno.test("testInput returns 57838", async () => {
  const result = await solvePart1(challengeInput);

  assertEquals(result, 57838);
});
