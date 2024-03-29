import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getMonkeyBusinessLevel } from "../getMonkeyBusinessLevel.ts";
import {
  getTestMonkeysAfter20Rounds,
  getTestMonkeysAfter20RoundsPart2,
} from "./testMonkeysAfter20Rounds.ts";

Deno.test("testMonkeys returns 10605", () => {
  const result = getMonkeyBusinessLevel(getTestMonkeysAfter20Rounds());

  assertEquals(result, 10605);
});

Deno.test("testMonkeysPart2 returns 2713310158", () => {
  const result = getMonkeyBusinessLevel(getTestMonkeysAfter20RoundsPart2());

  assertEquals(result, 2713310158);
});
