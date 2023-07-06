import { getMonkeyBusinessLevel } from "./getMonkeyBusinessLevel.ts";
import { playKeepAway } from "./playKeepAway.ts";
import { populateMonkeys } from "./populateMonkeys.ts";
import { MonkeyType } from "./types.ts";

const solvePart2 = async (challengeInput: string): Promise<number> => {
  const monkeys: MonkeyType[] = await populateMonkeys(
    challengeInput,
    true,
  ) as MonkeyType[];
  let bigDivisor = 1;
  monkeys.forEach((monkey) => {
    bigDivisor *= monkey.getDivisor();
  });
  playKeepAway(monkeys, 10000, bigDivisor);
  return getMonkeyBusinessLevel(monkeys);
};

export { solvePart2 };
