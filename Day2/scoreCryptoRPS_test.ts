
import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { scoreCryptoRPS } from "./scoreCryptoRPS.ts"

const testInput = "testInput.txt";
const testInput2 = "testInput2.txt";

Deno.test("testInput returns a number", async () => {
    const result = await scoreCryptoRPS(testInput);

    assertEquals("number", typeof(result))
});

Deno.test("testInput returns 15", async () => {
    const result = await scoreCryptoRPS(testInput);

    assertEquals(15, result)
});

Deno.test("testInput2 returns 9", async () => {
    const result2 = await scoreCryptoRPS(testInput2);

    assertEquals(9, result2)
});