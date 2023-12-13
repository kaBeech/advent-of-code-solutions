export default (x: string[], y: string[]) => {
  const xCopy = x.slice();
  const quotient: string[] = [];
  const remainder: string[] = [];
  let lastElement: string | undefined = undefined;
  while (remainder.toString() === `` && xCopy.toString() !== ``) {
    for (const _element of y) {
      lastElement = xCopy.pop();
      if (lastElement !== undefined) {
        remainder.push(lastElement);
      }
    }
    if (lastElement !== undefined) {
      quotient.push(`N`);
      remainder.length = 0;
    }
  }

  return { quotient, remainder };
};
