export default (
  reservoirInUse: boolean,
  directions: string[],
  directionsReservoir: string[],
) => {
  const processedDirections = directions.slice();
  const processedDirectionsReservoir = directionsReservoir.slice();
  let thisCurrentDirection: string;
  if (reservoirInUse) {
    if (processedDirectionsReservoir.toString() === ``) {
      reservoirInUse = false;
      thisCurrentDirection = processedDirections.shift()!;
      processedDirectionsReservoir.push(thisCurrentDirection);
    } else {
      thisCurrentDirection = processedDirectionsReservoir.shift()!;
      processedDirections.push(thisCurrentDirection);
    }
  } else {
    if (processedDirections.toString() === ``) {
      reservoirInUse = true;
      thisCurrentDirection = processedDirectionsReservoir.shift()!;
      processedDirections.push(thisCurrentDirection);
    } else {
      thisCurrentDirection = processedDirections.shift()!;
      processedDirectionsReservoir.push(thisCurrentDirection);
    }
  }
  return {
    thisCurrentDirection,
    reservoirInUse,
    processedDirections,
    processedDirectionsReservoir,
  };
};
