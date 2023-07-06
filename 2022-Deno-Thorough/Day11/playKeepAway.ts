import { MonkeyType } from "./types.ts";

const playKeepAway = (
  monkeys: MonkeyType[],
  numberOfRounds: number,
  bigDivisor: number,
): MonkeyType[] => {
  for (let i = 0; i < numberOfRounds; i++) {
    monkeys.forEach((monkey) => monkey.inspectItems(monkeys, bigDivisor));
  }

  return monkeys;
};

export { playKeepAway };
