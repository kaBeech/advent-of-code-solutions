type ModalBoolean = true | false | null;

type Operator = "+" | "-" | "*" | "/" | "%";

type SingleDigitInteger = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type SingleDigitIntegerString =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";

type TwoDigitIntegerString =
  `${SingleDigitIntegerString}${SingleDigitIntegerString}`;

type XYCoordinateArray = [number, number];

interface XYCoordinates {
  x: number;
  y: number;
}

type CardinalDirection = `North` | `East` | `South` | `West`;

export type {
  CardinalDirection,
  ModalBoolean,
  Operator,
  SingleDigitInteger,
  SingleDigitIntegerString,
  TwoDigitIntegerString,
  XYCoordinateArray,
  XYCoordinates,
};
