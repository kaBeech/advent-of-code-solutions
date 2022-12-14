# Start Day 3

https://adventofcode.com/2022/day/3

## Pseudocode

1. Wrap input string into an array of strings

2. Split the string representing the first rucksack in half

3. Search the second pocket of this first rucksack for items matching the first
   item in the first pocket

4. If found, add this item to an array of duplicate items. If not, repeat step 4
   until a matching item is found

5. Repeat steps 3 and 4 for each remaining rucksack

6. Find the Priority of the first item in the duplicate item array

7. Add the item's Priority to a Priorities sum

8. Repeat step 7 for each remaining item in the array

9. Return the Priorities total
