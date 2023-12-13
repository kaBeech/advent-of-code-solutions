import divideWithoutNumbers from "./divideWithoutNumbers.ts";
import getGreatestCommonDenominatorWithoutNumbers from "./getGreatestCommonDenominatorWithoutNumbers.ts";
import multiplyWithoutNumbers from "./multiplyWithoutNumbers.ts";

const getLeastCommonMultipleOfTwoStrings = (x: string, y: string) => {
  const result = divideWithoutNumbers(
    multiplyWithoutNumbers(x, y),
    getGreatestCommonDenominatorWithoutNumbers(x, y),
  );
  return result.quotient;
};

export default (...inputNumbers: string[]) => {
  let leastCommonMultiple = inputNumbers.slice().shift()!;
  for (const n of inputNumbers) {
    console.log(leastCommonMultiple.length, n.length);
    leastCommonMultiple = getLeastCommonMultipleOfTwoStrings(
      leastCommonMultiple,
      n,
    );
  }

  return leastCommonMultiple;
};
