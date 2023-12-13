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

This is my first time doing much visual programming since middle school, and I gotta say I liked it!
