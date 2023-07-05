import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { playKeepAway } from "../playKeepAway.ts";
import { testMonkeys } from "./testMonkeys.ts";

Deno.test("Playing 200 rounds gives all monkeys the correct totalItemsProcessed", () => {
  const resultMonkeys = playKeepAway(testMonkeys, 20);

  assertEquals(resultMonkeys[0].getTotalItemsInspected(), 101);
  assertEquals(resultMonkeys[1].getTotalItemsInspected(), 95);
  assertEquals(resultMonkeys[2].getTotalItemsInspected(), 7);
  assertEquals(resultMonkeys[3].getTotalItemsInspected(), 105);
});
