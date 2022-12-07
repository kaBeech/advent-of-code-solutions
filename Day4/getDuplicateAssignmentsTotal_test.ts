import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getDuplicateAssignmentsTotal } from "./getDuplicateAssignmentsTotal.ts";

const testInput = "testInput.txt";
const testInput2 = "testInput2.txt";

Deno.test("testInput returns a number", async () => {
  const result = await getDuplicateAssignmentsTotal(testInput);

  assertEquals("number", typeof (result));
});

Deno.test("testInput returns 2", async () => {
  const result = await getDuplicateAssignmentsTotal(testInput);

  assertEquals(2, result);
});

Deno.test("testInput2 returns 4", async () => {
  const result = await getDuplicateAssignmentsTotal(testInput);

  assertEquals(4, result);
});
