type integer =
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

type twoDigitInteger = `${integer}${integer}`;

export type { integer, twoDigitInteger };
