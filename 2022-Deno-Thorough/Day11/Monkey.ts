import { Operator } from "../../tools/commonTypes.ts";
import { MonkeyState, MonkeyType } from "./types.ts";

const throwItem = (thrownItem: bigint, destinationMonkey: MonkeyType) => {
  destinationMonkey.receiveThrownItem(thrownItem);
};

const inspectSingleItem = (monkeys: MonkeyType[], state: MonkeyState) => {
  let itemByWorryLevel = state.itemsByWorryLevel.shift() as bigint;

  switch (state.operator) {
    case "+":
      if (state.operand === "old") {
        itemByWorryLevel += itemByWorryLevel;
      } else {
        itemByWorryLevel += BigInt(state.operand);
      }
      break;
    case "*":
      if (state.operand === "old") {
        itemByWorryLevel *= itemByWorryLevel;
      } else {
        itemByWorryLevel *= BigInt(state.operand);
      }
      break;
    default:
      console.error("Unrecognized operator");
  }

  if (state.extraWorrying === false) {
    itemByWorryLevel = BigInt(Math.floor(Number(itemByWorryLevel) / 3));
  }

  state.totalItemsInspected++;
  if (state.name === 2) {
    // console.log(
    //   `Item ${itemByWorryLevel} is being inspected by monkey 2. /19 = ${
    //     itemByWorryLevel % 19
    //   } /23 = ${itemByWorryLevel % 23}`,
    // );
  }
  if (itemByWorryLevel % BigInt(state.divisor) === 0n) {
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
      itemByWorryLevel: bigint;
      destination: number;
    }[] = [];
    while (state.itemsByWorryLevel.length) {
      itemsAndDestinations.push(inspectSingleItem(monkeys, state));
    }
    return itemsAndDestinations;
  },
});

const totalItemsInspectedGetter = (state: MonkeyState) => ({
  getTotalItemsInspected: () => state.totalItemsInspected,
});

const thrownItemReceiver = (state: MonkeyState) => ({
  receiveThrownItem: (thrownItem: bigint) => {
    state.itemsByWorryLevel.push(thrownItem);
    return state.itemsByWorryLevel[state.itemsByWorryLevel.length - 1];
  },
});

const nameGetter = (state: MonkeyState) => ({ getName: () => state.name });

const Monkey = (
  name: number,
  itemsByWorryLevel: bigint[],
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
    ...nameGetter(state),
    ...itemsInspector(state),
    ...thrownItemReceiver(state),
    ...totalItemsInspectedGetter(state),
  };
};

export { Monkey };
