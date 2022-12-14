import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import {
  convertMultiLineFileToArray,
  convertMultiParagraphFileToArray,
} from "../conversionFunctions/convertFileToArray.ts";

Deno.test("testInputMultiLine returns an array of strings", async () => {
  const result = await convertMultiLineFileToArray("testInputMultiLine.txt");

  assertEquals("string", typeof (result[0]));
});

Deno.test("testInputMultiLine returns the expected array", async () => {
  const result = await convertMultiLineFileToArray("testInputMultiLine.txt");

  assertEquals(["1", "2", "3"], result);
});

Deno.test("testInputMultiLine2 returns the expected array", async () => {
  const result = await convertMultiLineFileToArray("testInputMultiLine2.txt");

  assertEquals(["x", "y", "z"], result);
});

Deno.test("testInputMultiParagraph returns an array of arrays of strings", async () => {
  const result = await convertMultiParagraphFileToArray(
    "testInputMultiParagraph.txt",
  );

  assertEquals("string", typeof (result[0][0]));
});

Deno.test("testInputMultiParagraph returns the expected array", async () => {
  const result = await convertMultiParagraphFileToArray(
    "testInputMultiParagraph.txt",
  );

  assertEquals([["1"], ["2", "3"]], result);
});

Deno.test("testInputMultiParagraph2 returns the expected array", async () => {
  const result = await convertMultiParagraphFileToArray(
    "testInputMultiParagraph2.txt",
  );

  assertEquals([["x", "y"], ["z"]], result);
});
