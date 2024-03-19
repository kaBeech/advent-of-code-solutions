import { convertMultiLineFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";

type ModuleId = string;

interface Pulse {
  emittedBy: ModuleId;
  amplitude: "high" | "low";
}

interface Module {
  id: ModuleId;
  pulseQueue: Pulse[];
  receivePulse: (pulse: Pulse) => void;
  variety: ModuleVariety;
  // functionality
  inputs: ModuleId[];
  outputs: ModuleId[];
}


const pulseReceiver = (state) => ({
  receivePulse: (pulse: Pulse) => {
    state.pulseQueue.push(pulse);
  },
});

const pulseEmitter = () => ({
  emitPulse: (pulse: Pulse, targetModule: Module) => {
    targetModule.receivePulse(pulse);
  }
});

const onOffToggler = (state) => ({
  toggleOnOff: () => {
    state.isOn = !state.isOn;
  }
});

type ModuleVariety = "button" | "broadcaster" | "flip-flop" | "conjunction";

const button = () => {
  const state = {
    pulseQueue: [] as Pulse[],
  };
  return {
    ...pulseEmitter(),
  };
}

const broadcaster = (outputs: ModuleId[]) => {
  const state = {
    pulseQueue: [] as Pulse[],
    outputs,
  };
  return {
    ...pulseReceiver(state),
    ...pulseEmitter(),
  };
}

const flipFlop = (inputs: ModuleId[], outputs: ModuleId[]) => {
  const state = {
    pulseQueue: [] as Pulse[],
    isOn: false,
    inputs,
    outputs,
  };
  return {
    ...pulseReceiver(state),
    ...onOffToggler(state),
    ...pulseEmitter(),
  };
}

const conjunction = (inputs: ModuleId[], outputs: ModuleId[]) => {
  const state = {
    pulseQueue: [] as Pulse[],
    inputs,
    outputs,
    pulseRecord: inputs.map((moduleId) => ({ moduleId, pulse: { amplitude: "low" } })),
  };
  return {
    ...pulseReceiver(state),
    ...pulseEmitter(),
  };
}

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
