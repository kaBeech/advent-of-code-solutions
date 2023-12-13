import getModuloWithoutNumbers from "./getModuloWithoutNumbers.ts";

export const getGreatestCommonDenominatorWithoutNumbers = (
  x: string[],
  y: string[],
): string[] => {
  return !y ? x : getGreatestCommonDenominatorWithoutNumbers(
    y,
    getModuloWithoutNumbers(x, y),
  );
};
