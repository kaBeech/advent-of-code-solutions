import { Operator } from "../../tools/commonTypes.ts";

interface MonkeyType {
  getDivisor: () => number;
  getName: () => number;
  getTotalItemsInspected: () => number;
  receiveThrownItem: (thrownItem: bigint) => bigint;
  inspectItems: (monkeys: MonkeyType[], bigDivisor: number) => {
    itemByWorryLevel: bigint;
    destination: number;
  }[];
}

interface MonkeyState {
  name: number;
  itemsByWorryLevel: bigint[];
  operator: Operator;
  operand: number | "old";
  divisor: number;
  trueDestination: number;
  falseDestination: number;
  totalItemsInspected: number;
  extraWorrying: boolean;
}

export type { MonkeyState, MonkeyType };
