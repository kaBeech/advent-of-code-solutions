
import { assertEquals, assertInstanceOf } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { scoreRoundCrypto } from "./scoreRoundCrypto.ts"

const testInput = "B Z";
const testInput2 = "B Y";

Deno.test("testInput returns an array", () => {
    const result = scoreRoundCrypto(testInput);
 
    assertInstanceOf(result, Array)
});

Deno.test("testInput returns [2, 6]", () => {
    const result = scoreRoundCrypto(testInput);

    assertEquals([3, 6], result)
});

Deno.test("testInput2 returns [2, 3]", () => {
    const result2 = scoreRoundCrypto(testInput2);

    assertEquals([2, 3], result2)
});
