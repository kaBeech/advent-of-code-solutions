import { convertMultiParagraphFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { Monkey } from "./Monkey.ts";
import { MonkeyState } from "./types.ts";

const populateMonkeys = async (
  challengeInput: string,
): Promise<MonkeyState[]> => {
  const challengeInputArray = await convertMultiParagraphFileToArray(
    challengeInput,
  );
  const monkeys: MonkeyState[] = [];
  challengeInputArray.forEach((monkeyInput) => {
    const monkey = Monkey();
    monkeys.push(monkey);
  });
  return monkeys;
};

export { populateMonkeys };
