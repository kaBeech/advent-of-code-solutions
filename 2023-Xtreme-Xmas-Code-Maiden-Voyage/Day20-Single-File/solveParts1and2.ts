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
  getState: () => ModuleState;
  addInput?: (input: ModuleId) => void;
}

interface PulseEvent {
  pulse: Pulse;
  targetModuleId: ModuleId;
}

// Globals

const callStack: PulseEvent[] = [];
let counterPulseLow = 0;
let counterPulseHigh = 0;

//Methods

const stateGetter = (state: ModuleState) => ({
  getState: () => state,
});

const inputSetter = (state: ModuleState) => ({
  setInputs: (inputs: ModuleId[]) => {
    state.inputs = inputs;
    if (state.pulseRecord) {
      state.pulseRecord = inputs.map((moduleId) => ({ emittedBy: moduleId, amplitude: "low" as Amplitude }));
    }
  }
});

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
        newAmplitude === "high" ? counterPulseHigh++ : counterPulseLow++
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
    ...stateGetter(state),
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
    ...stateGetter(state),
    ...inputSetter(state),
    ...flipFlopper(state),
  };
}

const conjunctionModule = (id: ModuleId, inputs: ModuleId[], outputs: ModuleId[]) => {

  const state = {
    id,
    inputs,
    outputs,
    pulseRecord: [] as Pulse[],
  };
  return {
    ...stateGetter(state),
    ...inputSetter(state),
    ...conjunctor(state),
  };
}

// Functions

const parseInput = async (): Promise<Module[]> => {
  const inputFile = "./challengeInput.dat"

  const inputLines = await Deno.readTextFile(inputFile).then((text) => text.trim().split("\n"));
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

  for (const module of modules) {
    if (module.getState().id !== "broadcaster") {
      const inputs = modules.filter((m) => m.getState().outputs.includes(module.getState().id)).map((m) => m.getState().id);
      module.setInputs!(inputs);
    }
  }



  return modules;
};

// Solvers

const solvePart1 = async (): Promise<number> => {
  counterPulseLow = 0;
  counterPulseHigh = 0;
  callStack.length = 0;

  const modules: Module[] = await parseInput();

  const button = buttonModule();
  let buttonPresses = 0;

  while (buttonPresses < 1000) {
    buttonPresses++;
    button.emitPulse();

    while (callStack.length > 0) {
      const { pulse, targetModuleId } = callStack.shift()!;
      const targetModule = modules.find((module) => module.getState().id === targetModuleId);
      if (targetModule) {
        targetModule.processPulse(pulse);
      }
    }
  }

  const solutionPart1 = counterPulseLow * counterPulseHigh;

  return solutionPart1;
}

const solvePart2 = async (): Promise<number> => {
  counterPulseLow = 0;
  counterPulseHigh = 0;
  callStack.length = 0;

  const modules: Module[] = await parseInput();

  // We can do this because we know that only one final module will output to rx
  const finalModuleId = modules.find((module) => module.getState().outputs.includes("rx"))!.getState().id;

  // We can do this because we know the penultimate modules will all be 
  // Conjunction Modules, they all have a set period in which they emit a 
  // high pulse to the final module, and the first node of that period is
  // at the starting position (0)
  const penultimateModules = modules.filter((module) => module.getState().outputs.includes(finalModuleId)).map((module) => {
    return { id: module.getState().id, period: 0 };
  });

  const button = buttonModule();
  let buttonPresses = 0;

  while (!penultimateModules.every((module) => module.period > 0)) {
    buttonPresses++;
    button.emitPulse();

    while (callStack.length > 0) {
      const { pulse, targetModuleId } = callStack.shift()!;
      const targetModule = modules.find((module) => module.getState().id === targetModuleId);
      if (targetModule) {
        if (targetModuleId === finalModuleId && pulse.amplitude === "high") {
          const emittingModule = penultimateModules.find((module) => module.id === pulse.emittedBy)!;
          if (emittingModule.period === 0) {
            emittingModule.period = buttonPresses;
          }
        }
        targetModule.processPulse(pulse);
      }
    }
  }

  // We can now calculate at which button press all penultimate modules will 
  // emit a high pulse to the final module. Theoretically, this might not the 
  // first button press in which this happens (if all the periods of the 
  // penultimate modules share a common divisor there would be an earlier 
  // one), but for this puzzle it will be.
  const solutionPart2 = penultimateModules.reduce(
    (accumulator, module) => accumulator * module.period,
    1,
  );


  return solutionPart2;
}


// Main

export default (async function(): Promise<{ solutionPart1: number, solutionPart2: number }> {

  const solutionPart1 = await solvePart1();
  const solutionPart2 = await solvePart2();

  console.log(`Part 1: The total number of low pulses sent multiplied by the total number of high pulses sent equals ${solutionPart1}`);
  console.log(`Part 2: The fewest number of button presses required to deliver a low pulse to the module named "rx" is ${solutionPart2}`);

  return { solutionPart1, solutionPart2 };
})();
