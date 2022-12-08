# Start Day 

## Pseudocode

1. Parse the stacks of crates as arrays (with the bottom crate at 
index[0] and the top crate at indes [-1])

2. Looking at the first line of instructions, pop out the top crate 
from the specified source array

3. Push the crate from Step 2 onto the specified destination array 

4. Repeat Steps 2-3 for as many crates are specified in the first 
line of the instructions

5. Repeat Steps 2-4 for each line of the instructions

6. Add the letter contatined in the crate at the top of the first 
array to a garland of letters

7. Repeat step 6 for each remaining crate

8. Return the garland (it's a string - I'm being fancy) of letters!

