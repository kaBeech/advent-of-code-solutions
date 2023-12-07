import { Race } from "./types.ts";

export default (function (): number {
  const testRaces: Race[] = [
    { time: 71530, distance: 940200 },
  ];

  // const challengeRaces: Race[] = [
  //   { time: 45988373, distance: 295173412781210 },
  // ];

  const numbersOfWaysToWin: number[] = [];

  testRaces.forEach((race) => {
    const minimumTimeToNotWinTheRace =
      (-race.time + Math.sqrt(race.time ** 2 - -4 * -race.distance)) /
      -2;
    const numberOfWaysToWin = race.time -
      2 * Math.floor(minimumTimeToNotWinTheRace) - 1;
    numbersOfWaysToWin.push(numberOfWaysToWin);
  });

  const numberOfWaysToWinMultiplied = numbersOfWaysToWin.reduce(
    (accumulator, currentValue) => accumulator * currentValue,
    1,
  );

  console.log(
    `Part 1: Number of ways you can beat the records multiplied together is ${
      JSON.stringify(numberOfWaysToWinMultiplied)
    }`,
  );

  return numberOfWaysToWinMultiplied;
})();
