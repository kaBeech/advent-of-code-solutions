import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getDuplicateItem } from "./getDuplicateItem.ts";

const testInput = "vJrwpWtwJgWrhcsFMMfFFhFp";
const testInput2 = "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL";

Deno.test("testInput returns a one-character string", async () => {
    const result = await getDuplicateItem(testInput);

    assertEquals("string", typeof(result))
    assertEquals(1, result.length)
});

Deno.test("testInput returns p", async () => {
    const result = await getDuplicateItem(testInput);

    assertEquals("p", result)
});

Deno.test("testInput2 returns L", async () => {
    const result = await getDuplicateItem(testInput2);

    assertEquals("L", result)
});