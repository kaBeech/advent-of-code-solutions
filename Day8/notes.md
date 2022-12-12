# Start Day 8

## Pseudocode

* Format the input:
    1. Create a rowCounter and a columnCounter, both equal to 0
    2. Take the first character of input. If is a new line following an integer, increment the rowCounter by 1, set the columnCounter to 0 and repeat Step 2. If it is an integer, use it to create a Tree obect. If it is a new line following a new line, return the value of columnCounter
    3. Give this Tree object a Height equal to the input integer's value
    4. Give this Tree object a Location, as a pair of coordinate integers in a couple built from the rowCounter and columnCounter, like so: [columnCounter, rowCounter]
    5. Add this Tree to an array of Trees
    6. Repeat Steps 2-5 for each character of the input

* Assess tree visibility:
    1. Create a visibleTreeCounter equal to 0
    2. Take the first Tree in Trees and look at its neighbor at relative coordinates [-1, 0]:
        * If it is not a Tree (i.e. one or both absolute coordinates are less than 0 or greater than or equal to the number of rows/columns), return true (visible)
        * If it is a Tree with Height greater than or equal to the referance Tree's Height, return false (not visible)
        * If it is a Tree with Height less than the referance Tree's Height, check its  visiblity. If it is visible, return true (visible), else return false (not visible)
    3. If Step 1 returns true (visible), increment the visibleTreeCounter. Else, repeat Steps 1-2 for each remaining cardinal (orthagonal) direction 
    4. Repeat Steps 1-2 for each remaining Tree
    5. Return the value of visibleTreeCounter