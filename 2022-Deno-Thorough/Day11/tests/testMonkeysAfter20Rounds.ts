import { Monkey } from "../Monkey.ts";
import { MonkeyState } from "../types.ts";

const testMonkeysAfter20RoundsStates: MonkeyState[] = [
  {
    name: 0,
    itemsByWorryLevel: [10n, 12n, 14n, 2n, 34n],
    operator: "*",
    operand: 19,
    divisor: 23,
    trueDestination: 2,
    falseDestination: 3,
    totalItemsInspected: 101,
    extraWorrying: false,
  },
  {
    name: 1,
    itemsByWorryLevel: [245n, 93n, 53n, 199n, 115n],
    operator: "+",
    operand: 6,
    divisor: 19,
    trueDestination: 2,
    falseDestination: 0,
    totalItemsInspected: 95,
    extraWorrying: false,
  },
  {
    name: 2,
    itemsByWorryLevel: [],
    operator: "*",
    operand: "old",
    divisor: 13,
    trueDestination: 1,
    falseDestination: 3,
    totalItemsInspected: 7,
    extraWorrying: false,
  },
  {
    name: 3,
    itemsByWorryLevel: [],
    operator: "+",
    operand: 3,
    divisor: 17,
    trueDestination: 0,
    falseDestination: 1,
    totalItemsInspected: 105,
    extraWorrying: false,
  },
];

const testMonkeysAfter20Rounds = [
  Monkey(0, [10n, 12n, 14n, 26n, 34n], "*", 19, 23, 2, 3, false, 101),
  Monkey(1, [245n, 93n, 53n, 199n, 115n], "+", 6, 19, 2, 0, false, 95),
  Monkey(2, [], "*", "old", 13, 1, 3, false, 7),
  Monkey(3, [], "+", 3, 17, 0, 1, false, 105),
];

const testMonkeysAfter20RoundsPart2 = [
  Monkey(0, [10n, 12n, 14n, 26n, 34n], "*", 19, 23, 2, 3, true, 52166),
  Monkey(1, [245n, 93n, 53n, 199n, 115n], "+", 6, 19, 2, 0, true, 47830),
  Monkey(2, [], "*", "old", 13, 1, 3, true, 1938),
  Monkey(3, [], "+", 3, 17, 0, 1, true, 52013),
];

export {
  testMonkeysAfter20Rounds,
  testMonkeysAfter20RoundsPart2,
  testMonkeysAfter20RoundsStates,
};
