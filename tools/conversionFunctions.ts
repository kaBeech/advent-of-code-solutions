const convertMultiLineFileToArray = async (input: string) => {
  const inputString = await Deno.readTextFile(input);
  const inputStringTrimmed = inputString.trimEnd()
  return inputStringTrimmed.split(/\n/);
};

const convertMultiLineStringToArray = (inputString: string) => {
  return inputString.split(/\n/);
};

const convertMultiParagraphFileToArray = async (input: string) => {
  const inputString = await Deno.readTextFile(input);
  const inputStringTrimmed = inputString.trimEnd()
  return inputStringTrimmed.split(/\n\n/);
};

const convertMultiParagraphStringToArray = (inputString: string) => {
  return inputString.split(/\n\n/);
};

export {
  convertMultiLineFileToArray,
  convertMultiLineStringToArray,
  convertMultiParagraphFileToArray,
  convertMultiParagraphStringToArray,
};
