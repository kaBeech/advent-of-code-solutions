import { convertMultiLineFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";

// Types

type ModuleId = string;

type Amplitude = "high" | "low";

interface Pulse {
  emittedBy: ModuleId;
  amplitude: Amplitude;
}

interface ModuleState {
  id: ModuleId;
  inputs: ModuleId[];
  outputs: ModuleId[];
  isOn?: boolean;
  pulseRecord?: Pulse[];
}

interface Module {
  state: ModuleState;
  processPulse: (pulse: Pulse) => void;
}

interface PulseEvent {
  pulse: Pulse;
  targetModuleId: ModuleId;
}

type ApplicationStateSerialized = string;

// Globals

const modules: ModuleState[] = [];

const callStack: PulseEvent[] = [];

const previousStates: ApplicationStateSerialized[] = [];

//Methods

const pulseEmitter = (state: ModuleState) => ({
  emitPulse: () => {
    for (const targetModuleId of state.outputs) {
      const pulse = { emittedBy: state.id, amplitude: "low" as Amplitude };
      callStack.push({ pulse, targetModuleId });
    }
  }
});

const broadcaster = (state: ModuleState) => ({
  processPulse: (pulse: Pulse) => {
    for (const targetModuleId of state.outputs) {
      const newPulse = { ...pulse, emittedBy: state.id };
      callStack.push({ pulse: newPulse, targetModuleId });
    }
  }
});

const flipFlopper = (state: ModuleState) => ({
  processPulse: (pulse: Pulse) => {
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

const buttonModule = () => {
  const state = {
    id: "button",
    pulseQueue: [] as Pulse[],
    inputs: [],
    outputs: ["broadcaster"],
  };
  return {
    ...pulseEmitter(state),
  };
}

const broadcasterModule = (outputs: ModuleId[]) => {
  const state = {
    id: "broadcaster",
    inputs: ["button"],
    outputs,
  };
  return {
    ...broadcaster(state),
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
    ...flipFlopper(state),
  };
}

const conjunctionModule = (id: ModuleId, inputs: ModuleId[], outputs: ModuleId[]) => {

  const state = {
    id,
    inputs,
    outputs,
    pulseRecord: inputs.map((moduleId) => ({ emittedBy: moduleId, amplitude: "low" as Amplitude })),
  };
  return {
    ...conjunctor(state),
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
