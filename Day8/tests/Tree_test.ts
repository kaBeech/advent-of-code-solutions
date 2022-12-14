import { assertEquals, assertThrows } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import Tree from "../Tree.ts";

const testTree = Tree(4, 2, 7);
const testTree2 = Tree(5, 8, 9);

Deno.test("get functions work", () => {
  assertEquals([4,2], testTree.getLocation());
  assertEquals(7, testTree.getHeight());
  assertEquals([null,null,null,null], testTree.getVisibility());
  assertEquals([5,8], testTree2.getLocation());
  assertEquals(9, testTree2.getHeight());
  assertEquals([null,null,null,null], testTree2.getVisibility());
});

Deno.test("setVisibility sets visibility", () => {
  testTree.setVisibility(true, 1);
  testTree2.setVisibility(false, 0);
  assertEquals([null,true,null,null], testTree.getVisibility());
  assertEquals([false,null,null,null], testTree2.getVisibility());
})

Deno.test("calling Tree with a negative integer row throws error", () => {
  assertThrows(
    () => {
      Tree(-4, 2, 7);
    },
    Error,
    "Row must be a positive integer! Received: -4",
  );
});

Deno.test("calling Tree with a non-integer column throws error", () => {
  assertThrows(
    () => {
      Tree(4, 2.4, 7);
    },
    Error,
    "Column must be a positive integer! Received: 2.4",
  );
});