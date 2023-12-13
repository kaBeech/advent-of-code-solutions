import { getGreatestCommonDenominator } from "./getGreatestCommonDenominator.ts";

const getLeastCommonMultipleOfTwoNumbers = (x: number, y: number) => {
  return (x * y) / getGreatestCommonDenominator(x, y);
};

export default (...inputNumbers: number[]) => {
  let leastCommonMultiple = inputNumbers[0];
  for (const n of inputNumbers) {
    leastCommonMultiple = getLeastCommonMultipleOfTwoNumbers(
      leastCommonMultiple,
      n,
    );
  }

  return leastCommonMultiple;
};
