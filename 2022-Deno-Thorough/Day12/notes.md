# Start Day 12

https://adventofcode.com/2022/day/12

## Pseudocode

### Part 1

1. Parse the challengeInput into an array of Tile objects, which contain their coordinates and elevation as well as two empty arrays: cardinalDirectionsByPreference and adjacentTilesVisitedOnThisPath. Make note of the coordinates of the End (E) and Start (S) Tiles
2. Start from the E, work towards the S
3. Create an Explorer object
4. Give the Explorer an empty array of Tiles as currentPath, a record of the shortestPathLength, and an empty lastDirectionMoved value (in state)
5. Give this Explorer an explore() method

### explore() method (recursive)

1. Note the adjacent Tiles you can move to (i.e. that are not more than 1 elevation higher than the Tile you are on) that aren't in this Tile's adjacentTilesVisitedOnThisPath array as your availableTiles
2. If there are no Tiles in your availableTiles, backtrack by one tile. If there are no tiles to backtrack to, return your shortestPathLength
3. If you are adjacent to the E Tile and can move there, move there and record the currentPath.length as your shortestPathLength
4. If your currentPath.length is greater than your shortestPathLength minus 3 (and shortestPathLength is not undefined), backtrack by one tile
5. If the Tile you are on (i.e. the last tile in your currentPath array) does not have cardinalDirectionsByPreference set yet, calculate your distance from the E tile in each cardinal direction (for directions going away from the E tile, record this distance as a negative number). Sort these directions in descending order of distance and store this array as this Tile's cardinalDirectionsByPreference
6. Move to the Tile in your availableTiles with the lowest elevation. If more than one are tied, move to the one with the highest cardinal direction preference

### move(Tile) method

1. Add Tile to the Tile you are currently on's adjacentTilesVisitedOnThisPath array
2. Add Tile to your currentPath array
3. explore()

### backtrack() method

1. Set adjacentTilesVisitedOnThisPath for the Tile you are backtracking from back to an empty array
2. Pop the Tile you are backtracking from out of your currentPath array
3. explore()
