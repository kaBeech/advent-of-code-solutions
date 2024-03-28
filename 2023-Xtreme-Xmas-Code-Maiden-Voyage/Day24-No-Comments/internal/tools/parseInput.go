package tools

import (
	"bufio"
	"os"
	"strconv"
	"strings"
)

type XYZPosition struct {
	X int
	Y int
	Z int
}

type XYZVelocity struct {
	X int
	Y int
	Z int
}

type Hailstone struct {
	ID       int
	Position XYZPosition
	Velocity XYZVelocity
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func getIntFromStringInput(input string) int {
	trimmedInput := strings.TrimSpace(input)
	result, err := strconv.Atoi(trimmedInput)
	check(err)
	return result
}

func ParseInput(filePath string) []Hailstone {
	var hailstones []Hailstone = []Hailstone{}

	input, err := os.Open(filePath)
	check(err)
	scanner := bufio.NewScanner(input)
	const maxCapacity int = 1024
	buf := make([]byte, maxCapacity)
	scanner.Buffer(buf, maxCapacity)

	var i int = 0
	for scanner.Scan() {
		rawHailstone := scanner.Text()

		stringSplit := strings.Split(rawHailstone, " @ ")
		positionString := stringSplit[0]
		velocityString := stringSplit[1]

		positionSplit := strings.Split(positionString, ", ")
		positionX := getIntFromStringInput(positionSplit[0])
		positionY := getIntFromStringInput(positionSplit[1])
		positionZ := getIntFromStringInput(positionSplit[2])

		velocitySplit := strings.Split(velocityString, ", ")
		velocityX := getIntFromStringInput(velocitySplit[0])
		velocityY := getIntFromStringInput(velocitySplit[1])
		velocityZ := getIntFromStringInput(velocitySplit[2])

		hailstone := Hailstone{
			ID: i,
			Position: XYZPosition{
				X: positionX,
				Y: positionY,
				Z: positionZ,
			},
			Velocity: XYZVelocity{
				X: velocityX,
				Y: velocityY,
				Z: velocityZ,
			},
		}

		hailstones = append(hailstones, hailstone)
		i++
	}

	return hailstones
}
