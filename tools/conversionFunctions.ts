const convertMultiLineFileToArray = async (input: string) => {
  const inputString = await Deno.readTextFile(input);
  const inputStringTrimmed = inputString.trimEnd()
  return inputStringTrimmed.split(/\n/);
};

const convertMultiParagraphFileToArray = async (input: string) => {
  const inputString = await Deno.readTextFile(input);
  const inputStringTrimmed = inputString.trimEnd()
  return inputStringTrimmed.split(/\n\n/);
};

const convertXYCoordinatesToIndexNumber = () => {

}

export {
  convertMultiLineFileToArray,
  convertMultiParagraphFileToArray,
  convertXYCoordinatesToIndexNumber,
};
