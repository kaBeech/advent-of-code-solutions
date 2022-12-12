import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getVisibleTreesTotal } from "./getVisibleTreesTotal.ts";

const testInput = "testInput.txt";
const testInput2 = "testInput2.txt";
const challengeInput = "challengeInput.txt";


Deno.test("testInput returns a number", async () => {
  const result = await getVisibleTreesTotal(testInput);

  assertEquals("number", typeof (result));
});

Deno.test("testInput returns 21", async () => {
  const result = await getVisibleTreesTotal(testInput);

  assertEquals(21, result);
});

Deno.test("testInput2 returns 24", async () => {
  const result = await getVisibleTreesTotal(testInput2);

  assertEquals(24, result);
});

Deno.test("challengeInput returns 0", async () => {
  const result = await getVisibleTreesTotal(challengeInput);

  assertEquals(0, result);
});
