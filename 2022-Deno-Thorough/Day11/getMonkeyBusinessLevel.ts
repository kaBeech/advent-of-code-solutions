import { MonkeyType } from "./types.ts";

const getMonkeyBusinessLevel = (
  monkeys: MonkeyType[],
): number => {
  let mostActiveMonkey = { getTotalItemsInspected: () => 0 } as MonkeyType;
  let secondMostActiveMonkey = {
    getTotalItemsInspected: () => 0,
  } as MonkeyType;
  monkeys.forEach((monkey) => {
    if (
      monkey.getTotalItemsInspected() >
        mostActiveMonkey.getTotalItemsInspected()
    ) {
      secondMostActiveMonkey = mostActiveMonkey;
      mostActiveMonkey = monkey;
    } else if (
      monkey.getTotalItemsInspected() >
        secondMostActiveMonkey.getTotalItemsInspected()
    ) {
      secondMostActiveMonkey = monkey;
    }
  });
  const monkeyBusinessLevel = mostActiveMonkey.getTotalItemsInspected() *
    secondMostActiveMonkey.getTotalItemsInspected();
  return monkeyBusinessLevel;
};

export { getMonkeyBusinessLevel };
