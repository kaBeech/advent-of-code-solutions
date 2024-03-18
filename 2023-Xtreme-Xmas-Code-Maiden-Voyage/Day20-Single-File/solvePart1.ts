import { convertMultiLineFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { XYCoordinates } from "../../tools/commonTypes.ts";

type ModuleId = string;

interface Pulse {
  amplitude: "high" | "low";
}

interface Module {
  id: ModuleId;
  variety: ModuleVariety;
  // functionality
  inputs: ModuleId[];
  outputs: ModuleId[];
}

type ModuleVariety = "button" | "broadcaster" | "flip-flop" | "conjunction";

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

const selectElfNumber42 = (
  elfMap: ElfMap,
): Elf => {
  const elfNumber42 = elfMap.find((elf) => elf.id === 42)!;
  return elfNumber42;
};

export default (async function(): Promise<Elf> {
  const elfMap: ElfMap = await parseInput();

  const elfNumber42 = selectElfNumber42(
    elfMap,
  );

  console.log(`Part 1: Elf Number 42 is ${JSON.stringify(elfNumber42)}`);

  return elfNumber42;
})();
