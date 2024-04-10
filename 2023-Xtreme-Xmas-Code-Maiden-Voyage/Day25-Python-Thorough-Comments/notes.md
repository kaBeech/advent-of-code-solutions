# Start Day 25

<https://adventofcode.com/2023/day/25>

## Opening notes

So I don't have time to implement this right now*, but I rolled my Challenge 
Modifier** on this because I was curious about it. I read the puzzle and 
started thinking about it, and I think I might have a solution, so I'm gonna 
jot down the pseudocode real quick.

*Also, I still haven't finished Day 24 Part 2, though I think I'm on to an 
idea. Still working out the math

**Non-Latin writing system. I might reroll it though. Even though my Arabic is 
much better than my Indonesian, I'm still reeling from Day 22 and for something 
this complicated where I'm not totally sure about the solution, I'm wary of 
introducing another language barrier

## Pseudocode

1. Okay, so start by mapping each component in the input to a `Node` object. 
Each Node object has an `ID`, a list of other `Nodes` it's connected to (make 
sure to add these bidirectionally since they're unidirectional in the input), 
and a `Traffic` counter (an integer set to 0 upon creation).

2. Randomly select a Start Node and a Destination Node

3. Move from the Start Node through connected Nodes until you get to the 
Destination Node. Randomly choose paths when there is more than one 
connected Node that you could move to, but don't backtrack or step into the 
same Node twice. For every Node you move through (not including the Start and 
Destination Nodes), increase that Node's Traffic counter by 1

4. Repeat Steps 2 and 3 for a set number of repetitions (maybe 1,000 - 10,000)

5. Print the 10(ish) Node Connections with the highest Traffic counts, along 
with their Traffic Counts

6. Repeat Steps 2-5 until a consensus begins to emerge

7. Remove the 3 Node Connections with the highest Traffic Traffic counts

8. Count the number of Nodes on each side (if Nodes were not split into 2 
distinct groups, start over), multiply these numbers together, and return 
the result

## Closing notes

There it is! It's non-deterministic, but it seems like it should work and 
sounds fun!

As I mentioned in the README for Day 24, I'll be busy for a while, so it may 
be a while before I implement this, but it's here for now!
