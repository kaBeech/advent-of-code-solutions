const convertLowercaseLetterToNumber = (letter: string): number => {
  return letter.charCodeAt(0) - 96;
};

export { convertLowercaseLetterToNumber };
