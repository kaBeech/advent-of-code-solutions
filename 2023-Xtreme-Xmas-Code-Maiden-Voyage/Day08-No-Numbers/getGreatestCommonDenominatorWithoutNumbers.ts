import getModuloWithoutNumbers from "./getModuloWithoutNumbers.ts";

export default (
  x: string[],
  y: string[],
): string[] => {
  let greatestCommonDenominator: string[] = [];
  while (y.toString() !== ``) {
    greatestCommonDenominator = y;
    y = getModuloWithoutNumbers(x, y);
    x = greatestCommonDenominator;
  }
  return greatestCommonDenominator;
};
