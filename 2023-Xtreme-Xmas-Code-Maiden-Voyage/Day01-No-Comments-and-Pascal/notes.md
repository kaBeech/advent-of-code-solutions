# Start Day 1

https://adventofcode.com/2023/day/1

## Pseudocode

### Part 1

Variables: `CalibrationDocument`: CalibrationLine[], `CalibrationLine`: string, `CharacterInCalibrationLine`: string, `CalibrationValueString`: string, `CalibrationValue`: number, `CalibrationSum`: number

1. For each `CalibrationLine` in `CalibrationDocument` :

   1. New `CalibrationValueString` = ""
   2. Check each `CharacterInCalibrationLine` from the start of the line until an integer is found
   3. Once this integer is found, add it to `CalibrationValueString`
   4. Check each `CharacterInCalibrationLine` from the end of the line until an integer is found
   5. Once this integer is found, add it to the end of `CalibrationValueString`
   6. Convert `CalibrationValueString` into `CalibrationValue`
   7. Add `CalibrationValue` to `CalibrationSum`

2. Return `CalibrationSum`
