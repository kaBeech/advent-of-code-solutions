import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { populateTileMap } from "../populateTileMap.ts";

const testTileMap = await populateTileMap("tests/testInput.txt");

const testStartTile = testTileMap.startTile;

const testEndTile = testTileMap.endTile;

const testRandomTile = testTileMap.allTiles[3][4];

Deno.test("getting coordinates on endTile returns {x: 0, y: 0}", () => {
  assertEquals(testEndTile.getCoordinates(), { x: 0, y: 0 });
});

Deno.test("getting elevation on endTile returns 1", () => {
  assertEquals(testEndTile.getElevation(), 1);
});

Deno.test("getting nextSteps on endTile returns 2 tiles", () => {
  assertEquals(testEndTile.getNextSteps().length, 2);
});

Deno.test("getting distanceFromFinish on endTile returns 0", () => {
  assertEquals(testEndTile.getDistanceFromFinish(), 0);
});

Deno.test("getting coordinates on startTile returns {x: 5, y: 2}", () => {
  assertEquals(testStartTile.getCoordinates(), { x: 5, y: 2 });
});

Deno.test("getting elevation on startTile returns 26", () => {
  assertEquals(testStartTile.getElevation(), 26);
});

Deno.test("getting nextSteps on startTile returns 1 tiles", () => {
  assertEquals(testStartTile.getNextSteps().length, 1);
});

Deno.test("getting distanceFromFinish on startTile returns 5.385164807134504", () => {
  assertEquals(testStartTile.getDistanceFromFinish(), 5.385164807134504);
});

Deno.test("getting coordinates on randomTile returns {x: 4, y: 3}", () => {
  assertEquals(testRandomTile.getCoordinates(), { x: 4, y: 3 });
});

Deno.test("getting elevation on randomTile returns 21", () => {
  assertEquals(testRandomTile.getElevation(), 21);
});

Deno.test("getting nextSteps on randomTile returns 3 tiles", () => {
  assertEquals(testRandomTile.getNextSteps().length, 3);
});

Deno.test("getting distanceFromFinish on randomTile returns 5", () => {
  assertEquals(testRandomTile.getDistanceFromFinish(), 5);
});
