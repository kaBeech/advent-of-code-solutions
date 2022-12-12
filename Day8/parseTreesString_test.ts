import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { parseTreesString } from "./parseTreesString.ts";

const testInput = "testInput.txt";
const testInput2 = "testInput2.txt";

Deno.test("testInput returns an object including an array of Trees", async () => {
  const result = await parseTreesString(testInput);

  assertEquals("number", typeof (result));
});

Deno.test("testInput returns an object incuding an integer reporting the sideLength", async () => {
  const result = await parseTreesString(testInput);

  assertEquals("number", typeof (result));
});

Deno.test("testInput returns 25 Trees", async () => {
  const result = await parseTreesString(testInput);

  assertEquals(25, result);
});

Deno.test("testInput returns 5 sideLength", async () => {
  const result = await parseTreesString(testInput);

  assertEquals(5, result);
});

Deno.test("testInput2 returns 49 Trees", async () => {
  const result = await parseTreesString(testInput2);

  assertEquals(49, result);
});

Deno.test("testInput2 returns 7 sideLength", async () => {
  const result = await parseTreesString(testInput2);

  assertEquals(7, result);
});