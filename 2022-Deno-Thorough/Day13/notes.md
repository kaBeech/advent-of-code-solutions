# Start Day 13

https://adventofcode.com/2022/day/13

## Pseudocode

### Part 1

#### Overall app

let indexSum = 0

For each pair (X and Y) of packets (and index of this pair), if (comparePackets(X, Y) === "right order") { indexSum += index }

return indexSum

#### Is this pair in the right order?

const comparePackets = (X: number | Array, Y: number | Array) => {

1. if (typeof X === number && typeof Y === number) {
   if (X < Y) {
   return "right order"
   } else if (X > Y) {
   return "wrong order"
   } else return "indeterminate order"
   } else continue to next step
   }

2. if (typeof X === Array && typeof Y === Array) {
   while (X.length > 0 && Y.length > 0) {
   const result = comparePackets(X.shift(), Y.shift())
   switch result {
   case "right order":
   return "right order";
   case "wrong order":
   return"wrong order";
   default:
   continue
   }
   if (Y.length > 0) {
   return "right order"
   } else if (X.length > 0) {
   return "wrong order"
   } else return "indeterminate order"
   } else continue to next step
   }

3. if (typeof X === number) {
   return comparePackets([X], Y)
   } else continue to next step

4. if (typeof Y === number) {
   return comparePackets(X, [Y])
   } else throw new Error with Message: `Packets ${X} and ${Y} are not comparable`
