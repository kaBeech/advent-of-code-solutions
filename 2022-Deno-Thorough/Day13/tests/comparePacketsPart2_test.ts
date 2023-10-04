import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { comparePacketsPart2 } from "../comparePacketsPart2.ts";

Deno.test("Single-layer arrays: lower value on the left is -1", () => {
  const result = comparePacketsPart2([1, 1, 3, 1, 1], [1, 1, 5, 1, 1]);

  assertEquals(result, -1);
});

Deno.test("Nested arrays: lower value on the left is -1", () => {
  const result = comparePacketsPart2([[1], [2, 3, 4]], [[1], 4]);

  assertEquals(result, -1);
});

Deno.test("Numbers get converted to arrays when compared with arrays", () => {
  const result = comparePacketsPart2([9], [[8, 7, 6]]);

  assertEquals(result, 1);
});

Deno.test("Shorter array on the left is -1", () => {
  const result = comparePacketsPart2([[4, 4], 4, 4], [[4, 4], 4, 4, 4]);

  assertEquals(result, -1);
});

Deno.test("Shorter array on the right is 1", () => {
  const result = comparePacketsPart2([7, 7, 7, 7], [7, 7, 7]);

  assertEquals(result, 1);
});

Deno.test("Empty array on the left is -1", () => {
  const result = comparePacketsPart2([], [3]);

  assertEquals(result, -1);
});

Deno.test("Both arrays empty, but array on the right with deeper nesting is 1", () => {
  const result = comparePacketsPart2([[[]]], [[]]);

  assertEquals(result, 1);
});

Deno.test("Long packets: lower value on the right is 1", () => {
  const result = comparePacketsPart2([1, [2, [3, [4, [5, 6, 7]]]], 8, 9], [
    1,
    [2, [3, [4, [5, 6, 0]]]],
    8,
    9,
  ]);

  assertEquals(result, 1);
});
