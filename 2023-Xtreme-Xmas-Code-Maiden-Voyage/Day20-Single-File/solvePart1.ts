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

const callStack: PulseEvent[] = [];
let counterPulseLow = 0;
let counterPulseHigh = 0;

//Methods

const pulseEmitter = (state: ModuleState) => ({
  emitPulse: () => {
    for (const targetModuleId of state.outputs) {
      counterPulseLow++;
      const pulse = { emittedBy: state.id, amplitude: "low" as Amplitude };
      callStack.push({ pulse, targetModuleId });
    }
  }
});

const broadcaster = (state: ModuleState) => ({
  processPulse: (pulse: Pulse) => {
    for (const targetModuleId of state.outputs) {
      if (pulse.amplitude === "low") {
        counterPulseLow++;
      } else {
        counterPulseHigh++;
      }
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
        counterPulseLow++;
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
        counterPulseLow++;
        callStack.push({ pulse: { emittedBy: state.id, amplitude: "low" }, targetModuleId });
      }
    } else {
      for (const targetModuleId of state.outputs) {
        counterPulseHigh++;
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

// Functions

const parseInput = async (): Promise<Module[]> => {
  const inputFile = "./challengeInput.dat"

  // Read each line of the input file into an array
  const inputLines = await Deno.readTextFile(inputFile).then((text) => text.split("\n"));
  const modules = inputLines.map((line: string) => {
    const lineSplits = line.split(" ");
    const id = lineSplits.shift();
    lineSplits.shift();
    const outputs = lineSplits.map((output: string) => output.replace(",", ""));
    switch (id![0]) {
      case "b":
        return broadcasterModule(outputs);
      case "%":
        return flipFlopModule(id!.slice(1,), [] as ModuleId[], outputs);
      case "&":
        return conjunctionModule(id!.slice(1,), [] as ModuleId[], outputs);
      default:
        throw new Error(`Unknown module type: ${id}`);
    }
  })
  return modules;
};

const serializeState = (modules: Module[]): ApplicationStateSerialized => {
  let serializedState = "";
  for (const module of modules) {
    serializedState += module.state.id;
    if (module.state.pulseRecord) {
      for (const pulse of module.state.pulseRecord) {
        if (pulse.amplitude === "low") {
          serializedState += "!"
        } else {
          serializedState += "^"
        }
        serializedState += pulse.emittedBy + pulse.amplitude;
      }
    } else if (module.state.isOn) {
      serializedState += "+";
    } else if (module.state.isOn === false) {
      serializedState += "-";
    }
  }
  return serializedState;
}

// Main

export default (async function() {
  counterPulseLow = 0;
  counterPulseHigh = 0;
  callStack.length = 0;

  const modules: Module[] = await parseInput();
  const previousStates: ApplicationStateSerialized[] = [];
  const button = buttonModule();
  let buttonPresses = 1;

  while (buttonPresses > 0) {
    button.emitPulse();

    while (callStack.length > 0) {
      const { pulse, targetModuleId } = callStack.shift()!;
      const targetModule = modules.find((module) => module.state.id === targetModuleId);
      if (targetModule) {
        targetModule.processPulse(pulse);
      } else {
        throw new Error(`Module not found: ${targetModuleId}`);
      }
    }

    buttonPresses--;
  }

  // console.log(`Part 1: Elf Number 42 is ${JSON.stringify(elfNumber42)}`);

  return 0;
})();
