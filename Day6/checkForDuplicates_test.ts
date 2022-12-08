import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { checkForDuplicates } from "./checkForDuplicates.ts";

const testInput = ["A", "b", "C", "D"];
const testInput2 = ["b", "b", "Z", "X"];

Deno.test("testInput returns a boolean", () => {
  const result =  checkForDuplicates(testInput);

  assertEquals("boolean", typeof (result));
});

Deno.test("testInput returns false", () => {
  const result = checkForDuplicates(testInput);

  assertEquals(false, result);
});

Deno.test("testInput2 returns true", () => {
  const result = checkForDuplicates(testInput2);

  assertEquals(true, result);
});