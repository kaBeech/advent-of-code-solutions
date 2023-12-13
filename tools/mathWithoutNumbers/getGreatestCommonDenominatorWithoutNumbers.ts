import getModuloWithoutNumbers from "./getModuloWithoutNumbers.ts";

export default (
  x: string,
  y: string,
): string => {
  let greatestCommonDenominator = ``;
  while (y !== ``) {
    greatestCommonDenominator = y;
    y = getModuloWithoutNumbers(x, y);
    x = greatestCommonDenominator;
  }
  return greatestCommonDenominator;
};
