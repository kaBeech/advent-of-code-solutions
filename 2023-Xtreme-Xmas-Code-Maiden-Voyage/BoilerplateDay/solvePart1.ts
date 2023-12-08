import { parseInput } from "./parseInput.ts";
import selectElfNumber42 from "./selectElfNumber42.ts";
import { Elf, ElfMap } from "./types.ts";

export default (async function (): Promise<Elf> {
  const elfMap: ElfMap = await parseInput();

  const elfNumber42 = selectElfNumber42(
    elfMap,
  );

  console.log(`Part 1: Elf Number 42 is ${JSON.stringify(elfNumber42)}`);

  return elfNumber42;
})();
