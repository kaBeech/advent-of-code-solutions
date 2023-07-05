import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { testMonkeys } from "./testMonkeys.ts";
import { populateMonkeys } from "../populateMonkeys.ts";

const testInput = "tests/testInput.txt";

Deno.test("testMonkeys returns 10605", async () => {
  const result = await populateMonkeys(testInput);

  assertEquals(result, testMonkeys);
});
