# Start Day 10

https://adventofcode.com/2022/day/10

# ADVISORY - the code for Day10 was written in more of a speedrun style, with less of a focus on code quality than other days. For examples of better-written code, please see Day 9 and before (and presumably Day 11 and onward)

## Pseudocode

let cycleNumber = 1
let registerX = 1
let unfinishedAddXProcesses = {effectiveCycle: number, valueToAdd: number}
let collectedSignalStrengthsSum = [] as number[]
while (const cycleNumber <= total cycles) {
if (unfinishedAddXProcesses[0].effectiveCycle === cycleNumber) {
registerX += unfinishedAddXProcesses.shift().valueToAdd
}

    if (input.operator === "addx") {
        unfinishedAddXProcesses.push({effectiveCycle: cycleNumber + 3, valueToAdd: input.value})
    }

    if (Number.isInteger((cycleNumber + 20)/40)) {
        collectedSignalStrengthsSum += cycleNumber * registerX
    }

    cycleNumber++

}
