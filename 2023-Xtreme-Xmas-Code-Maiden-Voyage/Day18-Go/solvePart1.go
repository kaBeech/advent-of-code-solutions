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
	fmt.Println(path)
	return 0
}
