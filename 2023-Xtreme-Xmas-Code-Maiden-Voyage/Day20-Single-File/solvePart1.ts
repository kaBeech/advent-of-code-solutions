import { convertMultiLineFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";

type ModuleId = string;

interface Pulse {
  emittedBy: ModuleId;
  amplitude: "high" | "low";
}

interface Module {
  state: {
    id: ModuleId;
    pulseQueue: Pulse[];
    inputs: ModuleId[];
    outputs: ModuleId[];
    receivePulse: (pulse: Pulse) => void;
    emitPulse: (pulse: Pulse, targetModuleId: ModuleId) => void;
  }
}

const modules: Module[] = [];

const pulseReceiver = (state) => ({
  receivePulse: (pulse: Pulse) => {
    state.pulseQueue.push(pulse);
  },
});

const pulseEmitter = () => ({
  emitPulse: (pulse: Pulse, targetModuleId: ModuleId) => {
    const targetModule = modules.find((module) => module.state.id === targetModuleId)!;
    targetModule.state.receivePulse(pulse);
  }
});

const onOffToggler = (state) => ({
  toggleOnOff: () => {
    state.isOn = !state.isOn;
  }
});

const flipFlopper = (state) => ({
  flipFlop: () => {
    const pulse = state.pulseQueue.shift();
    if (pulse && pulse.amplitude === "low") {
      state.isOn = !state.isOn;
      if (state.isOn) {
        for (const moduleId of state.outputs) {
          state.emitPulse({ emittedBy: state.id, amplitude: "high" }, moduleId);
        }
      } else {
        for (const moduleId of state.outputs) {
          state.emitPulse({ emittedBy: state.id, amplitude: "low" }, moduleId);
        }
      }
    }
  }
});

const conjunctor = (state) => ({
  conjunct: () => {
    const pulse = state.pulseQueue.shift();
    state.pulseRecord = state.pulseRecord.map((record: Pulse) => {
      if (record.emittedBy === pulse.emittedBy) {
        record.amplitude = pulse;
      }
      return record;
    }
    );
    if (state.pulseRecord.every((record: Pulse) => record.amplitude === "high")) {
      for (const moduleId of state.outputs) {
        state.emitPulse({ emittedBy: state.id, amplitude: "low" }, moduleId);
      }
    } else {
      for (const moduleId of state.outputs) {
        state.emitPulse({ emittedBy: state.id, amplitude: "high" }, moduleId);
      }
    }
  }
});


type ModuleVariety = "button" | "broadcaster" | "flip-flop" | "conjunction";

// const broadcaster = (state) => ({
// broadcast: () => {


const button = () => {
  const state = {
    id: "button",
    pulseQueue: [] as Pulse[],
    outputs: "broadcaster",
  };
  return {
    ...pulseEmitter(),
  };
}

const broadcasterModule = (outputs: ModuleId[]) => {
  const state = {
    id: "broadcaster",
    pulseQueue: [] as Pulse[],
    inputs: ["button"],
    outputs,
  };
  return {
    ...pulseReceiver(state),
    ...pulseEmitter(),
  };
}

const flipFlopModule = (id: ModuleId, inputs: ModuleId[], outputs: ModuleId[]) => {
  const state = {
    id,
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

const conjunctionModule = (id: ModuleId, inputs: ModuleId[], outputs: ModuleId[]) => {
  const state = {
    id,
    pulseQueue: [] as Pulse[],
    inputs,
    outputs,
    pulseRecord: inputs.map((moduleId) => ({ emittedBy: moduleId, amplitude: "low" })),
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
