import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getDuplicateAssignmentsTotal } from "./getDuplicateAssignmentsTotal.ts";

const testInput = "testInput.txt";

Deno.test("testInput returns a number", async () => {
  const result = await getDuplicateAssignmentsTotal(testInput);

  assertEquals("number", typeof (result));
});

Deno.test("testInput returns 2", async () => {
  const result = await getDuplicateAssignmentsTotal(testInput);

  assertEquals(2, result);
});
