import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getBufferSize } from "./getBufferSize.ts";

const testInput = "testInput.txt";
const testInput2 = "testInput2.txt";
const challengeInput = "datastream.txt";


Deno.test("testInput returns a number with packet method", async () => {
  const result = await getBufferSize(testInput, "packet");

  assertEquals("number", typeof (result));
});

Deno.test("testInput returns 7 with packet method", async () => {
  const result = await getBufferSize(testInput, "packet");

  assertEquals(7, result);
});

Deno.test("testInput2 returns 10 with packet method", async () => {
  const result = await getBufferSize(testInput2, "packet");

  assertEquals(10, result);
});

Deno.test("challengeInput returns 1275 with packet method", async () => {
  const result = await getBufferSize(challengeInput, "packet");

  assertEquals(1275, result);
});

Deno.test("testInput returns a number with message method", async () => {
  const result = await getBufferSize(testInput, "message");

  assertEquals("number", typeof (result));
});

Deno.test("testInput returns 7 with message method", async () => {
  const result = await getBufferSize(testInput, "message");

  assertEquals(19, result);
});

Deno.test("testInput2 returns 10 with message method", async () => {
  const result = await getBufferSize(testInput2, "message");

  assertEquals(29, result);
});

Deno.test("challengeInput returns 3605 with message method", async () => {
  const result = await getBufferSize(challengeInput, "message");

  assertEquals(3605, result);
});
