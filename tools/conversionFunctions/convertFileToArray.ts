const convertMultiLineFileToArray = async (
  input: string,
): Promise<string[]> => {
  const inputString = await Deno.readTextFile(input);
  const inputStringTrimmed = inputString.trimEnd();
  return inputStringTrimmed.split(/\n/);
};

const convertMultiLineFileToDoubleArray = async (
  input: string,
  splitOn?: string,
): Promise<string[][]> => {
  const inputString = await Deno.readTextFile(input);
  const inputStringTrimmed = inputString.trimEnd();
  const inputStringArray = inputStringTrimmed.split(/\n/);
  const inputStringDoubleArray: string[][] = [];
  inputStringArray.forEach((line) => {
    inputStringDoubleArray.push(line.split(splitOn || ""));
  });
  return inputStringDoubleArray;
};

const convertMultiParagraphFileToArray = async (
  input: string,
): Promise<string[][]> => {
  const inputString = await Deno.readTextFile(input);
  const inputStringTrimmed = inputString.trimEnd();
  const arrayOfMultiLineStrings = inputStringTrimmed.split(/\n\n/);
  const arrayOfArraysOfStrings = [];
  for (const multiLineString of arrayOfMultiLineStrings) {
    arrayOfArraysOfStrings.push(multiLineString.split(/\n/));
  }
  return arrayOfArraysOfStrings;
};

export {
  convertMultiLineFileToArray,
  convertMultiLineFileToDoubleArray,
  convertMultiParagraphFileToArray,
};
