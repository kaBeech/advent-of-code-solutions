import { convertMultiLineFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { XYCoordinates } from "../../tools/commonTypes.ts";

export interface Elf {
  id: number;
  coordinates: XYCoordinates;
}

export type ElfMap = Elf[];

const selectElfNumber42 = (
  elfMap: ElfMap,
): Elf => {
  const elfNumber42 = elfMap.find((elf) => elf.id === 42)!;
  return elfNumber42;
};

const parseInput = async (): Promise<ElfMap> => {
  const elfMap: ElfMap = [];
  const playerMapString: string[] = await convertMultiLineFileToArray(
    "./challengeInput.dat",
  );
  playerMapString.forEach((rawPlayer, index) => {
    elfMap.push({
      id: index,
      coordinates: { x: parseInt(rawPlayer), y: index },
    });
  });
  return elfMap;
};

export default (async function(): Promise<Elf> {
  const elfMap: ElfMap = await parseInput();

  const elfNumber42 = selectElfNumber42(
    elfMap,
  );

  console.log(`Part 1: Elf Number 42 is ${JSON.stringify(elfNumber42)}`);

  return elfNumber42;
})();
