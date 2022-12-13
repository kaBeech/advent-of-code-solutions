import { assertEquals, assertThrows } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { checkVisibility } from "./checkVisibility.ts";
import { TreeMap } from "./types.ts";

const testTreeMap = 0 as unknown as TreeMap;
const testTreeMap2 = 0 as unknown as TreeMap;

Deno.test("testTreeMap returns a boolean", () => {
  const result = checkVisibility(24, testTreeMap, 0);

  assertEquals("boolean", typeof (result));
});

Deno.test("visible tree  at the edge (in negative direction) returns true", () => {
  const result = checkVisibility(8, testTreeMap2, 0);

  assertEquals(true, result)
})

Deno.test("visible tree in the middle (in positive direction) returns true", () => {
  const result = checkVisibility(24, testTreeMap, 2);

  assertEquals(true, result)
})

Deno.test("non-visible tree in positive direction returns false", () => {
  const result = checkVisibility(24, testTreeMap2, 3);

  assertEquals(false, result)
})

Deno.test("non-visible tree in negative direction returns false", () => {
  const result = checkVisibility(5, testTreeMap, 1);

  assertEquals(false, result)
})

Deno.test("calling with a non-integer index throws error", () => {
  assertThrows(
    () => {
      checkVisibility(24.5, testTreeMap, 2);
    },
    Error,
    "Index must be a positive integer: 24.5",
  );
});

Deno.test("calling with index outside of domain throws error", () => {
  assertThrows(
    () => {
      checkVisibility(24000, testTreeMap, 2);
    },
    Error,
    "Index must be within domain! Index: 24000, Domain: 0-24",
  );
});