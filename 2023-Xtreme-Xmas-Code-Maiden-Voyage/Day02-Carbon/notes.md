# Start Day 2

https://adventofcode.com/2023/day/1

## Pseudocode

### Part 1

Variables: `Games`: Game[], `Game`: string, `PossibleGamesSum`: number = 0

1.  For each `Game`:
    1. Find substrings that contain `## red`. For each substring, if ## is greater than 12, return.
    2. Find substrings that contain `## green`. For each substring, if ## is greater than 13, return.
    3. Find substrings that contain `## blue`. For each substring, if ## is greater than 14, return.
    4. Find the first integer in the `Game` string. Add the value of this integer to `PossibleGamesSum`.
2.  Return `PossibleGamesSum`
