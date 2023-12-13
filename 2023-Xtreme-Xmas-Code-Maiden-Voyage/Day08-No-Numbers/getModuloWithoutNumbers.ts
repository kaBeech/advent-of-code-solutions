export default (numerator: string[], denominator: string[]): string[] => {
  let modulo: string[] = [];
  const xCopy = numerator.slice();
  let lastElement: string | undefined = undefined;
  while (lastElement) {
    modulo = [];
    for (const _element of denominator) {
      lastElement = xCopy.pop();
      if (lastElement) {
        modulo.push(lastElement);
      }
    }
  }
  return modulo;
};
