import { convertMultiLineFileToArray } from "../tools/conversionFunctions.ts";

let total = 0;

const assignmentsCoupleArray = [] as string[][]

const populateAssignmentsCoupleArray = (assignmentsString: string) => {
  if (assignmentsString.length < 1) return
  return assignmentsCoupleArray.push(assignmentsString.split(","));
}

const getDuplicateAssignmentsTotal = async (assignmentsFile: string) => {
  total = 0;
  assignmentsCoupleArray.splice(0, assignmentsCoupleArray.length)

  const assigmentsStringArray = await convertMultiLineFileToArray(
    assignmentsFile,
  ) as string[];

  assigmentsStringArray.forEach(populateAssignmentsCoupleArray);

  return total;
};

export { getDuplicateAssignmentsTotal };
