import { convertMultiLineFileToArray } from "../tools/conversionFunctions/convertFileToArray.ts";
import { checkForDuplicateAssignment } from "./checkForDuplicateAssignment.ts";
import { AssignmentCouple, OverlapMethod } from "./types.ts";

let total = 0;
let currentOverlapMethod = "full" as OverlapMethod;

const assignmentsCouples = [] as AssignmentCouple[];

const populateassignmentsCouples = (assignmentsString: string) => {
  if (assignmentsString.length < 1) return;
  return assignmentsCouples.push(
    assignmentsString.split(",") as AssignmentCouple,
  );
};

const sumDuplicateAssignments = (
  assignmentsCouple: AssignmentCouple,
) => {
  total += checkForDuplicateAssignment(assignmentsCouple, currentOverlapMethod);
};

const getDuplicateAssignmentsTotal = async (
  assignmentsFile: string,
  overlapMethod: OverlapMethod,
) => {
  total = 0;
  currentOverlapMethod = OverlapMethod;
  assignmentsCouples.splice(0, assignmentsCouples.length);

  const assignmentsStrings = await convertMultiLineFileToArray(
    assignmentsFile,
  ) as string[];

  assignmentsStrings.forEach(populateassignmentsCouples);

  assignmentsCouples.forEach(sumDuplicateAssignments);

  return total;
};

export { getDuplicateAssignmentsTotal };
