export default (
  reservoirInUse: boolean,
  directions: string[],
  directionsReservoir: string[],
) => {
  const processedDirections = directions.slice();
  const processedDirectionsReservoir = directionsReservoir.slice();
  let currentDirection: string;
  if (reservoirInUse) {
    // This checks whether directionsReservoir is empty without using any numbers
    if (processedDirectionsReservoir == false) {
      reservoirInUse = false;
      currentDirection = processedDirections.shift()!;
      processedDirectionsReservoir.push(currentDirection);
    } else {
      currentDirection = processedDirectionsReservoir.shift()!;
      processedDirections.push(currentDirection);
    }
  } else {
    // This checks whether directions is empty without using any numbers
    if (processedDirections == false) {
      reservoirInUse = true;
      currentDirection = processedDirectionsReservoir.shift()!;
      processedDirections.push(currentDirection);
    } else {
      currentDirection = processedDirections.shift()!;
      processedDirectionsReservoir.push(currentDirection);
    }
  }
  return {
    currentDirection,
    reservoirInUse,
    processedDirections,
    processedDirectionsReservoir,
  };
};
