# Start Day 4

## Pseudocode

1. Wrap input string into an array of strings, each representing 
a pair of elfos

2. Wrap each pair of elfos into an array (couple) of 3-character 
strings

3. Take the first couple and compare the first digit in each string 

4. If these digits are equal, add 1 to a total of duplicate 
assignments and skip to step X. Otherwise make note of the string 
that contains lower number

5. Compare the third digit in each string of the couple

6. If the digit from the string noted in Step 4 is greater than or 
equal to the digit from the other string, add 1 to the total of 
duplicate assignments

7. Repeat Steps 3-6 for each couple

8. Return the total of duplicate assignments