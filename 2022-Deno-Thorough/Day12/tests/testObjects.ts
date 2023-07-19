import { Explorer } from "../Explorer.ts";
import { populateTileMap } from "../populateTileMap.ts";

const testTileMap = await populateTileMap("tests/testInput.txt");

const testExplorer = Explorer(testTileMap);

export { testExplorer, testTileMap };
