export default (
  reservoirInUse: boolean,
  directions: string[],
  directionsReservoir: string[],
) => {
  const processedDirections = directions.slice();
  const processedDirectionsReservoir = directionsReservoir.slice();
  let currentDirection: string;
  if (reservoirInUse) {
    if (processedDirectionsReservoir.toString() === ``) {
      reservoirInUse = false;
      currentDirection = processedDirections.shift()!;
      processedDirectionsReservoir.push(currentDirection);
    } else {
      currentDirection = processedDirectionsReservoir.shift()!;
      processedDirections.push(currentDirection);
    }
  } else {
    if (processedDirections.toString() === ``) {
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
