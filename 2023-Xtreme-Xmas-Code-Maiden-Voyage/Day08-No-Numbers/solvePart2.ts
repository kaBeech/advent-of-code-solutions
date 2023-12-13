import { parseInput } from "./parseInput.ts";
import { Maps } from "./types.ts";
import initializePeriodicNodes from "./initializePeriodicNodes.ts";
import surveyEndingNodePathLoops from "./surveyEndingNodePathLoops.ts";

export default (async function (): Promise<string[]> {
  const maps: Maps = await parseInput();
  const instructionsCopy = maps.instructions.slice();
  const startingInstructions = instructionsCopy.filter((instruction) => {
    const idArray = instruction.id.split(``);
    const idLastChar = idArray.pop();
    return idLastChar === `A`;
  });

  const { totalStepsArray, currentInstructions } = surveyEndingNodePathLoops(
    startingInstructions,
    maps,
  );

  const stepsSpentSurveying = totalStepsArray.length;

  const { periodicNodes, harmonizedNodes } = initializePeriodicNodes(
    currentInstructions,
  );

  console.log(
    periodicNodes,
    harmonizedNodes,
  );

  let stepsTotal = stepsSpentSurveying;
  console.log(stepsTotal);

  while (harmonizedNodes.length < 6) {
    let stepsTaken = 1;

    for (const harmonizedNode of harmonizedNodes) {
      stepsTaken *= harmonizedNode.period;
    }

    stepsTotal += stepsTaken;

    for (const periodicNode of periodicNodes) {
      // console.log(periodicNode);
      const distanceToSubtract = stepsTaken;
      periodicNode.distanceFromNextEndingNode -= distanceToSubtract;

      if (harmonizedNodes.includes(periodicNode)) {
        periodicNode.distanceFromNextEndingNode += distanceToSubtract;
      } else if (
        periodicNode.distanceFromNextEndingNode % distanceToSubtract === 0
      ) {
        harmonizedNodes.push(periodicNode);
        console.log(
          distanceToSubtract,
          stepsTotal,
          periodicNodes,
        );
      } else {
        while (
          periodicNode.distanceFromNextEndingNode < 0
        ) {
          periodicNode.distanceFromNextEndingNode += periodicNode.period;
        }

        if (
          periodicNode.distanceFromNextEndingNode === 0
        ) {
          harmonizedNodes.push(periodicNode);
          console.log(
            distanceToSubtract,
            stepsTotal,
            periodicNodes,
          );
        }
        // if (
        //   periodicNode.endingNodeId === "BDZ" &&
        //   !harmonizedNodes.includes(periodicNode)
        // ) {
        //   console.log("TEST!!!!", distanceToSubtract, periodicNode);
        // }
      }
    }
  }

  console.log(
    `Part 2: The number of steps it takes before all current nodes' ids end in "Z" is: ${
      JSON.stringify(stepsTotal)
    }`,
  );

  return totalStepsArray;
})();
