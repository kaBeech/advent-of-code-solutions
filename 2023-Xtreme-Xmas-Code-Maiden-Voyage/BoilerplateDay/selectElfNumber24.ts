import { Elf, ElfMap } from "./types.ts";

export default (
  elfMap: ElfMap,
): Elf => {
  const elfNumber24 = elfMap.find((elf) => elf.id === 24)!;
  return elfNumber24;
};
