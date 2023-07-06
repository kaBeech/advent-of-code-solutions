import { getMonkeyBusinessLevel } from "./getMonkeyBusinessLevel.ts";
import { playKeepAway } from "./playKeepAway.ts";
import { populateMonkeys } from "./populateMonkeys.ts";
import { MonkeyType } from "./types.ts";

const solvePart1 = async (challengeInput: string): Promise<number> => {
  const monkeys: MonkeyType[] = await populateMonkeys(
    challengeInput,
    false,
  ) as MonkeyType[];
  const bigDivisor = 1;
  playKeepAway(monkeys, 20, bigDivisor);
  return getMonkeyBusinessLevel(monkeys);
};

export { solvePart1 };
