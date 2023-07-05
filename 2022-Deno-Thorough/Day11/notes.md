# Start Day 11

https://adventofcode.com/2022/day/11

## Pseudocode

### Part 1

#### Parse input

1. Split input into an array of monkeyParagraphs
2. Split each monkeyParagraph into an array of monkeyLines
3. Use regex to get integers and (+ or \*) from the monkeyLines

#### Make monkeys

1. const Monkey = (
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
   };
2. Give each monkey a method to receive a thrown item
3. Give each monkey a method to throw an item
4. Give each monkey a method to inspect each item xe is holding
5. Give each monkey a getTotalItemsInspected method

#### ReceiveThrownItem method

1. Push the thrown item to monkey's state.itemsByWorryLevel array

#### Throw item method

1. Pop the item out of monkey's state.itemsByWorryLevel array
2. Call the receiveThrownItem method on the destinationMonkey

#### Inspection method

For each itemByWorryLevel:

1. Do the operation (on the itemByWorryLevel) specified by state.operator with state.operand
2. Floor divide the itemByWorryLevel by 3
3. if itemByWorryLevel is evenly divisible by divisor, throw to trueDestination, else throw to falseDestination
4. Add 1 to state.totalItemsInspected

#### Do 20 rounds of inspection

1. For each monkey, inspect each item that monkey holds
2. Do this 20 times

#### Find the 2 most active monkeys

let mostActiveMonkey: Monkey
let secondMostActiveMonkey: Monkey

For each monkey {

if (monkey.totalItemsInspected > mostActiveMonkey.totalItemsInspected) {
secondMostActiveMonkey = mostActiveMonkey;
mostActiveMonkey = monkey;
}

else if (monkey.totalItemsInspected > secondMostActiveMonkey.totalItemsInspected) {
secondMostActiveMonkey = monkey
}
}

#### Find the level of monkey business

Multiply the totalItemsInspected values of the most and second most active monkeys
