# Start Day 8

https://adventofcode.com/2023/day/8

## Pseudocode

### Part 1

Variables: `directions`: string of `direction`s, `direction` "L" or "R", `instructions`: Instruction[], `instruction`: {id: string, l: string, r: string}, `start`: Instruction, `currentInstruction`: Instruction, `totalSteps`: 0

1.  Set `start` to the `instruction` with id of "AAA"
2.  Set `currentInstruction` to `start`
3.  For each `direction`:
    - If `direction` is "L", set `currentInstruction` to the `instruction` with id equal to `currentInstruction.l`. Else set `currentInstruction` to the `instruction` with id equal to `currentInstruction.r`
    - Increase totalSteps by 1
4.  Return `totalSteps`
