import { BoxAndItemsRecord } from "./solvePart2.ts";

interface PossibleArrangementsRecord {
  boxIndex: number;
  numberOfUnplacedItems: number;
  possibleArrangements: number;
}

const getPossibleArrangements = (
  record: BoxAndItemsRecord,
  boxIndex: number,
) => {
  const cache: PossibleArrangementsRecord[] = [];
};
