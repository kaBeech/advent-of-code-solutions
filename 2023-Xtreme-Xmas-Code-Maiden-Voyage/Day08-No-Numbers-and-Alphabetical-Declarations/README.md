# Day 8

## Xtreme Xmas Code Link

https://www.xtremexmascode.com/game/public/13/day/8/

### Challenge Modifier

Part 1: "Your challenge is to write a program to complete today's puzzle using no numbers (you may convert any numbers in your challenge input)"

Ha! Since I rerolled this Modifier on Day 3 it's back for more!

Well, today's puzzle is not nearly as number-heavy as Day 3's, so let's do it!

...Well, that was easy for Part 1. Part 2 was a bit harder, but doable... until the numbers got so big that JavaScript ran out of memory

Let's go ahead and reroll!

Part 2 : "Your challenge is to write a program to complete today's puzzle making declarations in alphabetical order"

Sounds good!

### Points Earned

40

### Rerolls

Part 1: 0

Part 2: 1

#### Tokens Spent

Part 1: 0

Part 2: 2

### Tokens Earned

2

### Notes

- Output for Part 1 is converted to a number for convenience (so you don't have to count the elements in the array)

- If you have crazy high memory available, you may be able to make Part 2 work without numbers as well. Just use getLeastCommonMultipleWithoutNumbers() instead of getLeastCommonMultiple() and update numbers to strings

### Retrospective

XXC.23 Day 8: No Numbers and Alphabetical Declarations

_This post is an entry documenting my journey working through the Advent of Code 2023 challenges using my Xtreme Xmas Code mod_

You can't escape your destiny...

Challenge Modifier Part 1: "Your challenge is to write a program to complete today's puzzle using no numbers (you may convert any numbers in your challenge input)"

Challenge Modifier Part 2 : "Your challenge is to write a program to complete today's puzzle making declarations in alphabetical order"

I remember rolling the No Numbers modifier back on Day 3. At that time, I wasn't having that, so I rerolled. Now it's back for more!

Part 1 was very doable without using numbers. There weren't even any in the puzzle input to convert!

Part 2 is theoretically doable without using numbers. The problem is that the answer to the solution was waaaaaay too big. Like, in the tens of trillions range.

I was implementing my solution using an array that I pushed elements into as a counter. JavaScript wouldn't add any more elements to the array after 2^32 (around 4 billion) elements.

So I tried using a string as a counter instead. I really wanted to complete this challenge!

JavaScript ran out of memory during execution.

Looking back (I'm writing this several days later), I probably could have solved the puzzle using a string that used letters as substitutions for numbers (a=1, b=2, etc.). To do this without using any numbers in the substitution would be tedious, but it can be done.

Or I could have implemented logic to use a system like Roman numerals (or, more likely, Egyptian numerals). C'est la vie. These are things to remember in case this challenge modifier comes back to Final Destination me again.

I rerolled.

When I wrote the Alphabetical Declarations modifier, I left it up to the player to interpret how order the declarations.

If I were writing this program from scratch, I would have named my declarations in the order that I write them. Since I already had a program that theoretically worked, I just went in order that the declarations appear in their files (and the files roughly in order of when they are imported by the main function).

I also changed my program little for this new modifier. Numbers are rarely used - essentially only in places where they get too big to be handled as strings or arrays.

Until next time, No Numbers modifier! I expect to meet again...

Thanks for joining me on this journey! If you'd like to see today's puzzle, it's over at Advent of Code. If you'd like to see my puzzle solutions, my source code is available on GitHub. And if you'd also like to give my mod a try, head over to Xtreme Xmas Code. Links to all three and more are in the comments!

🎄 Happy holidays everyone! 🎄

#### Links

Egyptian Numerals: https://shorturl.at/adjqy

This game at Xtreme Xmas Code: https://shorturl.at/mo056

My solution's code on GitHub: https://shorturl.at/CEFS8

Today's puzzle on Advent of Code: https://shorturl.at/huKY1
