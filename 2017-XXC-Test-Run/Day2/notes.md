# Start Day 2

https://adventofcode.com/2017/day/2

## Pseudocode

### Part 1

Variables: `ArrayOfRowsOfValues`,  `HighestValue`, `LowestValue`, `Checksum`

- For each `RowOfValues` in `ArrayOfRowsOfValues`:
   1. Sort `RowOfValues`. Set the first and last values as `HighestValue` and `LowestValue`
   2. Add {`HighestValue` - `LowestValue`} to `CheckSum`

- Return `Checksum`