import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getMonkeyBusinessLevel } from "../getMonkeyBusinessLevel.ts";
import { testMonkeys } from "./testMonkeys.ts";

Deno.test("testMonkeys returns 10605", () => {
  const result = getMonkeyBusinessLevel(testMonkeys);

  assertEquals(result, 10605);
});
