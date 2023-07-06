import { Operator } from "../../tools/commonTypes.ts";
import { MonkeyState, MonkeyType } from "./types.ts";

const throwItem = (thrownItem: number, destinationMonkey: MonkeyType) => {
  destinationMonkey.receiveThrownItem(thrownItem);
};

const inspectSingleItem = (
  monkeys: MonkeyType[],
  bigDivisor: number,
  state: MonkeyState,
) => {
  let itemByWorryLevel = state.itemsByWorryLevel.shift() as number;

  switch (state.operator) {
    case "+":
      if (state.operand === "old") {
        itemByWorryLevel += itemByWorryLevel;
      } else {
        itemByWorryLevel += Number(state.operand);
      }
      break;
    case "*":
      if (state.operand === "old") {
        itemByWorryLevel *= itemByWorryLevel;
      } else {
        itemByWorryLevel *= Number(state.operand);
      }
      break;
    default:
      console.error("Unrecognized operator");
  }

  if (state.extraWorrying === false) {
    itemByWorryLevel = Number(Math.floor(Number(itemByWorryLevel) / 3));
  }

  state.totalItemsInspected++;
  itemByWorryLevel = itemByWorryLevel % bigDivisor;
  if ((itemByWorryLevel) % state.divisor === 0) {
    throwItem(itemByWorryLevel, monkeys[state.trueDestination]);
    return {
      itemByWorryLevel: itemByWorryLevel,
      destination: state.trueDestination,
    };
  } else {
    throwItem(itemByWorryLevel, monkeys[state.falseDestination]);
    return {
      itemByWorryLevel: itemByWorryLevel,
      destination: state.falseDestination,
    };
  }
};

const itemsInspector = (state: MonkeyState) => ({
  inspectItems: (monkeys: MonkeyType[], bigDivisor: number) => {
    const itemsAndDestinations: {
      itemByWorryLevel: number;
      destination: number;
    }[] = [];
    while (state.itemsByWorryLevel.length) {
      itemsAndDestinations.push(inspectSingleItem(monkeys, bigDivisor, state));
    }
    return itemsAndDestinations;
  },
});

const totalItemsInspectedGetter = (state: MonkeyState) => ({
  getTotalItemsInspected: () => state.totalItemsInspected,
});

const thrownItemReceiver = (state: MonkeyState) => ({
  receiveThrownItem: (thrownItem: number) => {
    state.itemsByWorryLevel.push(thrownItem);
    return state.itemsByWorryLevel[state.itemsByWorryLevel.length - 1];
  },
});

const nameGetter = (state: MonkeyState) => ({ getName: () => state.name });

const divisorGetter = (state: MonkeyState) => ({
  getDivisor: () => state.divisor,
});

const Monkey = (
  name: number,
  itemsByWorryLevel: number[],
  operator: Operator,
  operand: number | "old",
  divisor: number,
  trueDestination: number,
  falseDestination: number,
  extraWorrying: boolean,
  totalItemsInspected?: number,
) => {
  const state = {
    name,
    itemsByWorryLevel,
    operator,
    operand,
    divisor,
    trueDestination,
    falseDestination,
    extraWorrying,
    totalItemsInspected: totalItemsInspected || 0,
  };

  return {
    ...divisorGetter(state),
    ...nameGetter(state),
    ...itemsInspector(state),
    ...thrownItemReceiver(state),
    ...totalItemsInspectedGetter(state),
  };
};

export { Monkey };
