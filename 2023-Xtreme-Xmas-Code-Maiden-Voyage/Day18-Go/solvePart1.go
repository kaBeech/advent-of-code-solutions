package main

import (
	"bufio"
	"fmt"
	"regexp"
	"strconv"
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

func extractFirstNumberFromString(input string) (int) {
	regex := regexp.MustCompile(`(\d+)`)

	match := regex.FindStringSubmatch(input)

	if len(match) < 2 {
		return 0
	}

	// Convert the string to an integer
	matchedNumber, err := strconv.Atoi(match[1])
	if err != nil {
		return 0
	}

	return matchedNumber
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
		var sideLength int = extractFirstNumberFromString(directionLine)
		switch directionLine[0] {
			case 'R':
				currentCoordinates.x += sideLength
			case 'L':
				currentCoordinates.x -= sideLength
			case 'U':
				currentCoordinates.y += sideLength
			case 'D':
				currentCoordinates.y -= sideLength
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

	// Use the shoelace formula to find the number of interior lagoon tiles
	var sum1 int = 0
	var sum2 int = 0
	for i := range path {
		if i < len(path) - 1 {
			sum1 += path[i].x * path[i+1].y
			sum2 += path[i].y * path[i+1].x
		}
	}
	var numberOfInteriorLagoonTiles int = (sum1 - sum2) / 2
	if numberOfInteriorLagoonTiles < 0 {
		numberOfInteriorLagoonTiles = -numberOfInteriorLagoonTiles
	}

	// // Create a two-dimensional array of booleans to represent the lagoon
	// var lagoon [][]LagoonTile = make([][]LagoonTile, maxY+1)
	// for i := range lagoon {
	// 	lagoon[i] = make([]LagoonTile, maxX+1)
	// }

	// // Trace the perimeter of the lagoon
	// for directionIndex := 0; directionIndex < len(path)-1; directionIndex++ {
	// 	var x1, x2, y1, y2 int = path[directionIndex].x, path[directionIndex+1].x, path[directionIndex].y, path[directionIndex+1].y
	// 	if x1 == x2 {
	// 		if y1 < y2 {
	// 			for yValue := y1; yValue <= y2; yValue++ {
	// 				lagoon[yValue][x1].insideLagoon = true
	// 				lagoon[yValue][x1].yWall = true
	// 				if yValue == y1 {
	// 					lagoon[yValue][x1].bottomCorner = true
	// 				} else if yValue == y2 {
	// 					lagoon[yValue][x1].topCorner = true
	// 				} else if lagoon[yValue][x1].xWall {
	// 					fmt.Println(lagoon[yValue][x1], x1, yValue)
	// 				}
	// 			}
	// 		} else {
	// 			for yValue := y2; yValue <= y1; yValue++ {
	// 				lagoon[yValue][x1].insideLagoon = true
	// 				lagoon[yValue][x1].yWall = true
	// 				if yValue == y1 {
	// 					lagoon[yValue][x1].topCorner = true
	// 				} else if yValue == y2 {
	// 					lagoon[yValue][x1].bottomCorner = true
	// 				} else if lagoon[yValue][x1].xWall {
	// 					fmt.Println(lagoon[yValue][x1], x1, yValue)
	// 				}
	// 			}
	// 		}
	// 	} else {
	// 		if x1 < x2 {
	// 			for xValue := x1; xValue <= x2; xValue++ {
	// 				lagoon[y1][xValue].insideLagoon = true
	// 				lagoon[y1][xValue].xWall = true
	// 			}
	// 		} else {
	// 			for xValue := x2; xValue <= x1; xValue++ {
	// 				lagoon[y1][xValue].insideLagoon = true
	// 				lagoon[y1][xValue].xWall = true
	// 			}
	// 		}
	// 	}
	// }

	var numberOfLagoonTiles int = numberOfInteriorLagoonTiles + perimeterLength / 2 + 1
	
	// // Count the number of interior lagoon tiles
	// var numberOfLagoonTiles int = 0
	// for yValue := 0; yValue < len(lagoon); yValue++ {
	// 	var interiorBoolean bool = false
	// 	var wallEnteredNorth bool = false
	// 	var wallEnteredSouth bool = false
	// 	for xValue := 0; xValue < len(lagoon[yValue]); xValue++ {
	// 		var currentLagoonTile LagoonTile = lagoon[yValue][xValue]
	// 		if currentLagoonTile.insideLagoon {
	// 			numberOfLagoonTiles++
	// 			if currentLagoonTile.yWall {
	// 				if !currentLagoonTile.xWall {
	// 					interiorBoolean = !interiorBoolean
	// 				} else if yValue > 0 && yValue < len(lagoon) - 1 {
	// 					// if lagoon[yValue + 1][xValue].yWall && lagoon[yValue - 1][xValue].yWall {
	// 					// 	fmt.Println("Test")
	// 					// }
	// 					if currentLagoonTile.bottomCorner {
	// 						wallEnteredNorth = !wallEnteredNorth
	// 					} else if currentLagoonTile.topCorner {
	// 						wallEnteredSouth = !wallEnteredSouth
	// 					} else {
	// 						fmt.Println(currentLagoonTile, xValue, yValue)
	// 					}
	// 					if wallEnteredNorth && wallEnteredSouth {
	// 						interiorBoolean = !interiorBoolean
	// 						wallEnteredNorth = false
	// 						wallEnteredSouth = false
	// 					}
	// 				}
	// 			}
	// 		} else if interiorBoolean {
	// 			currentLagoonTile.insideLagoon = interiorBoolean
	// 			numberOfLagoonTiles++
	// 		}
	// 	}
	// }

	// // Print the lagoon
	// // for yValue := 0; yValue < len(lagoon) / 2; yValue++ {
	// // 	lagoon[yValue], lagoon[len(lagoon) - 1 - yValue] = lagoon[len(lagoon) - 1 - yValue], lagoon[yValue]
	// // }
	// // for _, row := range lagoon {
	// // 	for _, tile := range row {
	// // 		if tile.insideLagoon {
	// // 			fmt.Print("#")
	// // 		} else {
	// // 			fmt.Print(".")
	// // 		}
	// // 	}
	// // 	fmt.Println()
	// // }
	
	return numberOfLagoonTiles
}
