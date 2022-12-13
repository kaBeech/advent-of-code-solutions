import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { checkVisibility } from "./checkVisibility.ts";
import { parseTreesString } from "./parseTreesString.ts";

const testTreeMap = await parseTreesString("testInput.txt");
const testTreeMap2 = await parseTreesString("testInput2.txt");

Deno.test("testTreeMap returns a boolean", () => {
  const result = checkVisibility(24, testTreeMap, 0);

  assertEquals(typeof (result), "boolean");
});

Deno.test("visible tree  at the edge (in negative direction) returns true", () => {
  const result = checkVisibility(7, testTreeMap2, 0);

  assertEquals(result, true);
});

Deno.test("visible tree in the middle (in positive direction) returns true", () => {
  const result = checkVisibility(13, testTreeMap, 2);

  assertEquals(result, true);
});

Deno.test("non-visible tree in positive direction returns false", () => {
  const result = checkVisibility(24, testTreeMap2, 3);

  assertEquals(result, false);
});

Deno.test("non-visible tree in negative direction returns false", () => {
  const result = checkVisibility(5, testTreeMap, 1);

  assertEquals(result, false);
});

Deno.test("calling with index outside of domain throws error", () => {
  assertThrows(
    () => {
      checkVisibility(24000, testTreeMap, 2);
    },
    Error,
    "Index must be within domain! Received Index: 24000, Domain: 0-24",
  );
});

Deno.test("calling with a non-integer index throws error", () => {
  assertThrows(
    () => {
      checkVisibility(24.5, testTreeMap, 2);
    },
    Error,
    "Index must be a positive integer! Received: 24.5",
  );
});