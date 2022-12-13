const convertXYCoordinatesToIndexNumber = (xyCoordinates: number[], base: number) => {

  const index = (xyCoordinates[0] + (xyCoordinates[1] * base))

  return index
}

export {
  convertXYCoordinatesToIndexNumber,
};
