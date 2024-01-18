import { Elf, ElfMap } from "./types.ts";

export default (
  elfMap: ElfMap,
): Elf => {
  const elfNumber42 = elfMap.find((elf) => elf.id === 42)!;
  return elfNumber42;
};
