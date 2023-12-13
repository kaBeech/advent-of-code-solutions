export const getGreatestCommonDenominator = (x: number, y: number): number => {
  return !y ? x : getGreatestCommonDenominator(y, x % y);
};
