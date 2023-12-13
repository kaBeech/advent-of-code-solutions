import { subtractOneWithoutNumbers } from "./subtractWithoutNumbers.ts";

export default (numerator: string, denominator: string): string => {
  let modulo = ``;
  let xCopy = numerator;
  while (xCopy !== ``) {
    modulo = ``;
    for (const _element of denominator) {
      xCopy = subtractOneWithoutNumbers(xCopy);
      if (xCopy !== ``) {
        modulo += `N`;
      }
    }
  }
  return modulo;
};
