import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { testMonkeyStates, testMonkeyStatesPart2 } from "./testMonkeys.ts";
import { populateMonkeys } from "../populateMonkeys.ts";

const testInput = "tests/testInput.txt";

Deno.test("populateMonkeys sets the correct monkeyState for each monkey", async () => {
  const result = await populateMonkeys(testInput, false, "test");

  result.forEach((monkeyState, index) => {
    assertEquals(monkeyState, testMonkeyStates[index]);
  });
});

Deno.test("populateMonkeys sets the correct monkeyState for each monkey during extraWorrying circumstacnes", async () => {
  const result = await populateMonkeys(testInput, false, "test");

  result.forEach((monkeyState, index) => {
    assertEquals(monkeyState, testMonkeyStatesPart2[index]);
  });
});
