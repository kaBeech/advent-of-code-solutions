import {
  assertEquals,
  assertRejects,
} from "https://deno.land/std@0.167.0/testing/asserts.ts";
import {
  convertMultiLineFileToArray,
  convertMultiParagraphFileToArray,
} from "./conversionFunctions.ts";

const testInputMultiLine = "testInputMultiLine.txt";
const testInputMultiParagraph = "testInputMultiParagraph.txt";

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
