import { Operator } from "../../tools/commonTypes.ts";

interface MonkeyState {
  name: number;
  itemsByWorryLevel: number[];
  operator: Operator;
  operand: number;
  divisor: number;
  trueDestination: number;
  falseDestination: number;
  totalItemsInspected: number;
}

interface Monkey {
  inspectItems: () => void;
  getTotalItemsInspected: () => void;
  receiveThrownItem: (thrownItem: number) => void;
  throwItem: (destinationMonkey: Monkey) => void;
}

let monkeys: Monkey[];

const throwItem = (thrownItem: number, destinationMonkey: Monkey) => {
  destinationMonkey.receiveThrownItem(thrownItem);
};

const inspectSingleItem = (state: MonkeyState) => {
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
  // inspectItems: () => state.modalBoolean,
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
