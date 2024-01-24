package main

import (
	"bufio"
	"fmt"
	"os"
)

type XYCoordinates struct {
	x int
	y int
}

type LagoonTile struct {
	insideLagoon bool
	xWall bool
	yWall bool
	topCorner bool
	bottomCorner bool
}

func check(e error) {
    if e != nil {
        panic(e)
    }
}

func main() {
    fmt.Println("Part 1: The lagoon can hold", solvePart1(), "cubic meters of lava.")
}

func solvePart1() int {
	var path []XYCoordinates = []XYCoordinates{
		XYCoordinates{0, 0},
	}

	// Read the directions from the input file
	testInput, err := os.Open("challengeInput.dat")
    check(err)
    scanner := bufio.NewScanner(testInput)
	const maxCapacity int = 24  // the highest number
	buf := make([]byte, maxCapacity)
	scanner.Buffer(buf, maxCapacity)

	// Trace the path given by the directions for the lagoon walls
	var currentCoordinates XYCoordinates = path[len(path)-1]
	for scanner.Scan() {
		directionLine := scanner.Text()
		switch directionLine[0] {
			case 'R':
				currentCoordinates.x += int(directionLine[2] - '0')
			case 'L':
				currentCoordinates.x -= int(directionLine[2] - '0')
			case 'U':
				currentCoordinates.y += int(directionLine[2] - '0')
			case 'D':
				currentCoordinates.y -= int(directionLine[2] - '0')
		}
		path = append(path, currentCoordinates)
	}	

	// Find the minimum and maximum x and y values of the lagoon walls
	var minX, maxX, minY, maxY int = 0, 0, 0, 0
	for _, coordinates := range path {
		if coordinates.x < minX {
			minX = coordinates.x
		}
		if coordinates.x > maxX {
			maxX = coordinates.x
		}
		if coordinates.y < minY {
			minY = coordinates.y
		}
		if coordinates.y > maxY {
			maxY = coordinates.y
		}
	}

	// Subtract the minimums to all coordinates to make them all positive
	for i := range path {
		path[i].x -= minX
		path[i].y -= minY
	}
	maxX -= minX
	maxY -= minY
	minX = 0
	minY = 0

	// Create a two-dimensional array of booleans to represent the lagoon
	var lagoon [][]LagoonTile = make([][]LagoonTile, maxY+1)
	for i := range lagoon {
		lagoon[i] = make([]LagoonTile, maxX+1)
	}

	// Trace the perimeter of the lagoon
	for directionIndex := 0; directionIndex < len(path)-1; directionIndex++ {
		var x1, x2, y1, y2 int = path[directionIndex].x, path[directionIndex+1].x, path[directionIndex].y, path[directionIndex+1].y
		if x1 == x2 {
			if y1 < y2 {
				for yValue := y1; yValue <= y2; yValue++ {
					lagoon[yValue][x1].insideLagoon = true
					lagoon[yValue][x1].yWall = true
					if yValue == y1 {
						lagoon[yValue][x1].bottomCorner = true
					}
					if yValue == y2 {
						lagoon[yValue][x1].topCorner = true
					}
				}
			} else {
				for yValue := y2; yValue <= y1; yValue++ {
					lagoon[yValue][x1].insideLagoon = true
					lagoon[yValue][x1].yWall = true
					if yValue == y1 {
						lagoon[yValue][x1].topCorner = true
					}
					if yValue == y2 {
						lagoon[yValue][x1].bottomCorner = true
					}
				}
			}
		} else {
			if x1 < x2 {
				for xValue := x1; xValue <= x2; xValue++ {
					lagoon[y1][xValue].insideLagoon = true
					lagoon[y1][xValue].xWall = true
				}
			} else {
				for xValue := x2; xValue <= x1; xValue++ {
					lagoon[y1][xValue].insideLagoon = true
					lagoon[y1][xValue].xWall = true
				}
			}
		}
	}
	
	// Count the number of interior lagoon tiles
	var numberOfLagoonTiles int = 0
	for yValue := 0; yValue < len(lagoon); yValue++ {
		var interiorBoolean bool = false
		var wallEnteredNorth bool = false
		var wallEnteredSouth bool = false
		for xValue := 0; xValue < len(lagoon[yValue]); xValue++ {
			var currentLagoonTile LagoonTile = lagoon[yValue][xValue]
			if currentLagoonTile.insideLagoon {
				numberOfLagoonTiles++
				if !currentLagoonTile.xWall {
					interiorBoolean = !interiorBoolean
				} else if yValue > 0 && yValue < len(lagoon) - 1 {
					// if lagoon[yValue + 1][xValue].yWall && lagoon[yValue - 1][xValue].yWall {
					// 	fmt.Println("Test")
					// }
					if currentLagoonTile.bottomCorner {
						wallEnteredNorth = !wallEnteredNorth
					}
					if currentLagoonTile.topCorner {
						wallEnteredSouth = !wallEnteredSouth
					}
					if wallEnteredNorth && wallEnteredSouth {
						interiorBoolean = !interiorBoolean
						wallEnteredNorth = false
						wallEnteredSouth = false
					}
				}
			} else if interiorBoolean {
				currentLagoonTile.insideLagoon = interiorBoolean
				numberOfLagoonTiles++
			}
		}
	}

	// Print the lagoon
	// for yValue := 0; yValue < len(lagoon) / 2; yValue++ {
	// 	lagoon[yValue], lagoon[len(lagoon) - 1 - yValue] = lagoon[len(lagoon) - 1 - yValue], lagoon[yValue]
	// }
	// for _, row := range lagoon {
	// 	for _, tile := range row {
	// 		if tile.insideLagoon {
	// 			fmt.Print("#")
	// 		} else {
	// 			fmt.Print(".")
	// 		}
	// 	}
	// 	fmt.Println()
	// }
	
	return numberOfLagoonTiles
}
