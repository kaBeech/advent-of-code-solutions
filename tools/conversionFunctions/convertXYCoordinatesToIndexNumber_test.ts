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

Deno.test("calling with with a negative integer base throws error", () => {
  assertThrows(
    () => {
      convertXYCoordinatesToIndexNumber([24, 25], -50);
    },
    Error,
    "Base must be a positive integer! Recevied: -50",
  );
});

Deno.test("calling with with a non-integer base throws error", () => {
  assertThrows(
    () => {
      convertXYCoordinatesToIndexNumber([24, 25], 50.2);
    },
    Error,
    "Base must be a positive integer! Received: 50.2",
  );
});

Deno.test("calling with coordinates less than 2 elements long throws error", () => {
  assertThrows(
    () => {
      convertXYCoordinatesToIndexNumber([4], 25);
    },
    Error,
    "Coordinate array must have 2 elements - input is too short! Received: [4]",
  );
});

Deno.test("calling with coordinates more than 2 elements long throws error", () => {
  assertThrows(
    () => {
      convertXYCoordinatesToIndexNumber([4, 8, 16], 25);
    },
    Error,
    "Coordinate array must have 2 elements - input is too long! Received: [4,8,16]",
  );
});

Deno.test("calling with non-integer coordinates throws error", () => {
  assertThrows(
    () => {
      convertXYCoordinatesToIndexNumber([2.4, 2.5], 5);
    },
    Error,
    "Coordinates must all be integers! Received: [2.4,2.5]",
  );
});

Deno.test("calling with negative coordinates throws error", () => {
  assertThrows(
    () => {
      convertXYCoordinatesToIndexNumber([24, -5], 25);
    },
    Error,
    "Coordinates must all be in domain! Received Coordinates: [24,-5], Domain: 0 to 24",
  );
});

Deno.test("calling with coordinates outside of domain throws error", () => {
  assertThrows(
    () => {
      convertXYCoordinatesToIndexNumber([24, 25], 25);
    },
    Error,
    "Coordinates must all be in domain! Received Coordinates: [24,25], Domain: 0 to 24",
  );
});