import { Operator } from "../../tools/commonTypes.ts";
import { MonkeyState, MonkeyType } from "./types.ts";

const throwItem = (thrownItem: number, destinationMonkey: MonkeyType) => {
  destinationMonkey.receiveThrownItem(thrownItem);
};

const inspectSingleItem = (monkeys: MonkeyType[], state: MonkeyState) => {
  let itemByWorryLevel = state.itemsByWorryLevel.pop() as number;

  switch (state.operator) {
    case "+":
      if (state.operand === "old") {
        itemByWorryLevel += itemByWorryLevel;
      } else {
        itemByWorryLevel += state.operand;
      }
      break;
    case "*":
      if (state.operand === "old") {
        itemByWorryLevel *= itemByWorryLevel;
      } else {
        itemByWorryLevel *= state.operand;
      }
      break;
    default:
      console.error("Unrecognized operator");
  }

  itemByWorryLevel = Math.floor(itemByWorryLevel / 3);

  state.totalItemsInspected++;
  if (itemByWorryLevel % state.divisor === 0) {
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
  inspectItems: (monkeys: MonkeyType[]) => {
    const itemsAndDestinations: {
      itemByWorryLevel: number;
      destination: number;
    }[] = [];
    state.itemsByWorryLevel.forEach(() =>
      itemsAndDestinations.push(inspectSingleItem(monkeys, state))
    );
    return itemsAndDestinations;
  },
});

const totalItemsInspectedGetter = (state: MonkeyState) => ({
  getTotalItemsInspected: () => state.totalItemsInspected,
});

const thrownItemReceiver = (state: MonkeyState) => ({
  receiveThrownItem: (thrownItem: number) => {
    state.itemsByWorryLevel.push(thrownItem);
    return state.itemsByWorryLevel[-1];
  },
});

const Monkey = (
  name: number,
  itemsByWorryLevel: number[],
  operator: Operator,
  operand: number | "old",
  divisor: number,
  trueDestination: number,
  falseDestination: number,
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
    totalItemsInspected: totalItemsInspected || 0,
  };

  return {
    ...itemsInspector(state),
    ...thrownItemReceiver(state),
    ...totalItemsInspectedGetter(state),
  };
};

export { Monkey };
