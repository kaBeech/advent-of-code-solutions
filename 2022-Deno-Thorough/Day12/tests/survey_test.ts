import { survey } from "../survey.ts";
import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { testTileMap } from "./testObjects.ts";

Deno.test("surveying the origin tile returns one possible tile to visit", () => {
  assertEquals(
    survey(
      testTileMap.allTiles,
      testTileMap.allTiles[2][5],
      testTileMap.startTile,
    ).tilesToVisit.length,
    1,
  );
});

Deno.test("surveying the tile at coordinates (2,2) returns four possible tiles to visit", () => {
  assertEquals(
    survey(
      testTileMap.allTiles,
      testTileMap.allTiles[2][2],
      testTileMap.startTile,
    ).tilesToVisit.length,
    4,
  );
});

Deno.test("tiles already surveyed are not added to tilesToVisit if the current path would be longer than the previous path taken to get there", () => {
  assertEquals(
    survey(
      testTileMap.allTiles,
      testTileMap.allTiles[2][1],
      testTileMap.startTile,
    ).tilesToVisit.includes(testTileMap.allTiles[2][2]),
    false,
  );
});

Deno.test("tiles already surveyed are added to tilesToVisit if the current path would be shorter than the previous path taken to get there", () => {
  assertEquals(
    survey(
      testTileMap.allTiles,
      testTileMap.allTiles[3][1],
      testTileMap.startTile,
    ).tilesToVisit.includes(testTileMap.allTiles[4][1]),
    true,
  );
});

Deno.test("tiles with 2 elevation lower than the surveyed tile's elevation are not added to tilesToVisit", () => {
  assertEquals(
    survey(
      testTileMap.allTiles,
      testTileMap.allTiles[4][2],
      testTileMap.startTile,
    ).tilesToVisit.includes(testTileMap.allTiles[4][1]),
    false,
  );
});

Deno.test("tiles with 1 elevation lower than the surveyed tile's elevation are added to tilesToVisit", () => {
  assertEquals(
    survey(
      testTileMap.allTiles,
      testTileMap.allTiles[0][7],
      testTileMap.startTile,
    ).tilesToVisit.includes(testTileMap.allTiles[1][7]),
    true,
  );
});

Deno.test("surveying a tile next to the destination tile 4finds the destination tile", () => {
  assertEquals(
    survey(
      testTileMap.allTiles,
      testTileMap.allTiles[1][0],
      testTileMap.startTile,
    ).foundDestinationTile,
    true,
  );
});

Deno.test("surveying a tile not next to the destination tile does not find the destination tile", () => {
  assertEquals(
    survey(
      testTileMap.allTiles,
      testTileMap.allTiles[0][2],
      testTileMap.startTile,
    ).foundDestinationTile,
    false,
  );
});

Deno.test("surveying a tile next to a lowest elevation tile finds the lowest possible elevation", () => {
  assertEquals(
    survey(
      testTileMap.allTiles,
      testTileMap.allTiles[0][2],
      testTileMap.startTile,
    ).foundLowestPossibleElevation,
    true,
  );
});

Deno.test("surveying a tile not next to a lowest elevation tile does not find the lowest possible elevation", () => {
  assertEquals(
    survey(
      testTileMap.allTiles,
      testTileMap.allTiles[0][3],
      testTileMap.startTile,
    ).foundLowestPossibleElevation,
    false,
  );
});

Deno.test("surveying a tile next to a lowest elevation tile after three steps returns four steps to the lowest possible elevation", () => {
  assertEquals(
    survey(
      testTileMap.allTiles,
      testTileMap.allTiles[4][1],
      testTileMap.startTile,
    ).fewestStepsToLowestPossibleElevation,
    4,
  );
});

Deno.test("surveying a tile not next to a lowest elevation tile returns undefined steps to the lowest possible elevation", () => {
  assertEquals(
    survey(
      testTileMap.allTiles,
      testTileMap.allTiles[0][3],
      testTileMap.startTile,
    ).fewestStepsToLowestPossibleElevation,
    undefined,
  );
});
