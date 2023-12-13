# Start Day 10

https://adventofcode.com/2023/day/10

## Pseudocode

### Part 1

Variables: `TileMap`: Tile[][], `Tile`: {coordinates: XYCoordinates, value: "S" | "|" | "-" | "7" | "F" | "J" | "L" | "."}, `Start`: Tile, `CurrentDirection`: "^" | "v" | "<" | ">", `CurrentTile`: Tile = `Start`, `LoopLength`: number = 0

---

Function: getStartingPipeShape = (`Start`) =>

1. If (`TileMap`[`Start`.y + 1][`Start`.x] === "|", "7", or "F") then filter out all possible values except ["|", "J", "L"]
2. If (`TileMap`[`Start`.y - 1][`Start`.x] === "|", "J", or "L") then filter out all possible values except ["|", "7", "F"]
3. If (`TileMap`[`Start`.y][`Start`.x + 1] === "-", "J", or "7") then filter out all possible values except ["-", "L", "F"]
4. If (`TileMap`[`Start`.y][`Start`.x - 1] === "-", "L", or "F") then filter out all possible values except ["-", "J", "7"]
5. Return the only remaining value

---

Function: getCurrentDirection = (`Tile`, `CurrentDirection`) =>

1. Switch `Tile`.value:
   - case "|": if (`CurrentDirection` === "^") then `CurrentDirection` = "^" else `CurrentDirection` = "v"
   - case "F" : if (`CurrentDirection` === "^") then `CurrentDirection` = ">" else `CurrentDirection` = "v"
   - case "-" : if (`CurrentDirection` === ">") then `CurrentDirection` = ">" else `CurrentDirection` = "<"
   - case "7" : if (`CurrentDirection` === "^") then `CurrentDirection` = "<" else `CurrentDirection` = "v"
   - case "J" : if (`CurrentDirection` === ">") then `CurrentDirection` = "^" else `CurrentDirection` = "<"
   - case "L" : if (`CurrentDirection` === "<") then `CurrentDirection` = "^" else `CurrentDirection` = ">"
2. Return `CurrentDirection`

---

Function: surveyLoop = (`Start`) =>

1. Switch `Start`.value:
   - case "|" | "F" : `CurrentDirection`: "^"
   - case "-" | "7" : `CurrentDirection`: ">"
   - case "J" : `CurrentDirection`: "v"
   - case "L" : `CurrentDirection`: "<"
2. While (`CurrentTile` !== `Start` || `LoopLength` === 0):
   - Switch `CurrentDirection`:
     - case "^": `CurrentTile` = `TileMap`[`CurrentTile`.y + 1][`CurrentTile`.x]
     - case ">": `CurrentTile` = `TileMap`[`CurrentTile`.y][`CurrentTile`.x + 1]
     - case "v": `CurrentTile` = `TileMap`[`CurrentTile`.y - 1][`CurrentTile`.x]
     - case "<": `CurrentTile` = `TileMap`[`CurrentTile`.y][`CurrentTile`.x - 1]
   - `CurrentDirection` = getCurrentDirection(`CurrentTile`, `CurrentDirection`)
   - `LoopLength` += 1
3. Return `LoopLength`

---

Function: getStepsToFurthestLoopPosition = (`LoopLength`) =>

1. Return `LoopLength` / 2;
