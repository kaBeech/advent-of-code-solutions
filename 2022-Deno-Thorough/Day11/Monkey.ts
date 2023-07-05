import { Operator } from "../../tools/commonTypes.ts";
import { MonkeyState, MonkeyType } from "./types.ts";

const throwItem = (thrownItem: number, destinationMonkey: MonkeyType) => {
  destinationMonkey.receiveThrownItem(thrownItem);
};

const inspectSingleItem = (monkeys: MonkeyType[], state: MonkeyState) => {
  let item = state.itemsByWorryLevel.pop() as number;

  switch (state.operator) {
    case "+":
      item += state.operand;
      break;
    case "*":
      item *= state.operand;
      break;
    default:
      console.error("Unrecognized operator");
  }

  item = Math.floor(item / 3);

  if (item % state.divisor === 0) {
    throwItem(item, monkeys[state.trueDestination]);
  } else {
    throwItem(item, monkeys[state.falseDestination]);
  }

  state.totalItemsInspected++;
};

const itemsInspector = (state: MonkeyState) => ({
  inspectItems: (monkeys: MonkeyType[]) => {
    state.itemsByWorryLevel.forEach(() => inspectSingleItem(monkeys, state));
  },
});

const totalItemsInspectedGetter = (state: MonkeyState) => ({
  getTotalItemsInspected: () => state.totalItemsInspected,
});

const thrownItemReceiver = (state: MonkeyState) => ({
  receiveThrownItem: (thrownItem: number) =>
    state.itemsByWorryLevel.push(thrownItem),
});

const Monkey = (
  name: number,
  itemsByWorryLevel: number[],
  operator: Operator,
  operand: number,
  divisor: number,
  trueDestination: number,
  falseDestination: number,
) => {
  const state = {
    name,
    itemsByWorryLevel,
    operator,
    operand,
    divisor,
    trueDestination,
    falseDestination,
    totalItemsInspected: 0,
  };

  return {
    ...itemsInspector(state),
    ...thrownItemReceiver(state),
    ...totalItemsInspectedGetter(state),
  };
};

export { Monkey };
