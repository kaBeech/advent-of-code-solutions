
import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { rpsScorer } from "./rpsScorer.ts"

const testInput = "testInput.txt";
const testInput2 = "testInput2.txt";

Deno.test("testInput returns a number", async () => {
    const result = await rpsScorer(testInput);

    assertEquals("number", typeof(result))
});

Deno.test("testInput returns 15", async () => {
    const result = await rpsScorer(testInput);

    assertEquals(15, result)
});

Deno.test("testInput2 returns 20", async () => {
    const result2 = await rpsScorer(testInput2);

    assertEquals(20, result2)
});