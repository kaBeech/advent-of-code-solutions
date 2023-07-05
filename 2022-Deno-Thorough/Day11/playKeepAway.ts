import { MonkeyType } from "./types.ts";

const playKeepAway = (
  monkeys: MonkeyType[],
  numberOfRounds: number,
): MonkeyType[] => {
  for (let i = 0; i < numberOfRounds; i++) {
    monkeys.forEach((monkey) => monkey.inspectItems());
  }

  return monkeys;
};
