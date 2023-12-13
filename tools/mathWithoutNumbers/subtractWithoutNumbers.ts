// numbers must be strings of "N"s

export const subtractOneWithoutNumbers = (x: string) => {
  let i = `N`;
  let xMinusOne = ``;
  while (i !== x) {
    xMinusOne += `N`;
    i += `N`;
  }

  return xMinusOne;
};

export default (x: string, y: string) => {
  let i = ``;
  let difference = x;
  while (i !== y) {
    difference = subtractOneWithoutNumbers(difference);
    i += `N`;
  }

  return difference;
};
