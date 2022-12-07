const convertMultiLineFileToArray = async (input: string) => {
  const inputString = await Deno.readTextFile(input);
  return inputString.split(/\n/);
};

const convertMultiLineStringToArray = (inputString: string) => {
  return inputString.split(/\n/);
};

const convertMultiParagraphFileToArray = async (input: string) => {
  const inputString = await Deno.readTextFile(input);
  return inputString.split(/\n\n/);
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
