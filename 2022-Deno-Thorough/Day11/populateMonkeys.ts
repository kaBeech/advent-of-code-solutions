import { Operator } from "../../tools/commonTypes.ts";
import { convertMultiParagraphFileToArray } from "../../tools/conversionFunctions/convertFileToArray.ts";
import { Monkey } from "./Monkey.ts";
import { MonkeyState, MonkeyType } from "./types.ts";

const populateMonkeys = async (
  challengeInput: string,
  extraWorrying: boolean,
  test?: "test" | undefined,
): Promise<MonkeyType[] | MonkeyState[]> => {
  const challengeInputArray = await convertMultiParagraphFileToArray(
    challengeInput,
  );
  const monkeys: MonkeyType[] = [];
  const monkeyStates: MonkeyType[] = [];
  challengeInputArray.forEach((monkeyInput) => {
    const name = +(monkeyInput[0].match(/\d+/) as RegExpMatchArray);
    const itemsByWorryLevel: number[] = [];
    const itemsByWorryLevelStrings = monkeyInput[1].match(/\d+/g);
    itemsByWorryLevelStrings?.forEach((item) =>
      itemsByWorryLevel.push(Number(item))
    );
    const operator =
      (monkeyInput[2].match(/[+]|[*]/) as RegExpMatchArray)[0] as Operator;
    let operand: RegExpMatchArray | null | number | "old" = monkeyInput[2]
      .match(/\d+/);
    operand ? operand = +operand : operand = "old";
    const divisor = +(monkeyInput[3].match(/\d+/) as RegExpMatchArray);
    const trueDestination = +(monkeyInput[4].match(/\d+/) as RegExpMatchArray);
    const falseDestination = +(monkeyInput[5].match(/\d+/) as RegExpMatchArray);
    const monkey = Monkey(
      name,
      itemsByWorryLevel,
      operator,
      operand,
      divisor,
      trueDestination,
      falseDestination,
      extraWorrying,
    );
    monkeys.push(monkey);
  });
  if (test) {
    return monkeyStates;
  }
  return monkeys;
};

export { populateMonkeys };
