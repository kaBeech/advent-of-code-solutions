# Start Day 4

https://adventofcode.com/2017/day/4

## Pseudocode

"You must complete this challenge using no strings"

### Part 1

Variables: `Passphrase`, `Sequence`, `Compare`, `ValidPassphraseCounter`

`Sequence` = an array of character codes making a numeric sequence representing a password

`Compare` = a function that take 2 arrays of Numbers, iterates through their elements, and returns True if each pair of elements are identical, False if not

- For each `Passphrase`:

  1. Parse the `Passphrase` into an array of `Sequences`
  2. For each `Sequence`, `Compare` against every other `Sequence` in the `Passphrase`:
     - If `Compare` ever returns False, return and move on to the next `Passphrase`
     - Else, increase `ValidPassphraseCounter` by 1

- Return `ValidPassphraseCounter`
