import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { playKeepAway } from "../playKeepAway.ts";
import { getTestMonkeys, getTestMonkeysPart2 } from "./testMonkeys.ts";

Deno.test("Playing 20 rounds gives all monkeys the correct totalItemsProcessed", () => {
  const resultMonkeys = playKeepAway(getTestMonkeys(), 20, 96577);

  assertEquals(resultMonkeys[0].getTotalItemsInspected(), 101);
  assertEquals(resultMonkeys[1].getTotalItemsInspected(), 95);
  assertEquals(resultMonkeys[2].getTotalItemsInspected(), 7);
  assertEquals(resultMonkeys[3].getTotalItemsInspected(), 105);
});

Deno.test("Playing 20 rounds during extraWorrying circumstances gives all monkeys the correct totalItemsProcessed", () => {
  const resultMonkeys = playKeepAway(getTestMonkeysPart2(), 20, 96577);

  assertEquals(resultMonkeys[0].getTotalItemsInspected(), 99);
  assertEquals(resultMonkeys[1].getTotalItemsInspected(), 97);
  assertEquals(resultMonkeys[2].getTotalItemsInspected(), 8);
  assertEquals(resultMonkeys[3].getTotalItemsInspected(), 103);
});

Deno.test("Playing 10000 rounds during extraWorrying circumstances gives all monkeys the correct totalItemsProcessed", () => {
  const resultMonkeys = playKeepAway(getTestMonkeysPart2(), 10000, 96577);

  assertEquals(resultMonkeys[0].getTotalItemsInspected(), 52166);
  assertEquals(resultMonkeys[1].getTotalItemsInspected(), 47830);
  assertEquals(resultMonkeys[2].getTotalItemsInspected(), 1938);
  assertEquals(resultMonkeys[3].getTotalItemsInspected(), 52013);
});
