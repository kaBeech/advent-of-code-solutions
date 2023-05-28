import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getRPSScoreTotal } from "./getRPSScoreTotal.ts";

const testInput = "testInput.txt";
const testInput2 = "testInput2.txt";

Deno.test("testInput returns a number", async () => {
  const result = await getRPSScoreTotal(testInput, "simple");

  assertEquals("number", typeof (result));
});

Deno.test("testInput returns 15 with simple method", async () => {
  const result = await getRPSScoreTotal(testInput, "simple");

  assertEquals(15, result);
});

Deno.test("testInput2 returns 9 with simple method", async () => {
  const result2 = await getRPSScoreTotal(testInput2, "simple");

  assertEquals(9, result2);
});

Deno.test("testInput returns 12 with crypto method", async () => {
  const result = await getRPSScoreTotal(testInput, "crypto");

  assertEquals(12, result);
});

Deno.test("testInput2 returns 14 with crypto method", async () => {
  const result2 = await getRPSScoreTotal(testInput2, "crypto");

  assertEquals(14, result2);
});
