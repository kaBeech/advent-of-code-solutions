import {
  assertEquals,
  assertThrows,
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

Deno.test("calling with a negative integer base throws error", () => {
  assertThrows(
    () => {
      convertXYCoordinatesToIndexNumber([24, 25], -50);
    },
    Error,
    "Base must be a positive integer! Received: -50",
  );
});

Deno.test("calling with a non-integer base throws error", () => {
  assertThrows(
    () => {
      convertXYCoordinatesToIndexNumber([24, 25], 50.2);
    },
    Error,
    "Base must be a positive integer! Received: 50.2",
  );
});