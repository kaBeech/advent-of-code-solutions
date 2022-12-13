import {
  assertEquals,
} from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { convertXYCoordinatesToIndexNumber } from "./convertXYCoordinatesToIndexNumber.ts";

Deno.test("coordinates [4, 2] with base 10 convert to an index of 24", () => {
  const result = convertXYCoordinatesToIndexNumber([4, 2], 10);

  assertEquals(24, result);
});

Deno.test("coordinates [48, 24] with base 68 convert to an index of 1680", () => {
  const result = convertXYCoordinatesToIndexNumber([48, 24], 68);

  assertEquals(1680, result);
});