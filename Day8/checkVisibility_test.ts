import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { checkVisibility } from "./checkVisibility.ts";
import { parseTreesString } from "./parseTreesString.ts";


const testTreeMap = parseTreesString("testInput.txt")
const testTreeMap2 = parseTreesString("testInput2.txt")

Deno.test("testTreeMap returns a boolean", async () => {
  const result = checkVisibility(24, await testTreeMap, 0);

  assertEquals(typeof (result), "boolean");
});

Deno.test("visible tree  at the edge (in negative direction) returns true", async () => {
  const result = checkVisibility(7, await testTreeMap2, 0);

  assertEquals(result, true);
});

Deno.test("visible tree in the middle (in positive direction) returns true", async () => {
  const result = checkVisibility(13, await testTreeMap, 2);

  assertEquals(result, true);
});

Deno.test("non-visible tree in positive direction returns false", async () => {
  const result = checkVisibility(24, await testTreeMap2, 3);

  assertEquals(result, false);
});

Deno.test("non-visible tree in negative direction returns false", async () => {
  const result = checkVisibility(5, await testTreeMap, 1);

  assertEquals(result, false);
});

Deno.test("calling with a non-integer index throws error", () => {
  assertThrows(
    async () => {
      checkVisibility(24.5, await testTreeMap, 2);
    },
    Error,
    "Index must be a positive integer: 24.5",
  );
});

Deno.test("calling with index outside of domain throws error", () => {
  assertThrows(
    async () => {
      checkVisibility(24000, await testTreeMap, 2);
    },
    Error,
    "Index must be within domain! Index: 24000, Domain: 0-24",
  );
});
