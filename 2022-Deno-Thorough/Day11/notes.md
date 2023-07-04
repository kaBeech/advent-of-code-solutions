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
2. Give each monkey a method to inspect each item xe is holding

#### Inspection method

For each itemByWorryLevel {

1. itemByWorryLevel = itemByWorryLevel (operator) operand
2. itemByWorryLevel = itemByWorryLevel floor/ 3
3. if (itemByWorryLevel is evenly divisible by divisor) { throw to trueDestination } else { throw to falseDestination }
4. totalItemsInspected += 1
   }

#### Do 20 rounds of inspection

1. For each monkey {inspect each item held}
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

const monkeyBusinessLevel = mostActiveMonkey.totalItemsInspected \* secondMostActiveMonkey.totalItemsInspected
