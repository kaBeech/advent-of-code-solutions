const convertMultiLineStringToArray = (inputString: string): string[] => {
  const inputStringTrimmed = inputString.trimEnd();
  return inputStringTrimmed.split(/\n/);
};

const convertMultiParagraphStringToArray = (
  inputString: string,
): string[][] => {
  const inputStringTrimmed = inputString.trimEnd();
  const arrayOfMultiLineStrings = inputStringTrimmed.split(/\n\n/);
  const arrayOfArraysOfStrings = [];
  for (const multiLineString of arrayOfMultiLineStrings) {
    arrayOfArraysOfStrings.push(multiLineString.split(/\n/));
  }
  return arrayOfArraysOfStrings;
};

export { convertMultiLineStringToArray, convertMultiParagraphStringToArray };
