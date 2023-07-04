// This file is for scratch coding in ts while psuedocoding

type Operand = "+" | "-" | "*" | "/" | "%";

const Monkey = (
  name: number,
  itemsByWorryLevel: number[],
  operator: string,
  operand: Operand,
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

  //   return {
  // ...modalBooleanGetter(state),
  // ...modalBooleanSetter(state),
  //   };
};
