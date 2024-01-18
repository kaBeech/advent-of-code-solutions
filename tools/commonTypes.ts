export type ModalBoolean = true | false | null;

export type Operator = `+` | `-` | `*` | `/` | `%`;

export type SingleDigitInteger = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type SingleDigitIntegerString =
  | `0`
  | `1`
  | `2`
  | `3`
  | `4`
  | `5`
  | `6`
  | `7`
  | `8`
  | `9`;

export type TwoDigitIntegerString =
  `${SingleDigitIntegerString}${SingleDigitIntegerString}`;

export type XYCoordinateArray = [number, number];

export interface XYCoordinates {
  x: number;
  y: number;
}

export type CardinalDirection = `North` | `East` | `South` | `West`;
