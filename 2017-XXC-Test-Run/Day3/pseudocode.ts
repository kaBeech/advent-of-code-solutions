export const walkFromCenter = (square: number) => {
  let layer = 0;
  let stepsTaken = 0;
  let direction = "E";
  let stepsNeeded = 1;
  for (
    let i = 1;
    i < square;
    i++
  ) {
    stepsTaken++;
    if (stepsTaken === stepsNeeded) {
      stepsTaken = 0;
      switch (direction) {
        case "E":
          direction = "N";
          layer++;
          break;
        case "N":
          direction = "W";
          stepsNeeded++;
          break;
        case "W":
          direction = "S";
          break;
        case "S":
          direction = "E";
          stepsNeeded++;
          break;
      }
    }
  }
  let tangentSteps = 0;
  let sideLength = 0;
  switch (direction) {
    case "E": {
      sideLength = stepsNeeded + 1;
      tangentSteps = Math.abs((sideLength / 2) - (stepsTaken + 1));
      break;
    }
    case "N": {
      sideLength = stepsNeeded + 2;
      tangentSteps = Math.abs(((sideLength + 1) / 2) - (stepsTaken + 2));
      break;
    }
    case "W":
      sideLength = stepsNeeded + 1;
      tangentSteps = Math.abs(((sideLength + 1) / 2) - (stepsTaken + 1));
      break;
    case "S":
      sideLength = stepsNeeded + 1;
      tangentSteps = Math.abs(((sideLength + 1) / 2) - (stepsTaken + 1));
      break;
  }
  const solution = layer + tangentSteps;
  return { solution };
};
