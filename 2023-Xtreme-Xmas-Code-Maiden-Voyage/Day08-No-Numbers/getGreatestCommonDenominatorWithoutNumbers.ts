export const getModuloWithoutNumbers = (x: string[], y: string[]): string[] => {
  const xCopy = x.slice();
  let lastElement: string | undefined = undefined;
  for (const _element of y) {
    lastElement = xCopy.pop();
  }
  return !lastElement ? x : getModuloWithoutNumbers(xCopy, y);
};

export const getGreatestCommonDenominatorWithoutNumbers = (
  x: string[],
  y: string[],
): string[] => {
  return !y ? x : getGreatestCommonDenominatorWithoutNumbers(
    y,
    getModuloWithoutNumbers(x, y),
  );
};
