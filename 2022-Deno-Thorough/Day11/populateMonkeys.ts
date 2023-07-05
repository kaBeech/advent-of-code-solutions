import { convertMultiParagraphFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { Monkey } from "./Monkey.ts";
import { MonkeyState, MonkeyType } from "./types.ts";

const populateMonkeys = async (
  challengeInput: string,
  test?: "test" | undefined,
): Promise<MonkeyType[] | MonkeyState[]> => {
  const challengeInputArray = await convertMultiParagraphFileToArray(
    challengeInput,
  );
  const monkeys: MonkeyType[] = [];
  const monkeyStates: MonkeyType[] = [];
  challengeInputArray.forEach((monkeyInput) => {
    const monkey = Monkey();
    monkeys.push(monkey);
  });
  if (test) {
    return monkeyStates;
  }
  return monkeys;
};

export { populateMonkeys };
