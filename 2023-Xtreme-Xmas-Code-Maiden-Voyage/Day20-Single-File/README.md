# Day 20

## Xtreme Xmas Code Link

https://www.xtremexmascode.com/game/public/13/day/20/

### Challenge Modifier

"Your challenge is to write a program to complete today's puzzle in a single file"

### Points Earned

20

### Rerolls

Part 1: 0

Part 2: 0

#### Tokens Spent

Part 1: 0

Part 2: 0

### Tokens Earned

2

### Notes

- To get the solutions to both parts, run `deno run --allow-read solveParts1and2.ts`
  in this directory

### Retrospective

XXC.23 Day 20: Single File

_This post is an entry documenting my journey working through the Advent of Code 2023 challenges using my Xtreme Xmas Code mod_

Don't Over Think Stuff

Challenge Modifier: "Your challenge is to write a program to complete today's puzzle in a single file"

It's been a while. I got super busy and this point in solving the puzzles was around the point where I got tired of writing these posts (I had just written Day 13's post around finishing Day 19's puzzle IIRC). Hello from the future!

This puzzle is also the first one I solved after moving from VS Code to NeoVim and from Ubuntu to NixOS (at the same time), so it was a fun test of my new setup. I'm happy to report that it went well! If you want to know more, just be around me in any capacity over the next few months and I'm likely to talk your ear off about it ;-)

This challenge was a perfect one to try on my new setup because it was so simple, plus it gave me good practice navigating large files in Vim!

The puzzle itself was relatively straightforward. Part 1 was a simple implementation of the machine they described. Part 2 had me scratching my head for a minute until I remembered that a previous puzzle had a simple solution that relied on multiple periodic components that all happened to start their periods at the same time at the beginning of the program (and also didn't have any common divisors between the periods). I checked for a solution using similar assumptions with this puzzle and it worked!

Two things to learn from this:

1) These puzzles may be working with assumptions that aren't explicitly stated. After all, these are fun puzzles, not impossibly difficult problems. If you find yourself thinking "Well, that solution might work if {some assumption that isn't stated but could be possible}", it's worth checking to see if that assumption is might be true.}

2) This actually works in real life too! If you're working on a problem and you're stuck, try making an assumption that makes the problem easier, and then check to see if that assumption might be true. It may turn out that the problem you're working on is easier than you thought!

Thanks for joining me on this journey! If you'd like to see today's puzzle, it's over at Advent of Code. If you'd like to see my puzzle solutions, my source code is available on GitHub. And if you'd also like to give my mod a try, head over to Xtreme Xmas Code. Links to all three are in the comments!

🎄 Happy holidays everyone! 🎄

#### Links

This game at Xtreme Xmas Code: https://shorturl.at/mo056

My solution's code on GitHub:

Today's puzzle on Advent of Code:
