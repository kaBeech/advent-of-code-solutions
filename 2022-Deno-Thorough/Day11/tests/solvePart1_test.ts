import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { solvePart1 } from "../solvePart1.ts";

const testInput = "tests/testInput.txt";

Deno.test("testInput returns 10605", async () => {
  const result = await solvePart1(testInput);

  assertEquals(result, 10605);
});
