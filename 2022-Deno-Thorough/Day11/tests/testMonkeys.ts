import { Monkey } from "../Monkey.ts";
import { MonkeyState } from "../types.ts";

const testMonkeyStates: MonkeyState[] = [
  //         Monkey 0:
  //   Starting items: 79, 98
  //   Operation: new = old * 19
  //   Test: divisible by 23
  //     If true: throw to monkey 2
  //     If false: throw to monkey 3
  {
    name: 0,
    itemsByWorryLevel: [79, 98],
    operator: "*",
    operand: 19,
    divisor: 23,
    trueDestination: 2,
    falseDestination: 3,
    totalItemsInspected: 0,
  },
  // Monkey 1:
  //   Starting items: 54, 65, 75, 74
  //   Operation: new = old + 6
  //   Test: divisible by 19
  //     If true: throw to monkey 2
  //     If false: throw to monkey 0
  {
    name: 1,
    itemsByWorryLevel: [54, 65, 75, 74],
    operator: "+",
    operand: 6,
    divisor: 19,
    trueDestination: 2,
    falseDestination: 0,
    totalItemsInspected: 0,
  },
  // Monkey 2:
  //   Starting items: 79, 60, 97
  //   Operation: new = old * old
  //   Test: divisible by 13
  //     If true: throw to monkey 1
  //     If false: throw to monkey 3
  {
    name: 2,
    itemsByWorryLevel: [79, 60, 97],
    operator: "*",
    operand: "old",
    divisor: 13,
    trueDestination: 1,
    falseDestination: 3,
    totalItemsInspected: 0,
  },
  // Monkey 3:
  //   Starting items: 74
  //   Operation: new = old + 3
  //   Test: divisible by 17
  //     If true: throw to monkey 0
  //     If false: throw to monkey 1
  {
    name: 3,
    itemsByWorryLevel: [74],
    operator: "+",
    operand: 3,
    divisor: 17,
    trueDestination: 0,
    falseDestination: 1,
    totalItemsInspected: 0,
  },
];

const testMonkeys = [
  Monkey(0, [79, 98], "*", 19, 23, 2, 3, true),
  Monkey(1, [54, 65, 75, 74], "+", 6, 19, 2, 0, true),
  Monkey(2, [79, 60, 97], "*", "old", 13, 1, 3, true),
  Monkey(3, [74], "+", 3, 17, 0, 1, true),
];

export { testMonkeys, testMonkeyStates };
