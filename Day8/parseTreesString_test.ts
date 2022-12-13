import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { parseTreesString } from "./parseTreesString.ts";

const testInput = "testInput.txt";
const testInput2 = "testInput2.txt";

Deno.test("every tree returned has a visibility array that is 4 elements long", async () => {
  const result = await parseTreesString(testInput);
  let invalidVisibilityCounter = 0;
  for (const tree of result.trees) {
    if (tree.visibility.length !== 4) {
      invalidVisibilityCounter += 1;
      console.log(tree.visibility);
    }
  }

  assertEquals(0, invalidVisibilityCounter);
});

Deno.test("every tree returned has a location array that is 2 elements long", async () => {
  const result = await parseTreesString(testInput);
  let invalidLocationCounter = 0;
  for (const tree of result.trees) {
    if (tree.location.length !== 2) {
      invalidLocationCounter += 1;
      console.log(tree.location);
    }
  }

  assertEquals(0, invalidLocationCounter);
});

Deno.test("every tree returned has a location array composed of integers", async () => {
  const result = await parseTreesString(testInput);
  let invalidLocationCounter = 0;
  for (const tree of result.trees) {
    if (tree.location[0] % 1 !== 0 || tree.location[1] % 1 !== 0) {
      invalidLocationCounter += 1;
      console.log(tree.location);
    }
  }

  assertEquals(0, invalidLocationCounter);
});

Deno.test("testInput returns an object incuding an integer reporting the sideLength", async () => {
  const result = await parseTreesString(testInput);

  assertEquals(0, result.sideLength % 1);
});

Deno.test("testInput returns 25 Trees", async () => {
  const result = await parseTreesString(testInput);

  assertEquals(25, result.trees.length);
});

Deno.test("testInput returns 5 sideLength", async () => {
  const result = await parseTreesString(testInput);

  assertEquals(5, result.sideLength);
});

Deno.test("testInput2 returns 49 Trees", async () => {
  const result = await parseTreesString(testInput2);

  assertEquals(49, result);
});

Deno.test("testInput2 returns 7 sideLength", async () => {
  const result = await parseTreesString(testInput2);

  assertEquals(7, result);
});
