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

  assertEquals("boolean", typeof (result));
});

Deno.test("visible tree  at the edge (in negative direction) returns true", async () => {
  const result = checkVisibility(8, await testTreeMap2, 0);

  assertEquals(true, result);
});

Deno.test("visible tree in the middle (in positive direction) returns true", async () => {
  const result = checkVisibility(24, await testTreeMap, 2);

  assertEquals(true, result);
});

Deno.test("non-visible tree in positive direction returns false", async () => {
  const result = checkVisibility(24, await testTreeMap2, 3);

  assertEquals(false, result);
});

Deno.test("non-visible tree in negative direction returns false", async () => {
  const result = checkVisibility(5, await testTreeMap, 1);

  assertEquals(false, result);
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
