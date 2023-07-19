import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { testTileMap } from "./testObjects.ts";

const testStartTile = testTileMap.startTile;

const testEndTile = testTileMap.endTile;

const testRandomTile = testTileMap.allTiles[3][4];

Deno.test("getting coordinates on startTile returns {x: 0, y: 0}", () => {
  assertEquals(testStartTile.getCoordinates(), { x: 0, y: 0 });
});

Deno.test("getting elevation on startTile returns 1", () => {
  assertEquals(testStartTile.getElevation(), 1);
});

Deno.test("getting coordinates on endTile returns {x: 5, y: 2}", () => {
  assertEquals(testEndTile.getCoordinates(), { x: 5, y: 2 });
});

Deno.test("getting elevation on endTile returns 26", () => {
  assertEquals(testEndTile.getElevation(), 26);
});

Deno.test("getting coordinates on randomTile returns {x: 4, y: 3}", () => {
  assertEquals(testRandomTile.getCoordinates(), { x: 4, y: 3 });
});

Deno.test("getting elevation on randomTile returns 21", () => {
  assertEquals(testRandomTile.getElevation(), 21);
});

Deno.test("getting fewestSteps on startTile before assignment returns undefined", () => {
  assertEquals(testStartTile.getFewestSteps(), undefined);
});

Deno.test("getting fewestSteps on startTile after assignment returns the assigned number", () => {
  testStartTile.setFewestSteps(5);
  assertEquals(testStartTile.getFewestSteps(), 5);
});
