import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getBufferSize } from "./getBufferSize.ts";

const testInput = "testInput.txt";
const testInput2 = "testInput2.txt";
const challengeInput = "datastream.txt";


Deno.test("testInput returns a number", async () => {
  const result = await getBufferSize(testInput);

  assertEquals("number", typeof (result));
});

Deno.test("testInput returns 7", async () => {
  const result = await getBufferSize(testInput);

  assertEquals(7, result);
});

Deno.test("testInput2 returns 10", async () => {
  const result = await getBufferSize(testInput2);

  assertEquals(10, result);
});

Deno.test("challengeInput returns 1275", async () => {
  const result = await getBufferSize(challengeInput);

  assertEquals(1275, result);
});
