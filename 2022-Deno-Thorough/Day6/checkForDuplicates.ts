const checkForDuplicates = (arrayToParse: string[]) => {
  for (const element of arrayToParse) {
    if (arrayToParse.includes(element, arrayToParse.indexOf(element) + 1)) {
      return true;
    }
  }
  return false;
};

export { checkForDuplicates };
