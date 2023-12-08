# Day 4

## Xtreme Xmas Code Link

https://www.xtremexmascode.com/game/public/13/day/4/

### Challenge Modifier

"Your challenge is to write a program to complete today's puzzle using ChatGPT (the free, GPT-3.5 version) exclusively (no editing Chat's responses - you must edit your prompts!)"

Haha, nice

### Evidence

[Part 1's Chat Log](https://chat.openai.com/share/cce907a5-3ac0-4167-8406-59f0f4d4f4c9)

[Part 2's Chat Log](https://chat.openai.com/share/dcebcac1-7aa1-4a7a-9de9-e63aebd8c9bf)

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

To run these apps, enter `python3 ./solvePart[1-2].py ` from within this directory

### Retrospective

XXC.23 Day 4: ChatGPT

_This post is an entry documenting my journey working through the Advent of Code 2023 challenges using my Xtreme Xmas Code mod_

Through a text prompt, darkly.

Challenge Modifier: "Your challenge is to write a program to complete today's puzzle using ChatGPT (the free, GPT-3.5 version) exclusively (no editing Chat's responses - you must edit your prompts!)"

This was fun!

This was another challenge modifier that I hoped I'd roll. I wanted to make sure it was fun, instructive in some way, not completely trivial, but also not intensely frustrating. I found it a fun exercise in finding ways to communicate clearly with ChatGPT to get xyr to do exactly what I wanted xyr to do.

I didn't explicitly state this in the rules, but my intention with this challenge is not to have players copy/paste the puzzle from Advent of Code, but instead to instruct Chat through the problem, as an exercise in pseudocoding, communication, and editing.

I decided to let Chat use whatever language xe wanted, since I figured xe'd know what languages xe's best at. Chat chose Python, and I feel xe did a good job in coding in Python, especially during Part 1. Part 2 got a little finnickier, but we got to a good solution without too much difficulty.

I will say that our solution for Part 2 takes about 45 seconds to run on my computer (using 8-9 year old hardware), which is a bit on the long side, so there's probably a lot of optimization that can be made, but overall I'm happy with the experience completing this challenge!

Things I learned about writing code with ChatGPT:

- Just like when working with humans, giving context as to why you are requesting a change increases the likelihood that Chat will actually make that change.

- Sometimes an iterative approach is easier than trying to explain to Chat what you want all at once.

- Referencing a previous iteration of the code Chat gives is not always trivial. I ended up just copy/pasting the code I wanted to return to back into the prompt, and that worked just fine. However, in the future it may be helpful to ask Chat to give each iteration a reference ID (e.g. MyProgram_0.0.1) to be able to refer back to it.
