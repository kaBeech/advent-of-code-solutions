import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { checkForDuplicateAssignment } from "./checkForDuplicateAssignment.ts";
import { assignmentCouple } from "./types.ts";

const testInput = ["2-4", "6-8"] as assignmentCouple;
const testInput2 = ["2-8", "3-7"] as assignmentCouple;
const testInputTooShort = ["2-8"] as assignmentCouple;
const testInputTooLong = ["2-4", "6-8", "3-7"] as assignmentCouple;

Deno.test("testInput returns a number", () => {
  const result = checkForDuplicateAssignment(testInput);

  assertEquals("number", typeof (result));
});

Deno.test("non-duplicate returns 0", () => {
  const result = checkForDuplicateAssignment(testInput);

  assertEquals(0, result);
});

Deno.test("duplicate returns 1", () => {
  const result = checkForDuplicateAssignment(testInput2);

  assertEquals(1, result);
});

Deno.test("testInputTooShort throws proper error", () => {
  checkForDuplicateAssignment(testInputTooShort);

  assertThrows(
    () => {
      checkForDuplicateAssignment(testInputTooShort);
    },
    Error,
    "Couple too short!",
  );
});

Deno.test("testInputTooLong throws proper error", () => {
  checkForDuplicateAssignment(testInputTooLong);

  assertThrows(
    () => {
      checkForDuplicateAssignment(testInputTooLong);
    },
    Error,
    "Couple too long!",
  );
});
