import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { getDuplicateAssignmentsTotal } from "./getDuplicateAssignmentsTotal.ts";

const testInput = "testInput.txt";
const testInput2 = "testInput2.txt";

Deno.test("testInput returns a number on full", async () => {
  const result = await getDuplicateAssignmentsTotal(testInput, "full");

  assertEquals("number", typeof (result));
});

Deno.test("testInput returns 2 on full", async () => {
  const result = await getDuplicateAssignmentsTotal(testInput, "full");

  assertEquals(2, result);
});

Deno.test("testInput2 returns 4 on full", async () => {
  const result = await getDuplicateAssignmentsTotal(testInput2, "full");

  assertEquals(4, result);
});

Deno.test("testInput returns a number on partial", async () => {
  const result = await getDuplicateAssignmentsTotal(testInput, "partial");

  assertEquals("number", typeof (result));
});

Deno.test("testInput returns 4 on partial", async () => {
  const result = await getDuplicateAssignmentsTotal(testInput, "partial");

  assertEquals(4, result);
});

Deno.test("testInput2 returns 6 on partial", async () => {
  const result = await getDuplicateAssignmentsTotal(testInput2, "partial");

  assertEquals(6, result);
});