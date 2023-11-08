export const solvePart2 = (squareNumber: number) => {
  const squares = [];
  const stepsTaken: number[] = [0];
  const direction = ["E"];
  const stepsNeeded = [1];
  for (
    const i = [1];
    i.length <= squareNumber;
    i.push(1)
  ) {
    const square: {
      number: number;
      coordinates: { x: number; y: number };
      value: number;
    } = {
      number: i.length,
      coordinates: {
        x: 0,
        y: 0,
      },
      value: 0,
    };
    if (square.number === 1) {
      square.value = 1;
    } else {
      stepsTaken[0] = stepsTaken[0] + 1;
      switch (direction[0]) {
        case "E":
          square.coordinates.x = squares[0].coordinates.x + 1;
          square.coordinates.y = squares[0].coordinates.y;
          break;
        case "N":
          square.coordinates.x = squares[0].coordinates.x;
          square.coordinates.y = squares[0].coordinates.y + 1;
          break;
        case "W":
          square.coordinates.x = squares[0].coordinates.x - 1;
          square.coordinates.y = squares[0].coordinates.y;
          break;
        case "S":
          square.coordinates.x = squares[0].coordinates.x;
          square.coordinates.y = squares[0].coordinates.y - 1;
          break;
        default:
          throw new Error("Invalid direction");
      }
      const adjacentSquares = squares.filter(
        (adjacentSquareCandidate) =>
          Math.abs(
              adjacentSquareCandidate.coordinates.x - square.coordinates.x,
            ) <= 1 &&
          Math.abs(
              adjacentSquareCandidate.coordinates.y - square.coordinates.y,
            ) <= 1,
      );
      adjacentSquares.forEach((adjacentSquare) => {
        square.value = square.value + adjacentSquare.value;
      });
    }

    if (stepsTaken[0] === stepsNeeded.length) {
      stepsTaken[0] = 0;
      switch (direction.shift()) {
        case "E":
          direction.unshift("N");
          break;
        case "N":
          direction.unshift("W");
          stepsNeeded.unshift(1);
          break;
        case "W":
          direction.unshift("S");
          break;
        case "S":
          direction.unshift("E");
          stepsNeeded.unshift(1);
          break;
        default:
          throw new Error("Invalid direction");
      }
    }
    if (square.value > squareNumber) {
      return { solution: square.value };
    }
    squares.unshift(square);
  }
};
