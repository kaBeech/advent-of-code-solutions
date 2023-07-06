import { getMonkeyBusinessLevel } from "./getMonkeyBusinessLevel.ts";
import { playKeepAway } from "./playKeepAway.ts";
import { populateMonkeys } from "./populateMonkeys.ts";
import { MonkeyType } from "./types.ts";

const solvePart1 = async (challengeInput: string): Promise<number> => {
  const monkeys: MonkeyType[] = await populateMonkeys(
    challengeInput,
    false,
  ) as MonkeyType[];
  playKeepAway(monkeys, 20);
  return getMonkeyBusinessLevel(monkeys);
};

export { solvePart1 };
