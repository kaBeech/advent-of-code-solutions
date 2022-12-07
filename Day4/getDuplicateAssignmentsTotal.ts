import { convertMultiLineFileToArray } from "../tools/conversionFunctions.ts";

let total = 0;

const assignmentsCouples = [] as string[][];

const populateassignmentsCouples = (assignmentsString: string) => {
  if (assignmentsString.length < 1) return;
  return assignmentsCouples.push(assignmentsString.split(","));
};

const sumDuplicateAssignments = (assignmentsCouple) => {
  total += checkForDuplicateAssignment();
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
