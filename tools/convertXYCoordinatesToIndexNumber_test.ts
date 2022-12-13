import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { convertXYCoordinatesToIndexNumber } from "./convertXYCoordinatesToIndexNumber.ts";

Deno.test("calling convertXYCoordinatesToIndexNumber on coordinates less than 2 elements long throws error", () => {
  assertThrows(
    () => {
      convertXYCoordinatesToIndexNumber([4], 25);
    },
    Error,
    "Coordinate array is too short: [4]",
  );
});

Deno.test("calling convertXYCoordinatesToIndexNumber on coordinates more than 2 elements long throws error", () => {
  assertThrows(
    () => {
      convertXYCoordinatesToIndexNumber([4, 8, 16], 25);
    },
    Error,
    "Coordinate array is too long: [4, 8, 16]",
  );
});

Deno.test("calling convertXYCoordinatesToIndexNumber on non-integer coordinates throws error", () => {
  assertThrows(
    () => {
      convertXYCoordinatesToIndexNumber([2.4, 2.5], 5);
    },
    Error,
    "Coordinates must all be integers: [2.4, 2.5]",
  );
});

Deno.test("calling convertXYCoordinatesToIndexNumber on coordinates outside of domain throws error", () => {
  assertThrows(
    () => {
      convertXYCoordinatesToIndexNumber([24, -25], 5);
    },
    Error,
    "Coordinates must all be in domain! Coordinates: [24, -25], Domain: 0-4",
  );
});

Deno.test("calling convertXYCoordinatesToIndexNumber on with a non-integer base throws error", () => {
  assertThrows(
    () => {
      convertXYCoordinatesToIndexNumber([24, 25], 50.2);
    },
    Error,
    "Base must be a positive integer: 50.2",
  );
});

Deno.test("calling convertXYCoordinatesToIndexNumber on with a negative integer base throws error", () => {
  assertThrows(
    () => {
      convertXYCoordinatesToIndexNumber([24, 25], -50);
    },
    Error,
    "Base must be a positive integer: -50",
  );
});

Deno.test("coordinates [2, 4] with base 10 convert to an index of 24", () => {
  const result = convertXYCoordinatesToIndexNumber([2, 4], 10);

  assertEquals(24, result);
});

Deno.test("coordinates [24, 48] with base 68 convert to an index of 1680", () => {
  const result = convertXYCoordinatesToIndexNumber([24, 48], 68);

  assertEquals(1680, result);
});
