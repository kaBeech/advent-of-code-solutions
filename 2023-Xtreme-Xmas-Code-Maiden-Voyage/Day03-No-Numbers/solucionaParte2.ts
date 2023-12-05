import { parseInput } from "./parseInput.ts";
import selectElfNumber24 from "./selectElfNumber24.ts";
import { Elf, ElfMap } from "./types.ts";

export const solucionaParte2 = (async (): Promise<Elf> => {
  const elfMap: ElfMap = await parseInput();

  const elfNumber24 = selectElfNumber24(
    elfMap,
  );

  console.log(`Part 2: Elf Number 24 is ${JSON.stringify(elfNumber24)}`);

  return elfNumber24;
})();
