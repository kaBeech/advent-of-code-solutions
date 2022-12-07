
import { assertArrayIncludes, assertEquals, assertExists } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { rpsScorer } from "./rpsScorer.ts"

const testInput = await Deno.readTextFile("testInput.txt");
const testInput2 = await Deno.readTextFile("testInput2.txt");


Deno.test("testInput returns 15", () => {
    const result = rpsScorer(testInput);

    assertEquals(15, result)
});

Deno.test("testInput2 returns 30", () => {
    const result2 = rpsScorer(testInput2);

    assertEquals(30, result2)
});