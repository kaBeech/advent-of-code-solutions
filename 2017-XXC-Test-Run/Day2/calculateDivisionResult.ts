import { findEquallyDivisibleValues } from "./findEquallyDivisibleValues.ts";
export default function (row: string[]): number {
  const { dividend, divisor } = findEquallyDivisibleValues(row);
  return +dividend! / +divisor!;
}
