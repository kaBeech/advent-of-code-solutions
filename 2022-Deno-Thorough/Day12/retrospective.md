# What went well during the sprint?

### Stay Curious!

In my first attempt at Part 1, my program was running without returning an answer (see 'What can I learn from difficult points?' below). I assumed that my code was unsound and that I had introduced an infinite loop somewhere

I asked my roommate to take a look and see if he could notice anything amiss with my code. He took one look and said "Why aren't you using Dijkstra's Algorithm?"

This was a great response if my goal was to solve the puzzle. However, understanding the challenge and learning something new is at least as important to me (in this project) than solving the puzzle, and this response left me unsatisfied

I agreed with my roommate that Dijkstra's is likely a more optimal solution, but said that I still wanted to know why my solution didn't work. He opined that there's probably something amiss with my backtrack() method, then had to leave for an appointment

Since I wanted a deeper understanding, I dug into my code to find out what the issue was

Turns out my code was perfectly sound - it would eventually come up with the correct answer. It would just take upwards of a decillion years on my machine to compute it! (again, see below)

After finding this out, I refactored my code based on my roommate's quick explanation of Dijkstra's algorithm and it worked!

I'm glad I stayed curious. I didn't blindly accept that another algorithm was better, but dug in to understand _why_ it's better. This grows my understanding and helps prepare me to solve other problems in the future

I'm also glad that I refactored my code using my own understanding of Dijkstra's, instead of looking up Dijkstra's Algorithm and parroting that. It encouraged me to think critically about the algorithm and understand each step and why it's there. Comparing my code to Dijkstra's Algorithm after the fact was also helpful to verify that I understood the algorithm and to see the differences in my implementation compared with common implementations

Also, shoutout to my roommate for helping me through this obstacle!

### Be Creative!

When looking at the challengeInput, it seemed evident that it would be easier to calculate the shortest distance from the End to the Start than from the Start to the End, so I went with that

This might not have made my solution to Part 1 much faster (in terms of runtime), but it made Part 2 very easy to solve (and if I were to guess, faster to run)

## Takeaways

- Stay curious!

- Write algorithms based on your own understanding rather than parroting pre-made algorithms (when feasible)

- Be creative!

- Have fun!

# What can I learn from difficult points?

### 2 ^ 160 is WAAAAAAAAAAAAAY bigger than 40 \* 160 \* 4

In my first attempt at Part 1, my Explorer would take one path until it got to the finish or a dead-end (or to a point where the current path was as long as the shortest path known), then backtrack and take the next path. After doing this for all paths, xe would report the length of the shortest path

This meant that without further optimization, the program would explore every possible path from the origin tile. If there were 160 tiles between the origin and the destination and each tile had 2 possible tiles to go to next (which is a less complicated input than the challengeInput), that would be 2 ^ 160 (or 1.461501637x10^48) possible paths! Even with the optimizations I had built in, the number of paths the Explorer was likely to visit would be absurdly large

Instead, my second attempt processes one step at a time and only takes steps that don't add to a path longer than the shortest path known. Instead of upwards of 2 ^ 160 iterations (a very conservative estimate of the number of possible paths), this program would have less than 25,600 iterations (the number of possible steps times the number of possible exits for each tile) on a 40 by 160 tile grid (note: 25,600 is an approximation of the theoretical maximum number of iterations here. In practice the number is much smaller - for this challengeInput my number of iterations of the survey() function is less than 5000)

Moral of this story: do as much as you can to reduce the number of iterations in your program. Rule out possible paths to an outcome as early as you can. If you have a choice between 2 ^ 99 possibilities to sort through and 99 ^ 2 possibilities, choose the latter <3

### Write loosely coupled code from the start

After finishing Part 2, I wanted my code to look nicer. That involved modularizing the Explorer constructor and writing tests for the resulting function modules

In doing so, I decided to destructure the state that was passed to these functions into discrete arguments

The process of refactoring to remove state from the function arguments and return results from the functions that were then used to set the explorer's state was important in decoupling my code, though it was tedious work

I can save myself some functional debt in the future by decoupling my code from the start

## Takeaways

- Do as much as you can to reduce the number of iterations in your program

- Rule out possible paths to an outcome as early as you can

- Remember that possible values for a string or array increase exponentially with the string/array's length

- Remember that your solution may be sound, but still take an unfeasibly long time to compute!

- If a function isn't a method, it doesn't need to be declared in a constructor module

- If a function isn't a method, it probably doesn't need to be passed state

# Ideas for possible future implementation

### Make an app that randomly assigns modifications to Advent Of Code challenges

This is tangential to this whole topic, but while working on this I realized it would be fun to add additional modifications to these Advent Of Code puzzles for an extra challenge. Modifications like "Complete this puzzle in a language you've never used before" and "Complete this puzzle without reassigning any variables"

I think I'll make an app to modify these puzzles and use it for 2023's Advent Of Code =)
