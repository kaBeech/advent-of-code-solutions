import calculateDifference from "./calculateDifference.ts";
export default function calculateChecksum(
  arrayOfRowsOfValues: string[][],
): number {
  let checksum = 0;
  arrayOfRowsOfValues.forEach((row) => {
    checksum += calculateDifference(row);
  });
  return checksum;
}
