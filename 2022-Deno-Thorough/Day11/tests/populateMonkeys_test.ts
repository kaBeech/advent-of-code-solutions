import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { testMonkeys, testMonkeyStates } from "./testMonkeys.ts";
import { populateMonkeys } from "../populateMonkeys.ts";

const testInput = "tests/testInput.txt";

// Deno.test("populateMonkeys creates monkeys", async () => {
//   const result = await populateMonkeys(testInput);
//   assertEquals(result, testMonkeys);
// });

Deno.test("populateMonkeys sets the correct monkeyState for each monkey", async () => {
  const result = await populateMonkeys(testInput, "test");

  result.forEach((monkeyState, index) => {
    assertEquals(monkeyState, testMonkeyStates[index]);
  });
});
