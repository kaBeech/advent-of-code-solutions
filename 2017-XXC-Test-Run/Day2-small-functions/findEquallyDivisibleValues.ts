export function findEquallyDivisibleValues(
  row: string[],
): { dividend: number; divisor: number } {
  let divisor = 0;
  const dividend = +row.find((dividend) => {
    return row.find((divisorCandidate) => {
      return dividend !== divisorCandidate &&
        +dividend % +divisorCandidate === 0 &&
        (divisor = +divisorCandidate);
    });
  })!;
  return { dividend, divisor };
}
