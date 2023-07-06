import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import {
  getTestMonkeyStates,
  getTestMonkeyStatesPart2,
} from "./testMonkeys.ts";
import { populateMonkeys } from "../populateMonkeys.ts";

const testInput = "tests/testInput.txt";

Deno.test("populateMonkeys sets the correct monkeyState for each monkey", async () => {
  const result = await populateMonkeys(testInput, false, "test");

  result.forEach((monkeyState, index) => {
    assertEquals(monkeyState, getTestMonkeyStates()[index]);
  });
});

Deno.test("populateMonkeys sets the correct monkeyState for each monkey during extraWorrying circumstances", async () => {
  const result = await populateMonkeys(testInput, false, "test");

  result.forEach((monkeyState, index) => {
    assertEquals(monkeyState, getTestMonkeyStatesPart2()[index]);
  });
});
