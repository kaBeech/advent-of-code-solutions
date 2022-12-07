
import { assertEquals, assertInstanceOf } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { scoreRound } from "./scoreRound.ts"

const testInput = "A Z";
const testInput2 = "B Y";

Deno.test("testInput returns an array", () => {
    const result = scoreRound(testInput);
 
    assertInstanceOf(result, Array)
});

Deno.test("testInput returns [3, 0]", () => {
    const result = scoreRound(testInput);

    assertEquals([3, 0], result)
});

Deno.test("testInput2 returns [2, 3]", () => {
    const result2 = scoreRound(testInput2);

    assertEquals([2, 3], result2)
});
