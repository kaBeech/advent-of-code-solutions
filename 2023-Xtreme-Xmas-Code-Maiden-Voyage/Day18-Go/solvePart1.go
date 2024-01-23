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
	return 0
}
