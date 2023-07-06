import { Operator } from "../../tools/commonTypes.ts";

interface MonkeyType {
  getDivisor: () => number;
  getName: () => number;
  getTotalItemsInspected: () => number;
  receiveThrownItem: (thrownItem: number) => number;
  inspectItems: (monkeys: MonkeyType[], bigDivisor: number) => {
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
  extraWorrying: boolean;
}

export type { MonkeyState, MonkeyType };
