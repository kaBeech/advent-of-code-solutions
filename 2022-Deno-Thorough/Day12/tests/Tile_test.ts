import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { populateTileMap } from "../populateTileMap.ts";
import { Tile } from "../Tile.ts";

const testTileMap = await populateTileMap("tests/testInput.txt");

const testStartTile = testTileMap.startTile;

const testEndTile = testTileMap.endTile;

const testRandomTile = testTileMap.map[4][3];

Deno.test("getting coordinates on startTile returns {x: 0, y: 0}", () => {
  assertEquals(testStartTile.getCoordinates(), { x: 0, y: 0 });
});

Deno.test("getting elevation on startTile returns 'a'", () => {
  assertEquals(testStartTile.getElevation(), "a");
});

Deno.test("getting nextSteps on startTile returns 2 tiles", () => {
  assertEquals(testStartTile.getNextSteps().length, 2);
});

Deno.test("getting distanceFromStart on startTile returns 0", () => {
  assertEquals(testStartTile.getDistanceFromStart(), 0);
});

Deno.test("getting coordinates on endTile returns {x: 5, y: 2}", () => {
  assertEquals(testEndTile.getCoordinates(), { x: 5, y: 2 });
});

Deno.test("getting elevation on endTile returns 'z'", () => {
  assertEquals(testEndTile.getElevation(), "z");
});

Deno.test("getting nextSteps on endTile returns 4 tiles", () => {
  assertEquals(testEndTile.getNextSteps().length, 4);
});

Deno.test("getting distanceFromStart on endTile returns 5.385164807134504", () => {
  assertEquals(testEndTile.getDistanceFromStart(), 5.385164807134504);
});

Deno.test("getting coordinates on randomTile returns {x: 4, y: 3}", () => {
  assertEquals(testRandomTile.getCoordinates(), { x: 4, y: 3 });
});

Deno.test("getting elevation on randomTile returns 'u'", () => {
  assertEquals(testRandomTile.getElevation(), "u");
});

Deno.test("getting nextSteps on randomTile returns 3 tiles", () => {
  assertEquals(testRandomTile.getNextSteps().length, 3);
});

Deno.test("getting distanceFromStart on randomTile returns 5.0990195135927845", () => {
  assertEquals(testRandomTile.getDistanceFromStart(), 5.0990195135927845);
});
