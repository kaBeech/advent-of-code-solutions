package main

import "fmt"

func main() {
    fmt.Println("Part 1: The lagoon can hold", solvePart1(), "cubic meters of lava.")
}

type XYCoordinates struct {
	x int
	y int
}

func solvePart1() int {
	var path []XYCoordinates = []XYCoordinates{
		XYCoordinates{0, 0},
	}

	var directions []string = []string{
		"R 6 (#70c710)",
		"D 5 (#0dc571)",
		"L 2 (#5713f0)",
		"D 2 (#d2c081)",
		"R 2 (#59c680)",
		"D 2 (#411b91)",
		"L 5 (#8ceee2)",
		"U 2 (#caa173)",
		"L 1 (#1b58a2)",
		"U 2 (#caa171)",
		"R 2 (#7807d2)",
		"U 3 (#a77fa3)",
		"L 2 (#015232)",
		"U 2 (#7a21e3)",
	}

	// Trace the path given by the directions for the lagoon walls
	for _, direction := range directions {
		var newCoordinates XYCoordinates = path[len(path)-1]
		switch direction[0] {
			case 'R':
				newCoordinates.x += int(direction[2] - '0')
			case 'L':
				newCoordinates.x -= int(direction[2] - '0')
			case 'U':
				newCoordinates.y += int(direction[2] - '0')
			case 'D':
				newCoordinates.y -= int(direction[2] - '0')
		}
		path = append(path, newCoordinates)
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
	var lagoon [][]bool = make([][]bool, maxY+1)
	for i := range lagoon {
		lagoon[i] = make([]bool, maxX+1)
	}

	// Trace the perimeter of the lagoon
	for directionIndex := 0; directionIndex < len(path)-1; directionIndex++ {
		var x1, x2, y1, y2 int = path[directionIndex].x, path[directionIndex+1].x, path[directionIndex].y, path[directionIndex+1].y
		if x1 == x2 {
			if y1 < y2 {
				for yValue := y1; yValue <= y2; yValue++ {
					lagoon[yValue][x1] = true
				}
			} else {
				for yValue := y2; yValue <= y1; yValue++ {
					lagoon[yValue][x1] = true
				}
			}
		} else {
			if x1 < x2 {
				for xValue := x1; xValue <= x2; xValue++ {
					lagoon[y1][xValue] = true
				}
			} else {
				for xValue := x2; xValue <= x1; xValue++ {
					lagoon[y1][xValue] = true
				}
			}
		}
	}
	
	// Fill the interior of the lagoon and count the number of lagoon tiles
	var numberOfLagoonTiles int = 0
	for yValue := 0; yValue < len(lagoon); yValue++ {
		var interiorBoolean bool = false
		for xValue := 0; xValue < len(lagoon[yValue]); xValue++ {
			if lagoon[yValue][xValue] {
				numberOfLagoonTiles++
					if xValue == len(lagoon[yValue]) - 1 || !lagoon[yValue][xValue + 1] {
					interiorBoolean = !interiorBoolean
				}
			} else if interiorBoolean {
				lagoon[yValue][xValue] = interiorBoolean
				numberOfLagoonTiles++
			}
		}
	}
	
	return numberOfLagoonTiles
}
