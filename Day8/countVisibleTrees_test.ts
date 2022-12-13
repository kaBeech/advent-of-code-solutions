import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { countVisibleTrees } from "./countVisibleTrees.ts";
import { parseTreesString } from "./parseTreesString.ts";

const testTreeMap = await parseTreesString("testInput.txt");
const testTreeMap2 = await parseTreesString("testInput2.txt");

Deno.test("testTreeMap returns a number", () => {
  const result = countVisibleTrees(24, testTreeMap, 0);

  assertEquals(typeof (result), "number");
});

Deno.test("tree  at the edge (in negative direction) returns 0", () => {
  const result = countVisibleTrees(7, testTreeMap2, 0);

  assertEquals(result, 0);
});

Deno.test("tree counting is blocked by tree of same height (in positive direction)", () => {
  const result = countVisibleTrees(12, testTreeMap, 2);

  assertEquals(result, 1);
});

Deno.test("tree counting is not blocked by shorter trees (in positive direction)", () => {
  const result = countVisibleTrees(27, testTreeMap2, 3);

  assertEquals(result, 3);
});

Deno.test("tree counting is blocked by taller tree (in negative direction)", () => {
  const result = countVisibleTrees(5, testTreeMap, 1);

  assertEquals(result, 1);
});

Deno.test("calling with index outside of domain throws error", () => {
  assertThrows(
    () => {
      countVisibleTrees(24000, testTreeMap, 2);
    },
    Error,
    "Index must be within domain! Received Index: 24000, Domain: 0-24",
  );
});

Deno.test("calling with a non-integer index throws error", () => {
  assertThrows(
    () => {
      countVisibleTrees(24.5, testTreeMap, 2);
    },
    Error,
    "Index must be a positive integer! Received: 24.5",
  );
});