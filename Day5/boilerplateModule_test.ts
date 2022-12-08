import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { boilerplateFunction } from "./boilerplateModule.ts";

const testInput = "testInput.txt";

Deno.test("testInput returns a number", async () => {
  const result = await boilerplateFunction(testInput);

  assertEquals("number", typeof (result));
});

Deno.test("testInput returns 0", async () => {
  const result = await boilerplateFunction(testInput);

  assertEquals(0, result);
});
