import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getBadge } from "./getBadge.ts";

const testInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg`;
const testInput2 = `wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

Deno.test("testInput returns a one-character string", () => {
    const result = getBadge(testInput);

    assertEquals("string", typeof(result))
    assertEquals(1, result.length)
});

Deno.test("testInput returns r", () => {
    const result = getBadge(testInput);

    assertEquals("r", result)
});

Deno.test("testInput2 returns Z", () => {
    const result = getBadge(testInput2);

    assertEquals("Z", result)
});