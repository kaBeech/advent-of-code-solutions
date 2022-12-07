
import { assertEquals, assertInstanceOf } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { rpsScorer } from "./rpsScorer.ts"

const testInput = "testInput.txt";
const testInput2 = "testInput2.txt";

Deno.test("testInput returns a number", async () => {
    const result = await rpsScorer(testInput);

    assertInstanceOf(result, Number)
});

Deno.test("testInput returns 15", async () => {
    const result = await rpsScorer(testInput);

    assertEquals(15, result)
});

Deno.test("testInput2 returns 30", async () => {
    const result2 = await rpsScorer(testInput2);

    assertEquals(30, result2)
});