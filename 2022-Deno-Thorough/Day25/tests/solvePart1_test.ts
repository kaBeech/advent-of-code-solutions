
import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { solvePart1 } from "../solvePart1.ts";

const testInput = "./tests/test_input.dat";

Deno.test("testInput returns 2=-1=0", async () => {
    const result = await solvePart1(testInput);

    assertEquals(result, "2=-1=0");

});
