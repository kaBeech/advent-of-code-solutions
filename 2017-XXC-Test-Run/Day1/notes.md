# Start Day

https://adventofcode.com/2017/day/1

## Pseudocode

### Part 1

Variables: `Array`, `Reference`, `Compare`, `SumCaptcha`

1. Pop the first digit out of the `Array` into a `Compare` variable
   - If `Array` is empty, Return `SumCaptcha`
2. Compare `Compare` with `Reference`.
   - If `Reference` is null/undefined, copy `Compare` and add unshift the copy to the beginning of `Sequence`.
   - Else if `Reference` and `Compare` are equal, add 1 to `SumCaptcha`.
   - Else if `Reference` and `Compare` are not equal, just go to the next Step.
3. Move the digit in `Compare` into `Reference` and go to Step 1.

Actually... I could probably just do this as a regex. I'll check that out later
