import { convertMultiLineFileToArray } from "../tools/conversionFunctions.ts";
import { assignmentCouple } from "./types.ts";

let total = 0;

const assignmentsCouples = [] as assignmentCouple[][];

const populateassignmentsCouples = (assignmentsString: string) => {
  if (assignmentsString.length < 1) return;
  return assignmentsCouples.push(assignmentsString.split(",") as assignmentCouple[]);
};

const sumDuplicateAssignments = (assignmentsCouple: assignmentCouple) => {
  total += checkForDuplicateAssignment(assignmentsCouple);
};

const getDuplicateAssignmentsTotal = async (assignmentsFile: string) => {
  total = 0;
  assignmentsCouples.splice(0, assignmentsCouples.length);

  const assignmentsStrings = await convertMultiLineFileToArray(
    assignmentsFile,
  ) as string[];

  assignmentsStrings.forEach(populateassignmentsCouples);

  assignmentsCouples.forEach(sumDuplicateAssignments);

  return total;
};

export { getDuplicateAssignmentsTotal };
