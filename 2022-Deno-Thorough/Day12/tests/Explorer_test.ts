import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { Explorer } from "../Explorer.ts";
import { populateTileMap } from "../populateTileMap.ts";

const testTileMap = await populateTileMap("tests/testInput.txt");

const testExplorer = Explorer(testTileMap.startTile, testTileMap.endTile);

Deno.test("exploring the testTileMap yields shortestPath of 31 steps", () => {
  assertEquals(testExplorer.findShortestPath(), 31);
});
