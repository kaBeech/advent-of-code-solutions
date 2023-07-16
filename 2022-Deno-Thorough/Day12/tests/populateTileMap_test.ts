import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { populateTileMap } from "../populateTileMap.ts";

const testTileMap = await populateTileMap("tests/testInput.txt");

Deno.test("testTileMap has 5 rows", () => {
  assertEquals(testTileMap.allTiles.length, 5);
});

Deno.test("testTileMap has 8 columns", () => {
  assertEquals(testTileMap.allTiles[0].length, 8);
});

Deno.test("testTileMap has startTile", () => {
  assertEquals(testTileMap.startTile.getElevation(), "a");
});

Deno.test("testTileMap has endTile", () => {
  assertEquals(testTileMap.endTile.getElevation(), "z");
});
