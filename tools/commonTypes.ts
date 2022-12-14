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

type TwoDigitIntegerString = `${SingleDigitIntegerString}${SingleDigitIntegerString}`;

type ModalBoolean = true | false | null;

export type { SingleDigitIntegerString, ModalBoolean, TwoDigitIntegerString, SingleDigitInteger };
