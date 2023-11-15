# Start Day 5

https://adventofcode.com/2017/day/5

## Pseudocode

### Part 1

Variables: `Maze`: JumpInstruction[], `JumpInstruction`: number, `CurrentIndex`: 0. `StepsTaken`: 0

1.  If `CurrentIndex` is less than 0 or greater than the length of `Maze`, Return `StepsTaken`
2.  `Maze`[`CurrentIndex`] += 1
3.  `CurrentIndex` += `Maze`[`CurrentIndex`] - 1
4.  Add 1 to `StepsTaken`
5.  Go To Step 1
