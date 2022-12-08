import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getTopCrates } from "./getTopCrates.ts";

const testInput = "testInput.txt";
const testInput2 = "testInput2.txt";
const challengeInput = "instructions.txt";

Deno.test("testInput returns a number with single method", async () => {
  const result = await getTopCrates(testInput, "single");

  assertEquals("string", typeof (result));
});

Deno.test("testInput returns 'CMZ' with single method", async () => {
  const result = await getTopCrates(testInput, "single");

  assertEquals("CMZ", result);
});

Deno.test("testInput2 returns 'ZQW' with single method", async () => {
  const result = await getTopCrates(testInput2, "single");

  assertEquals("ZQW", result);
});

Deno.test("part1Input returns 'CVCWCRTVQ' with single method", async () => {
  const result = await getTopCrates(challengeInput, "single");

  assertEquals("CVCWCRTVQ", result);
});

Deno.test("testInput returns a number with bulk method", async () => {
  const result = await getTopCrates(testInput, "bulk");

  assertEquals("string", typeof (result));
});

Deno.test("testInput returns 'MCD' with bulk method", async () => {
  const result = await getTopCrates(testInput, "bulk");

  assertEquals("MCD", result);
});

Deno.test("testInput2 returns 'NQW' with bulk method", async () => {
  const result = await getTopCrates(testInput2, "bulk");

  assertEquals("NQW", result);
});

Deno.test("part1Input returns 'CVCWCRTVQ' with bulk method", async () => {
  const result = await getTopCrates(challengeInput, "bulk");

  assertEquals("CVCWCRTVQ", result);
});