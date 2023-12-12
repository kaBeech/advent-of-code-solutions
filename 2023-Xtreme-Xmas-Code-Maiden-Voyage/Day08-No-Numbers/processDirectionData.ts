export default (
  reservoirInUse: boolean,
  directions: string[],
  directionsReservoir: string[],
) => {
  let currentDirection: string;
  if (reservoirInUse) {
    // This checks whether directionsReservoir is empty without using any numbers
    if (directionsReservoir == false) {
      reservoirInUse = false;
      currentDirection = directions.shift()!;
      directionsReservoir.push(currentDirection);
    } else {
      currentDirection = directionsReservoir.shift()!;
      directions.push(currentDirection);
    }
  } else {
    // This checks whether directions is empty without using any numbers
    if (directions == false) {
      reservoirInUse = true;
      currentDirection = directionsReservoir.shift()!;
      directions.push(currentDirection);
    } else {
      currentDirection = directions.shift()!;
      directionsReservoir.push(currentDirection);
    }
  }
  return { currentDirection, reservoirInUse, directions, directionsReservoir };
};
