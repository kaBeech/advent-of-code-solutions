import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { solvePart2 } from "../solvePart2.ts";

const testInput = "tests/testInput.txt";

Deno.test("testInput returns 2713310158", async () => {
  const result = await solvePart2(testInput);

  assertEquals(result, 2713310158);
});
