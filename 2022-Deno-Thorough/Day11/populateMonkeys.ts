import { convertMultiParagraphFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { Monkey } from "./Monkey.ts";
import { MonkeyType } from "./types.ts";

const populateMonkeys = async (
  challengeInput: string,
): Promise<MonkeyType[]> => {
  const challengeInputArray = await convertMultiParagraphFileToArray(
    challengeInput,
  );
  const monkeys: MonkeyType[] = [];
  challengeInputArray.forEach((monkeyInput) => {
    const monkey = Monkey();
    monkeys.push(monkey);
  });
  return monkeys;
};

export { populateMonkeys };
