# Day 2

## Xtreme Xmas Code Link

https://www.xtremexmascode.com/game/public/13/day/2/

### Challenge Modifier

"Your challenge is to write a program to complete today's puzzle using a random selection from the C-Like Languages Box: Carbon"

Aww yeah!!! I've been hoping to roll this one! I know very little about Carbon, but it's new and making waves and I'm excited to give it a go!

### Points Earned

X

### Rerolls

Part 1: X

Part 2: X

#### Tokens Spent

Part 1: x

Part 2: x

### Tokens Earned

2

### Notes

This solution involved a lot of hacking around Carbon's current limitations (see Retrospective for details). In terms of running the application:

- There is no working compiler or toolchain for Carbon currently. The easiest way to run these applications is be copy/pasting the code into Carbon's demo interpreter at [compiler-explorer.com](https://carbon.compiler-explorer.com/). Alternatively you can set up a Carbon development environment using [these instructions](https://github.com/carbon-language/carbon-lang/blob/trunk/docs/project/contribution_tools.md) and run Carbon from within your setup directory using `bazel run //explorer -- PATH/TO/FILE.carbon`. I jumped back and forth between both while solving this puzzle.

- The interpreter has a built-in limit to the number of interpreter steps it will execute before halting the program. This limit is reasonable for the use cases it was designed for (testing and debugging the Carbon language), but is far too low to solve coding puzzles like this one. Therefore the solution applications had to be chunked out to in order to make them small enough to run. I know some folks reading this might think this is unnecessary, that I just didn't optimize my code enough to be run in a reasonable amount of time. If you have this opinion, I invite you to try it for yourself =) To get the chunked out solutions, run `solvePart[1-2]_[0-9].carbon`. To get the summed solutions, add these solutions to the source for `solvePart[1-2].carbon` and then run `solvePart[1-2].carbon`.

### Retrospective

From ancient Pascal to futuristic Carbon!

I actually want to brag on myself for a minute here because this was a lot more involved than I first realized.

As the Carbon leads are quick to remind us, Carbon is [not ready for use](https://github.com/carbon-language/carbon-lang#project-status). The language design hasn't even gotten to a 0.1 release yet! This means that I completed this challenge:

- Without a compiler

- Without any end-user documentation

- With incomplete and out-of-date [language design documentation](https://github.com/carbon-language/carbon-lang/tree/trunk/docs/design)

- Without any String functions/methods beyond Print() (including no character indexing, splitting, slicing, or even numeric string to number conversion)

- Without any Tuple functions/methods beyond conversion to fixed-length arrays (not even dynamic indexing)

- Without any Array functions/methods beyond dynamic indexing

- In general, without any dynamically-sized Types

- With a demo interpreter that has a strict limit to the number of interpreter steps it will execute before halting the program. This limit is reasonable for the use cases it was designed for (testing and debugging the Carbon language), but is far too low to solve coding puzzles like this one.
