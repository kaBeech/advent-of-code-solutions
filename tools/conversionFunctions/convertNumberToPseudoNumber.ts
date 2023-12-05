export const convertSingleDigitNumberToPseudoNumberString = (
  number: number,
) => {
  const pseudoNumbers = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  return pseudoNumbers[number];
};
