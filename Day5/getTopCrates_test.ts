import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getTopCrates } from "./getTopCrates.ts";

const testInput = "testInput.txt";
const testInput2 = "testInput2.txt";

Deno.test("testInput returns a number", async () => {
  const result = await getTopCrates(testInput);

  assertEquals("string", typeof (result));
});

Deno.test("testInput returns 'CMZ'", async () => {
  const result = await getTopCrates(testInput);

  assertEquals("CMZ", result);
});

Deno.test("testInput2 returns 'ZQW'", async () => {
  const result = await getTopCrates(testInput2);

  assertEquals("ZQW", result);
});
