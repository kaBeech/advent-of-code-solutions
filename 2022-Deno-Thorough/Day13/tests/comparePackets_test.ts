import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { comparePackets } from "../comparePackets.ts";

Deno.test("Single-layer arrays: lower value on the left is right order", () => {
  const result = comparePackets([1, 1, 3, 1, 1], [1, 1, 5, 1, 1]);

  assertEquals(result, "right order");
});

Deno.test("Nested arrays: lower value on the left is right order", () => {
  const result = comparePackets([[1], [2, 3, 4]], [[1], 4]);

  assertEquals(result, "right order");
});

Deno.test("Numbers get converted to arrays when compared with arrays", () => {
  const result = comparePackets([9], [[8, 7, 6]]);

  assertEquals(result, "wrong order");
});

Deno.test("Shorter array on the left is right order", () => {
  const result = comparePackets([[4, 4], 4, 4], [[4, 4], 4, 4, 4]);

  assertEquals(result, "right order");
});

Deno.test("Shorter array on the right is wrong order", () => {
  const result = comparePackets([7, 7, 7, 7], [7, 7, 7]);

  assertEquals(result, "wrong order");
});

Deno.test("Empty array on the left is right order", () => {
  const result = comparePackets([], [3]);

  assertEquals(result, "right order");
});

Deno.test("Both arrays empty, but array on the right with deeper nesting is wrong order", () => {
  const result = comparePackets([[[]]], [[]]);

  assertEquals(result, "wrong order");
});

Deno.test("Long packets: lower value on the right is wrong order", () => {
  const result = comparePackets([1, [2, [3, [4, [5, 6, 7]]]], 8, 9], [
    1,
    [2, [3, [4, [5, 6, 0]]]],
    8,
    9,
  ]);

  assertEquals(result, "wrong order");
});
