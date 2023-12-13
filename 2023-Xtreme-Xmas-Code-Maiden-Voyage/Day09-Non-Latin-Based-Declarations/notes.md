# Start Day 9

https://adventofcode.com/2023/day/9

## Pseudocode

### Part 1

Variables: `Report`: History[], `History`: number[], `HistorySequences`: Sequence[], `Sequence`: number[], `ExtrapolatedSum`: number = 0

---

Function: buildOutSequences = (`History`) =>

1. `HistorySequences` = [`History`]
2. While not all elements of `HistorySequences`[-1] equal 0
   - Create a new empty `Sequence`
   - For each consecutive pair of elements in `HistorySequences`[-1], `Sequence`.push(`HistorySequences`[-1][j] - `HistorySequences`[-1][i])
   - `HistorySequences`.push(`Sequence`)
3. Return `HistorySequences`

---

Function: extrapolateSequences = (`HistorySequences`) =>

1. Starting with `HistorySequences`[-2] and moving toward `HistorySequences`[0], for each `Sequence`:
   - `Sequence`.push(`Sequence`[-1] + `HistorySequences`[`Sequence`.index + 1][-1])

---

Function: getExtrapolatedSum = (`HistorySequences`) =>

1. For each `Sequence`:
   - `ExtrapolatedSum` += `Sequence`[-1]
