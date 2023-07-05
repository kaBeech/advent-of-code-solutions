import { Operator } from "../../tools/commonTypes.ts";

interface MonkeyType {
  inspectItems: () => void;
  getTotalItemsInspected: () => number;
  receiveThrownItem: (thrownItem: number) => void;
}

interface MonkeyState {
  name: number;
  itemsByWorryLevel: number[];
  operator: Operator;
  operand: number | "old";
  divisor: number;
  trueDestination: number;
  falseDestination: number;
  totalItemsInspected: number;
}

export type { MonkeyState, MonkeyType };
