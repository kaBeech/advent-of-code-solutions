import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getHighestScenicScore } from "../getHighestScenicScore.ts";

const testInput = "tests/testInput.txt";
const testInput2 = "tests/testInput2.txt";
const challengeInput = "tests/treeGrid.txt";

Deno.test("testInput returns a number", async () => {
  const result = await getHighestScenicScore(testInput);

  assertEquals(typeof (result), "number");
});

Deno.test("testInput returns 8", async () => {
  const result = await getHighestScenicScore(testInput);

  assertEquals(result, 8);
});

Deno.test("testInput2 returns 45", async () => {
  const result = await getHighestScenicScore(testInput2);

  assertEquals(result, 45);
});

Deno.test("challengeInput returns 368368", async () => {
  const result = await getHighestScenicScore(challengeInput);

  assertEquals(result, 368368);
});
