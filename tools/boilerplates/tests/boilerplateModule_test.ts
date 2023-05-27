import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { boilerplateFunction } from "../boilerplateModule.ts";

const testInput = "tests/testInput.txt";
const testInput2 = "tests/testInput2.txt";
const challengeInput = "tests/challengeInput.txt";

Deno.test("testInput returns a number", async () => {
  const result = await boilerplateFunction(testInput);

  assertEquals(typeof (result), "number");
});

Deno.test("testInput returns 0", async () => {
  const result = await boilerplateFunction(testInput);

  assertEquals(result, 0);
});

Deno.test("testInput2 returns 0", async () => {
  const result = await boilerplateFunction(testInput2);

  assertEquals(result, 0);
});

Deno.test("challengeInput returns 0", async () => {
  const result = await boilerplateFunction(challengeInput);

  assertEquals(result, 0);
});
