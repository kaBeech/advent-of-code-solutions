# Day 21

## Xtreme Xmas Code Link

https://www.xtremexmascode.com/game/public/13/day/21/

### Challenge Modifier

"Your challenge is to write a program to complete today's puzzle in a programming language not yet used in this codebase"

Let's do OCaml!

Huh. For Part 1, the domain for the solution would be 4 (four quadrants) * 64 (height of a quadrant) * 64 (width of a quadrant) / 2 (each quadrant is a triangular area) / 2 (since the Elf needs to take an even number of steps, if this were a chessboard, he could only land on black tiles) tiles that the Elf could theoretically reach. Looking at the map he miiiiight be able to reach every black tile that doesn't have a rock on it? Let's try that first.

Hey, it worked!

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

- Note to self: you may need to run `eval $(opam env)` before taking the next steps

- To build the program, run `ocamlc -o solve_part_[1-2] solve_part_1.ml` from this directory

- To run the program, run `./solve_part_[1-2]` from this directory after building the program

### Retrospective

XXC.23 Day 21: New Codebase Language - OCaml

_This post is an entry documenting my journey working through the Advent of Code 2023 challenges using my Xtreme Xmas Code mod_

Witty Heading

Challenge Modifier: "Your challenge is to write a program to complete today's puzzle in a programming language not yet used in this codebase"

Wow, this was a great challenge to get for this puzzle! And a great puzzle to follow the last one.

Yesterday's puzzle reminded me to look for easy solutions, and I'm glad I went into this one with that mindset! When reading the challenge it seemed like a pathfinding challenge, so I was getting ready to fire up the old Dijkstra-mobile until I saw the puzzle input. I took one look and realized that this was a geometry puzzle in disguise!

Part 1 was simple enough to use a simple math equation, so it was a perfect opportunity to try out a new language. I'm still a huge fan of Haskell, but OCaml was a fun middle ground to have a friendly environment for functional programming while still providing easy access to some imperitive niceties.

The approach I took to learning a new language this time (for Part 1) was to solve the puzzle first in a language I know (TypeScript) and then re-write it in the new language (OCaml). This helped me be sure I had a solid idea and gave me the confidence to troubleshoot the weirdness of learning a new language. I would recommend this approach.

The hardest part of this challenge was figuring out how to do basic things in OCaml, and the hardest part of that process was getting OCaml, NixOS, and NeoVim to all play nicely together. As of writitng this note I've been using NixOS and NeoVim for about 2-3 weeks and I haven't gotten the OCaml LSP to work with NeoVim, or Core (the basic standard library replacement for OCaml) to work at all with NixOS yet.

This means I had to go without much of the usual syntactical sugar and and dig in to find more info. I am appreciative of this though, because it gave me an excuse to learn OCaml just a little more deeply in this short time.

So... all this new stuff... is it really worth it? Why work harder at something you can already do?

Well, the benefit might not be apparent right away, but exposing ourselves to new ways of doing things is incredibly helpful! Of the three new things mentioned in this post (NeoVim, NixOS, and OCaml), I can confidentally say that at least one of them has already improved my working experience: NeoVim.

I know it can be hard to see the appeal of a keyboard-focused tool with a steep learning curve when you have such great GUI-focused development tools available. But when you allow yourself to break out of your comfort zone and genuinely open yourself up to trying new ways of doing things, you can end up finding a new love! And, good gracious, if no one's just gone on and on about Vim yet to you, let me tell you: it's pretty great.

Thanks for joining me on this journey! If you'd like to see today's puzzle, it's over at Advent of Code. If you'd like to see my puzzle solutions, my source code is available on GitHub. And if you'd also like to give my mod a try, head over to Xtreme Xmas Code. Links to all three are in the comments!

🎄 Happy Coding Everyone! 🎄

#### Links

This game at Xtreme Xmas Code: https://shorturl.at/mo056

My solution's code on GitHub:

Today's puzzle on Advent of Code:
