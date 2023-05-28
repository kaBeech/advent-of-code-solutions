import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { handleSingleMove } from "../handleSingleMove.ts";
import { XYCoordinate } from "../../tools/commonTypes.ts";

const testCurrentPosition1: XYCoordinate = [0, 0];
const testCurrentPosition2: XYCoordinate = [24, -37];

Deno.test("move in upwards direction returns proper coordinates", () => {
  const result1 = handleSingleMove(testCurrentPosition1, "U");
  const result2 = handleSingleMove(testCurrentPosition2, "U");

  assertEquals(result1, [0, 1]);
  assertEquals(result2, [24, -36]);
});

Deno.test("move in downwards direction returns proper coordinates", () => {
  const result1 = handleSingleMove(testCurrentPosition1, "D");
  const result2 = handleSingleMove(testCurrentPosition2, "D");

  assertEquals(result1, [0, -1]);
  assertEquals(result2, [24, -38]);
});

Deno.test("move in left direction returns proper coordinates", () => {
  const result1 = handleSingleMove(testCurrentPosition1, "L");
  const result2 = handleSingleMove(testCurrentPosition2, "L");

  assertEquals(result1, [-1, 0]);
  assertEquals(result2, [23, -37]);
});

Deno.test("move in right direction returns proper coordinates", () => {
  const result1 = handleSingleMove(testCurrentPosition1, "R");
  const result2 = handleSingleMove(testCurrentPosition2, "R");

  assertEquals(result1, [1, 0]);
  assertEquals(result2, [25, -37]);
});
