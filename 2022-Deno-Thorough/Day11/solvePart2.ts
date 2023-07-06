import { getMonkeyBusinessLevel } from "./getMonkeyBusinessLevel.ts";
import { playKeepAway } from "./playKeepAway.ts";
import { populateMonkeys } from "./populateMonkeys.ts";
import { MonkeyType } from "./types.ts";

const solvePart2 = async (challengeInput: string): Promise<number> => {
  const monkeys: MonkeyType[] = await populateMonkeys(
    challengeInput,
    true,
  ) as MonkeyType[];
  playKeepAway(monkeys, 10000);
  return getMonkeyBusinessLevel(monkeys);
};

export { solvePart2 };
