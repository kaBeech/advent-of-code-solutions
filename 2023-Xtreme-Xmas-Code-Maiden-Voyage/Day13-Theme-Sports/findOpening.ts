export default (yardline1: string, yardline2: string): boolean => {
  let matchingPositions = 0;
  for (let i = 0; i < yardline1.length; i++) {
    if (yardline1[i] === yardline2[i]) {
      matchingPositions += 1;
    }
  }
  if (matchingPositions === 1) {
    return true;
  } else {
    return false;
  }
};
