import { convertMultiLineFileToArray } from "../tools/conversionFunctions.ts";
import { checkForDuplicateAssignment } from "./checkForDuplicateAssignment.ts";
import { assignmentCouple, overlapMethod } from "./types.ts";

let total = 0;
let currentOverlapMethod = "full" as overlapMethod;

const assignmentsCouples = [] as assignmentCouple[];

const populateassignmentsCouples = (assignmentsString: string) => {
  if (assignmentsString.length < 1) return;
  return assignmentsCouples.push(
    assignmentsString.split(",") as assignmentCouple,
  );
};

const sumDuplicateAssignments = (
  assignmentsCouple: assignmentCouple,
) => {
  total += checkForDuplicateAssignment(assignmentsCouple, currentOverlapMethod);
};

const getDuplicateAssignmentsTotal = async (
  assignmentsFile: string,
  overlapMethod: overlapMethod,
) => {
  total = 0;
  currentOverlapMethod = overlapMethod;
  assignmentsCouples.splice(0, assignmentsCouples.length);

  const assignmentsStrings = await convertMultiLineFileToArray(
    assignmentsFile,
  ) as string[];

  assignmentsStrings.forEach(populateassignmentsCouples);

  assignmentsCouples.forEach(sumDuplicateAssignments);

  return total;
};

export { getDuplicateAssignmentsTotal };
