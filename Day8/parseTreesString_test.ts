import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { parseTreesString } from "./parseTreesString.ts";

const testInput = "testInput.txt";
const testInput2 = "testInput2.txt";

Deno.test("testInput returns an object incuding an integer reporting the sideLength", async () => {
  const result = await parseTreesString(testInput);

  assertEquals(result.sideLength % 1, 0);
});

Deno.test("testInput returns 25 Trees", async () => {
  const result = await parseTreesString(testInput);

  assertEquals(result.trees.length, 25);
});

Deno.test("testInput returns 5 sideLength", async () => {
  const result = await parseTreesString(testInput);

  assertEquals(result.sideLength, 5);
});

Deno.test("testInput2 returns 49 Trees", async () => {
  const result = await parseTreesString(testInput2);

  assertEquals(result.trees.length, 49);
});

Deno.test("testInput2 returns 7 sideLength", async () => {
  const result = await parseTreesString(testInput2);

  assertEquals(result.sideLength, 7);
});
