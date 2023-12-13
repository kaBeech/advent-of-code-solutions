import { subtractOneWithoutNumbers } from "./subtractWithoutNumbers.ts";

export default (x: string, y: string) => {
  let xCopy = x;
  let quotient = ``;
  let remainder = ``;
  while (xCopy !== ``) {
    for (const _element of y) {
      if (xCopy !== ``) {
        xCopy = subtractOneWithoutNumbers(xCopy);
        remainder += `N`;
      }
    }
    if (xCopy !== ``) {
      quotient += `N`;
      remainder = ``;
    }
  }

  return { quotient, remainder };
};
