import { Operator } from "../../tools/commonTypes.ts";

interface MonkeyType {
  getTotalItemsInspected: () => number;
  receiveThrownItem: (thrownItem: number) => number;
  inspectItems: (monkeys: MonkeyType[]) => {
    itemByWorryLevel: number;
    destination: number;
  }[];
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
