// This file is for scratch coding in ts while psuedocoding

type Operator = "+" | "-" | "*" | "/" | "%";

const Monkey = (
  name: number,
  itemsByWorryLevel: number[],
  operator: Operator,
  operand: number,
  divisor: number,
  trueDestination: number,
  falseDestination: number,
) => {
  const _state = {
    name,
    itemsByWorryLevel,
    operator,
    operand,
    divisor,
    trueDestination,
    falseDestination,
    totalItemsInspected: 0,
  };

  //   return {
  // ...modalBooleanGetter(state),
  // ...modalBooleanSetter(state),
  //   };
};

export { Monkey };

// const monkeyBusinessLevel = mostActiveMonkey.totalItemsInspected *
//   secondMostActiveMonkey.totalItemsInspected;
