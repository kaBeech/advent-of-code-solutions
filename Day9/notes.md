# Start Day 9

https://adventofcode.com/2022/day/9

## Pseudocode

### Part 1

- Make 2 objects (ropeHead and ropeTail), each having a currentPosition property (starting at [0,0])
    - ropeHead also gets a storedInstruction property (starting at null) and a visitedPositions property (starting at [[0,0]])

- ropeHead:
    - When passed a movementInstruction (direction and distance, like "U 2"), do the following:
        - while ( movementInstruction.distance > 0 ) {
            - Store the movementInstruction in storedInstruction as array
            - Change currentPosition by 1 based on the storedInstruction.direction (i.e. U -> [0,+1], D -> [0,-1], L -> [-1,0], R -> [+1,0])
            - Pass currentPosition to ropeTail
            - Decrement storedInstruction.distance by 1 (e.g. "U,2" -> "U,1")
            }

- ropeTail:
    - When passed a position (as headPosition), do the following:
        - { // Check if headPosition is far enough away to require a move
            if (getDiffernce(headPosition.x, currentPosition.x) < 2 && getDiffernce(headPosition.y, currentPosition.y) < 2 ) {
                return
            }
        }
        - { // Move towards tailPosition
            if (headPosition.x > currentPosition.x) {
                currentPosition.x++
            } else if (headPosition.x < currentPosition.x) {
                    currentPosition.x--
            };
            if (headPosition.y > currentPosition.y) {
                    currentPosition.y++
            } else if (headPosition.y < currentPosition.y) {
                    currentPosition.y--
            };
        }
        - { // Add currentPosition to visitedPositions if not already there
            if (visitedPositions.find(currentPosition) === undefined) {
                visitedPositions.push(currentPosition)
            }
        }

- countVisitedPositions(): 
    - Pass movementDirections from input to ropeHead
    - Count and return the number of positions in ropeTail.visitedPositions

# Notes

- testInput2 visitedPositions I think are:
00
1-1
1-2
2-3
2-4
3-4