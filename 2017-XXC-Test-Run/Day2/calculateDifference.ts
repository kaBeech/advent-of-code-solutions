import sortRow from "./sortRow.ts";
export default function calculateDifference(row: string[]): number {
  const sortedRow = sortRow(row);
  return +sortedRow[sortedRow.length - 1] - +sortedRow[0];
}
