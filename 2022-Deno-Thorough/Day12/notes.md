# Start Day 12

https://adventofcode.com/2022/day/12

## Pseudocode

### Part 1 (Deprecated - see Part 1, Take 2)

1. Parse the challengeInput into an array of Tile objects, which contain their coordinates and elevation as well as an empty array named accessibleAdjacentTilesByPreference. Make note of the coordinates of the End (E) and Start (S) Tiles
2. Start from the E, work towards the S
3. Create an Explorer object
4. Give the Explorer an empty array of Tiles as currentPath, a record of the shortestPathLength, an empty array of Tiles as availableMoves, a backtrackedFrom value set to null, and a distanceFromS value set to null (in state)
5. Give this Explorer an explore() method

#### explore() method (recursive)

1. If the Tile you are on (i.e. the last tile in your currentPath array) does not have accessibleAdjacentTilesByPreference set yet, create an array of all adjacent tiles whose elevation is not more than 1 lower than the Tile you are on. Sort these by preference (preferring lower elevation Tiles). If two such Tiles share the same elevation, prefer the Tile that has the lower distanceFromS value (if a Tile doesn't have a distanceFromS value, calculate and store it). Set this Array as the Tile's accessibleAdjacentTilesByPreference value
2. Set your availableMoves as all Tiles in the accessibleAdjacentTilesByPreference array that are not also in your currentPath array. If your backtrackedFrom value is set to a Tile, remove that Tile and every Tile with a higher preference from your availableMoves array
3. If there are no Tiles in your availableMoves array, backtrack by one tile. If there are no tiles to backtrack to, return your shortestPathLength
4. If you are adjacent to the S Tile and can move there, move there and record the currentPath.length as your shortestPathLength, then backtrack three times
5. If your currentPath.length is greater than your shortestPathLength minus 3 (and shortestPathLength is not undefined), backtrack by one tile
6. Move to the most preferred Tile in your availableMoves array

#### move(Tile) method

1. Set your backtrackedFrom value to null
2. Add Tile to your currentPath array
3. explore()

#### backtrack() method

1. Set your backtrackedFrom value to the Tile you are backtracking from
2. Pop the Tile you are backtracking from out of your currentPath array
3. explore()

### Part 1, Take 2

1. Parse the challengeInput into a tileMap object, which contains a double array of all the Tiles as well as values for the startTile and the endTile (in state)
2. Each Tile object contains the tile's coordinates and elevation, as well as a fewestSteps value set to undefined (in state)
3. Start from the endTile, work towards the startTile
4. Create an Explorer object with the tileMap, a currentTile value set to the endTile, a destinationTile value set to the startTile, a destinationTileVisited value set to false, and a queuedTiles value set to an array containing only the endTile (in state)
5. Give this Explorer a survey() method and a findShortestPathToDestination() method

#### survey() method

1. Set state.currentTile to state.queuedTiles[0] (and shift that tile off state.queuedTiles)
2. For each tile adjacent to state.currentTile, calculate whether it's accessible (i.e. its elevation is not more than one unit lower than the currentTile's elevation). If it's not accessible, return
3. If this tileBeingSurveyed is accessible and it is the destinationTile, set state.destinationTileVisited to true
4. Compare tileBeingSurveyed.fewestSteps with state.currentTile's fewestSteps. If tileBeingSurveyed.fewestSteps is less than or equal to state.currentTile.fewestSteps + 1, return
5. If tileBeingSurveyed.fewestSteps is undefined or is greater than state.currentTile.fewestSteps +1, set tileBeingSurveyed.fewestSteps to state.currentTile.fewestSteps + 1
6. If no previous step has returned, push tileBeingSurveyed onto state.queuedTiles

#### findShortestPathToDestination() method

1. While state.destinationTileVisited is false:
2. survey()
3. Once state.destinationTileVisited is true, return state.destinationTile.fewestSteps
