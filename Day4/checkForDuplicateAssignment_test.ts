import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { checkForDuplicateAssignment } from "./checkForDuplicateAssignment.ts";
import { assignmentCouple } from "./types.ts";

const testInput = ["2-4", "6-8"] as assignmentCouple;
const testInput2 = ["2-8", "3-7"] as assignmentCouple;
const testInput3 = ["2-4", "3-7"] as assignmentCouple;
const testInputTooShort = ["2-8"] as assignmentCouple;
const testInputTooLong = ["2-4", "6-8", "3-7"] as assignmentCouple;

Deno.test("testInput returns a number on full", () => {
  const result = checkForDuplicateAssignment(testInput, "full");

  assertEquals("number", typeof (result));
});

Deno.test("non-duplicate returns 0 on full", () => {
  const result = checkForDuplicateAssignment(testInput, "full");

  assertEquals(0, result);
});

Deno.test("duplicate returns 1 on full", () => {
  const result = checkForDuplicateAssignment(testInput2, "full");

  assertEquals(1, result);
});

Deno.test("testInput returns a number on partial", () => {
  const result = checkForDuplicateAssignment(testInput, "partial");

  assertEquals("number", typeof (result));
});

Deno.test("non-duplicate returns 0 on partial", () => {
  const result = checkForDuplicateAssignment(testInput, "partial");

  assertEquals(0, result);
});

Deno.test("partial duplicate returns 1 on partial", () => {
  const result = checkForDuplicateAssignment(testInput3, "partial");

  assertEquals(1, result);
});

Deno.test("testInputTooShort throws proper error", () => {
  assertThrows(
    () => {
      checkForDuplicateAssignment(testInputTooShort, "full");
    },
    Error,
    "Couple too short",
  );
});

Deno.test("testInputTooLong throws proper error", () => {
  assertThrows(
    () => {
      checkForDuplicateAssignment(testInputTooLong, "full");
    },
    Error,
    "Couple too long",
  );
});
