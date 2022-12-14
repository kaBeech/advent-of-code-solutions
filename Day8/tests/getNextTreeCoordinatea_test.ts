import {
  assertEquals,
} from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getNextTreeCoordinates } from "../getNextTreeCoordinates.ts";

Deno.test("correct coordinates are returned for direction 0", () => {
  const result = getNextTreeCoordinates([57, 32], 99, 0);

  assertEquals(result, [56, 32]);
});

Deno.test("correct coordinates are returned for direction 1", () => {
  const result = getNextTreeCoordinates([57, 32], 99, 1);

  assertEquals(result, [57, 31]);
});

Deno.test("correct coordinates are returned for direction 2", () => {
  const result = getNextTreeCoordinates([57, 32], 99, 2);

  assertEquals(result, [58, 32]);
});

Deno.test("correct coordinates are returned for direction 3", () => {
  const result = getNextTreeCoordinates([57, 32], 99, 3);

  assertEquals(result, [57, 33]);
});