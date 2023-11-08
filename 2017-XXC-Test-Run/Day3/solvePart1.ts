export const solvePart1 = (square: number) => {
  const layer = [];
  const stepsTaken: number[] = [0];
  const direction = ["E"];
  const stepsNeeded = [1];
  for (
    const i = [1];
    i.length < square;
    i.push(1)
  ) {
    stepsTaken[0] = stepsTaken[0] + 1;
    if (stepsTaken[0] === stepsNeeded.length) {
      stepsTaken[0] = 0;
      switch (direction.shift()) {
        case "E":
          direction.unshift("N");
          layer.unshift(0);
          break;
        case "N":
          direction.unshift("W");
          stepsNeeded.unshift(1);
          break;
        case "W":
          direction.unshift("S");
          break;
        case "S":
          direction.unshift("E");
          stepsNeeded.unshift(1);
          break;
      }
    }
  }
  const tangentSteps = [];
  const sideLength = [];
  switch (direction[0]) {
    case "E": {
      sideLength.unshift(stepsNeeded.length + 1);
      tangentSteps.unshift(
        Math.abs((sideLength[0] / 2) - (stepsTaken[0] + 1)),
      );
      break;
    }
    case "N": {
      sideLength.unshift(stepsNeeded.length + 2);
      tangentSteps.unshift(
        Math.abs(((sideLength[0] + 1) / 2) - (stepsTaken[0] + 2)),
      );
      break;
    }
    case "W": {
      sideLength.unshift(stepsNeeded.length + 1);
      tangentSteps.unshift(
        Math.abs(((sideLength[0] + 1) / 2) - (stepsTaken[0] + 1)),
      );
      break;
    }
    case "S": {
      sideLength.unshift(stepsNeeded.length + 1);
      tangentSteps.unshift(
        Math.abs(((sideLength[0] + 1) / 2) - (stepsTaken[0] + 1)),
      );
      break;
    }
  }
  const solution = layer.length + tangentSteps[0];
  return { solution };
};
