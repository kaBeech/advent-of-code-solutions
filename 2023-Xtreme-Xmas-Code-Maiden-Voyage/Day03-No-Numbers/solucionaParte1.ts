import { parseInput } from "./parseInput.ts";
import { TileMap } from "./types.ts";

export const solucionaParte1 = (async (): Promise<number> => {
  const tileMap: TileMap = await parseInput();

  tileMap.forEach((tileRow) => {
    tileRow.forEach((tile) => {
      if (tile.value !== ("X" || ".")) {
        tile.addedToSum = false;
      }
    });
  });

  console.log(`Part 1: Elf Number 42 is ${JSON.stringify(elfNumber42)}`);

  return elfNumber42;
})();
