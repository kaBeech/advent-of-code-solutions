import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import {
  testExplorerState,
  testExplorerStateOnCornerTile,
  testExplorerStateOnSideTile,
} from "./testObjects.ts";
import { getAdjacentTiles } from "../getAdjacentTiles.ts";

Deno.test("getting adjacent tiles on corner tiles returns 2 tiles", () => {
  assertEquals(getAdjacentTiles(testExplorerStateOnCornerTile).length, 2);
});

Deno.test("getting adjacent tiles on side tiles returns 3 tiles", () => {
  assertEquals(getAdjacentTiles(testExplorerStateOnSideTile).length, 3);
});

Deno.test("getting adjacent tiles on middle tiles returns 4 tiles", () => {
  assertEquals(getAdjacentTiles(testExplorerState).length, 4);
});
