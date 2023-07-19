import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { testTileMap } from "./testObjects.ts";
import { getAdjacentTiles } from "../getAdjacentTiles.ts";

Deno.test("getting adjacent tiles on corner tiles returns 2 tiles", () => {
  assertEquals(
    getAdjacentTiles(testTileMap.allTiles, 0, 0).length,
    2,
  );
});

Deno.test("getting adjacent tiles on side tiles returns 3 tiles", () => {
  assertEquals(
    getAdjacentTiles(testTileMap.allTiles, 0, 1).length,
    3,
  );
});

Deno.test("getting adjacent tiles on middle tiles returns 4 tiles", () => {
  assertEquals(
    getAdjacentTiles(testTileMap.allTiles, 1, 1).length,
    4,
  );
});
