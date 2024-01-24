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

func main() {
    fmt.Println("Part 2: The lagoon can now hold", solvePart1(), "cubic meters of lava.")
}

func solvePart1() int {
	path, perimeterLength := tracePath()

	numberOfInteriorLagoonTiles := getAreaUsingShoelaceFormula(path)

	var numberOfLagoonTiles int = numberOfInteriorLagoonTiles + perimeterLength / 2 + 1
	
	return numberOfLagoonTiles
}


func extractHexadecimalFromString(input string) (string) {
	regex := regexp.MustCompile(`#([a-fA-F0-9]+)`)

	match := regex.FindStringSubmatch(input)

	if len(match) < 2 {
		return ""
	}
	
	return match[1]
}

func convertHexadecimalToDecimal(hexadecimalNumber string) (int) {
	decimalNumber, err := strconv.ParseInt(hexadecimalNumber, 16, 32)
	if err != nil {
		return 0
	}
	return int(decimalNumber)
}
	

func tracePath() ([]XYCoordinates, int) {
	var path []XYCoordinates = []XYCoordinates{
		XYCoordinates{0, 0},
	}

	// Read the directions from the input file
	input, err := os.Open("testInput.dat")
    check(err)
    scanner := bufio.NewScanner(input)
	const maxCapacity int = 24  // the highest number
	buf := make([]byte, maxCapacity)
	scanner.Buffer(buf, maxCapacity)

	// Trace the path given by the directions for the lagoon walls 
	var currentCoordinates XYCoordinates = path[len(path)-1]
	var perimeterLength int = 0
	for scanner.Scan() {
		directionLine := scanner.Text()
		// var sideLength int = extractFirstNumberFromString(directionLine)
		var hexadecimalDirections string = extractHexadecimalFromString(directionLine)
		var hexadecimalOrientation string = hexadecimalDirections[len(hexadecimalDirections) - 1 : len(hexadecimalDirections)]
		var hexadecimalSideLength string = hexadecimalDirections[0 : len(hexadecimalDirections) - 1]
		var sideLength int = convertHexadecimalToDecimal(hexadecimalSideLength)
		// fmt.Println(hexadecimalOrientation, hexadecimalSideLength)
		perimeterLength += sideLength
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
	return path, perimeterLength
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

func getAreaUsingShoelaceFormula(path []XYCoordinates) int {
	var sum1 int = 0
	var sum2 int = 0
	for i := range path {
		if i < len(path) - 1 {
			sum1 += path[i].x * path[i+1].y
			sum2 += path[i].y * path[i+1].x
		}
	}
	var area int = (sum1 - sum2) / 2
	if area < 0 {
		area = -area
	}
	return area
}