import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getMonkeyBusinessLevel } from "../getMonkeyBusinessLevel.ts";
import { testMonkeysAfter20Rounds } from "./testMonkeysAfter20Rounds.ts";

Deno.test("testMonkeys returns 10605", () => {
  const result = getMonkeyBusinessLevel(testMonkeysAfter20Rounds);

  assertEquals(result, 10605);
});
