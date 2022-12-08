import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getBufferSize } from "./getBufferSize.ts";

const testInput = "testInput.txt";
const testInput2 = "testInput2.txt";
const challengeInput = "challengeInput.txt";


Deno.test("testInput returns a number", async () => {
  const result = await getBufferSize(testInput);

  assertEquals("number", typeof (result));
});

Deno.test("testInput returns 0", async () => {
  const result = await getBufferSize(testInput);

  assertEquals(0, result);
});

Deno.test("testInput2 returns 0", async () => {
  const result = await getBufferSize(testInput2);

  assertEquals(0, result);
});

Deno.test("testInput2 returns 0", async () => {
  const result = await getBufferSize(challengeInput);

  assertEquals(0, result);
});
