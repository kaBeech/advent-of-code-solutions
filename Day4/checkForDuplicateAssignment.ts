import { assignmentCouple } from "./types.ts";

const checkForDuplicateAssignment = (assignmentsCouple: assignmentCouple) => {
  if (assignmentsCouple.length < 2) {
    throw new Error(`Couple too short: ${assignmentsCouple}`);
  }
  if (assignmentsCouple.length > 2) {
    throw new Error(`Couple too long: ${assignmentsCouple}`);
  }
  if (
    assignmentsCouple[0][0] === assignmentsCouple[1][0] ||
    assignmentsCouple[0][2] === assignmentsCouple[1][2]
  ) return 1;
  if (
    assignmentsCouple[0][0] < assignmentsCouple[1][0] &&
    assignmentsCouple[0][2] > assignmentsCouple[1][2]
  ) return 1;
  return 0;
};

export { checkForDuplicateAssignment };
