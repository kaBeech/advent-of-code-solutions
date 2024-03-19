import { convertMultiLineFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";

// Types

type ModuleId = string;

interface Pulse {
  emittedBy: ModuleId;
  amplitude: "high" | "low";
}

interface ModuleState {
  id: ModuleId;
  inputs: ModuleId[];
  outputs: ModuleId[];
  processPulse: (pulse: Pulse) => void;
  isOn?: boolean;
  pulseRecord?: Pulse[];
}

interface PulseEvent {
  pulse: Pulse;
  targetModuleId: ModuleId;
}

// Globals

const modules: ModuleState[] = [];

const callStack: PulseEvent[] = [];

//Methods

const pulseReceiver = (state) => ({
  receivePulse: (pulse: Pulse) => {
    state.processPulse(pulse, state);
  },
});

const pulseEmitter = () => ({
  emitPulse: (pulse: Pulse, targetModuleId: ModuleId) => {
    callStack.push({ pulse, targetModuleId });
  }
});

const onOffToggler = (state) => ({
  toggleOnOff: () => {
    state.isOn = !state.isOn;
  }
});

const flipFlopper = (state: ModuleState) => ({
  processPulse: (pulse) => {
    if (pulse.amplitude === "low") {
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
        callStack.push({ pulse: { emittedBy: state.id, amplitude: "low" }, targetModuleId: moduleId });
      }
    } else {
      for (const moduleId of state.outputs) {
        callStack.push({ pulse: { emittedBy: state.id, amplitude: "high" }, targetModuleId: moduleId });
      }
    }
  }
});

// Constructors

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

const parseInput = async () => {
  const playerMapString: string[] = await convertMultiLineFileToArray(
    "./challengeInput.dat",
  );
  playerMapString.forEach((rawPlayer, index) => {
    return 0;
  })
};


export default (async function() {
  const example = await parseInput();

  // console.log(`Part 1: Elf Number 42 is ${JSON.stringify(elfNumber42)}`);

  return 0;
})();
