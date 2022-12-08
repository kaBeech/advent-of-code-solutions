import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getTopCrates } from "./getTopCrates.ts";

const testInput = "testInput.txt";
const testInput2 = "testInput2.txt";

Deno.test("testInput returns a number", async () => {
  const result = await getTopCrates(testInput);

  assertEquals("number", typeof (result));
});

Deno.test("testInput returns 0", async () => {
  const result = await getTopCrates(testInput);

  assertEquals(0, result);
});

Deno.test("testInput2 returns 0", async () => {
  const result = await getTopCrates(testInput2);

  assertEquals(0, result);
});
