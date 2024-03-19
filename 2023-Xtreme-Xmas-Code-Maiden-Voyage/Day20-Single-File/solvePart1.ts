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

const broadcaster = (state: ModuleState) => ({
  processPulse: (pulse) => {
    for (const targetModuleId of state.outputs) {
      const newPulse = { ...pulse, emittedBy: state.id };
      callStack.push({ pulse: newPulse, targetModuleId });
    }
  }
});

const flipFlopper = (state: ModuleState) => ({
  processPulse: (pulse) => {
    if (pulse.amplitude === "low") {
      state.isOn = !state.isOn;
      const newAmplitude = state.isOn ? "high" : "low";
      for (const targetModuleId of state.outputs) {
        callStack.push({ pulse: { emittedBy: state.id, amplitude: newAmplitude }, targetModuleId });
      }
    }
  }
});

const conjunctor = (state: ModuleState) => ({
  processPulse: (pulse: Pulse) => {
    state.pulseRecord = state.pulseRecord!.map((record: Pulse) => {
      if (record.emittedBy === pulse.emittedBy) {
        record.amplitude = pulse.amplitude;
      }
      return record;
    }
    );
    if (state.pulseRecord.every((record: Pulse) => record.amplitude === "high")) {
      for (const targetModuleId of state.outputs) {
        callStack.push({ pulse: { emittedBy: state.id, amplitude: "low" }, targetModuleId });
      }
    } else {
      for (const targetModuleId of state.outputs) {
        callStack.push({ pulse: { emittedBy: state.id, amplitude: "high" }, targetModuleId });
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
