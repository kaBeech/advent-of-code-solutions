import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getPrioritiesTotal } from "./getPrioritiesTotal.ts";

const testInput = "testInput.txt";

Deno.test("testInput returns a number", async () => {
    const result = await getPrioritiesTotal(testInput);

    assertEquals("number", typeof(result))
});

Deno.test("testInput returns 0", async () => {
    const result = await getPrioritiesTotal(testInput);

    assertEquals(0, result)
});