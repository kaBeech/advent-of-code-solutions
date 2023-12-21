# Day 7

## Xtreme Xmas Code Link

https://www.xtremexmascode.com/game/public/13/day/7/

### Challenge Modifier

"Your challenge is to write a program to complete today's puzzle using a random selection from the Visual Programming Box: Node-RED"

Ooh, cool!

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

If you have Docker, the easiest way to run Node-RED is by running `docker run -it -p 1880:1880 --name mynodered nodered/node-red`. Otherwise, follow your preferred [instructions here](https://nodered.org/docs/getting-started/local).

Once the Node-RED server is running, head to `http://127.0.0.1:1880/` (or wherever you hosted the server).

Once in the Node-RED application, right-click on an empty space on the grid, hover over `insert` in the menu that pops up, and click `Import` in the sub-menu that pops up. Then copy the code from `./flows.json` into the big empty space in the middle of the dialog box that pops up (or click `select a file to import` and find the file manually).

That will show the flow with the program in it (you may need to click on another tab that says `Flow 1`). Click the big red `Deploy` button in the top right of the window to initialize the program.

To run the test case, click the pale blue box to the left of the blue box that says `Test`. To run with the puzzle input, click the pale blue box to the left of the blue box that says `Solve`.

The results for both Part 1 and Part 2 will be shown in the Debug Messages window. The button to bring up this window is likely below the big red `Deploy` button, right between the book icon and the gear icon.

### Retrospective

XXC.23 Day 7: Node-RED

_This post is an entry documenting my journey working through the Advent of Code 2023 challenges using my Xtreme Xmas Code mod_

Visual programming for productivity and accessibility.

Challenge Modifier: "Your challenge is to write a program to complete today's puzzle using a random selection from the Visual Programming Box: Node-RED"

This is my first time doing much visual programming since middle school, and I gotta say I enjoyed it!

Node-RED is a visual programming tool that enables you to create, arrange, and connect elements in a visual plane, then open them up to write the code they contain as JavaScript.

I found this process intuitive and fun! One way to think of working with Node-Red is that it provides a simple visualization of your code created as you write it. It was cool to easily have a start button for each input and see what was happening to my data at each step of the program's execution.

Some people see visual programming as inferior to test-based programming, a sort of training wheels to get you ready for the real stuff. I myself have had that bias, but lately it's been challenged by a couple very smart engineers (shoutout to the Future Of Coding community/podcast) who champion it as a helpful tool for serious programming.

One easy example of a case where visual programming can be helpful in a professional setting is in cross-departmental communication. Let's say we're working at a company that builds cars and we're writing a program for an assistive braking technology. The specifications for the program was given to us by a team of mechanical engineers and we are implementing it in our preferred language.

When we have meetings with the mechanical engineering team, we want to show them what our program is doing. These mechanical engineers are very smart and they understand what the program is supposed to do (they wrote the specs after all), but they might not be programmers themselves and in any case are not fluent in whatever language we decided to build the program in.

If we show the mechanical engineers our code as text, we might receive befuddled affirmations of what they assume we are doing correctly, though they might not have a complete understanding of our code. However, if we can show them a visual representation of our program, press the start button, and have them watch the program in action, they will more likely have a clearer understanding of what exactly our program is doing at each step in its execution. Heck, they might even see a potential issue in our code and (gasp!) provide helpful feedback!

In addition to cross-departmental communication, visual tools can help a programmer form a mental image of what's going on in the program. People have a great diversity in how we represent images in our mind (see links in comments). Some people don't conjure any mental images at all (a condition known as aphantasia)!

As programmers, we all have different skills. People with aphantasia can be brilliant programmers too, just look at Jimmy Miller! Visual tools can help people like Jimmy get a better picture of what their programs are doing and speed up their development processes.

Thanks for joining me on this journey! If you'd like to see today's puzzle, it's over at Advent of Code. If you'd like to see my puzzle solutions, my source code is available on GitHub. And if you'd also like to give my mod a try, head over to Xtreme Xmas Code. Links to all this and more are in the comments!

🎄 Happy holidays everyone! 🎄

#### Links

Future Of Coding: https://shorturl.at/nHKN4

A fascinating study on the diversity of aphantasia: https://shorturl.at/wLOV3

The Vividness of Visual Imagery Questionnaire (VVIQ): https://shorturl.at/ezDJ7

Jimmy Miller on Twitter: https://shorturl.at/ikzF8

This game at Xtreme Xmas Code: https://shorturl.at/mo056

My solution's code on GitHub: https://shorturl.at/djtAS

Today's puzzle on Advent of Code: https://shorturl.at/hoBHI
