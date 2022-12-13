import {
  assertEquals,
  assertRejects,
  assertThrows,
} from "https://deno.land/std@0.167.0/testing/asserts.ts";
import {
  convertMultiLineFileToArray,
  convertMultiParagraphFileToArray,
  convertXYCoordinatesToIndexNumber,
} from "./conversionFunctions.ts";

const testInputMultiLine = "testInputMultiLine.txt";
const testInputMultiParagraph = "testInputMultiParagraph.txt";

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

Deno.test("testInputMultiLine returns an array of strings", async () => {
  const result = await convertMultiLineFileToArray(testInputMultiLine);

  assertEquals("array", typeof (result));
  assertEquals("string", typeof (result[0]));
});

Deno.test("testInputMultiLine returns the expected array", async () => {
  const result = await convertMultiLineFileToArray(testInputMultiLine);

  assertEquals(["1", "2", "3"], result);
});

// Deno.test("convertMultiLineFileToArray throws error with unread input", async () => {
//   const result = await convertMultiLineFileToArray(testInputMultiLine);

//   assertRejects();
// });

Deno.test("testInputMultiParagraph returns an array of arrays of strings", async () => {
  const result = await convertMultiParagraphFileToArray(
    testInputMultiParagraph,
  );

  assertEquals("array", typeof (result));
  assertEquals("array", typeof (result[0]));
  assertEquals("string", typeof (result[0][0]));
});

// Deno.test("testInputMultiParagraph the expected array", async () => {
//   const result = await convertMultiParagraphFileToArray(testInputMultiParagraph);

//   assertEquals([["1"], ["2", "3"]], result);
// });

// Deno.test("convertMultiParagraphFileToArray throws error with unread input", async () => {
//   const result = await convertMultiParagraphFileToArray(testInputMultiParagraph);

//   assertEquals(2, result);
// });
