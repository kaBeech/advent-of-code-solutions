import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { boilerplateFunction } from "../boilerplateModule.ts";

const testInput = "tests/testInput.txt";
const testInput2 = "tests/testInput2.txt";
const challengeInput = "tests/challengeInput.txt";

Deno.test("testInput returns a number", async () => {
  const result = await boilerplateFunction(testInput);

  assertEquals("number", typeof (result));
});

Deno.test("testInput returns 0", async () => {
  const result = await boilerplateFunction(testInput);

  assertEquals(0, result);
});

Deno.test("testInput2 returns 0", async () => {
  const result = await boilerplateFunction(testInput2);

  assertEquals(0, result);
});

Deno.test("challengeInput returns 0", async () => {
  const result = await boilerplateFunction(challengeInput);

  assertEquals(0, result);
});
