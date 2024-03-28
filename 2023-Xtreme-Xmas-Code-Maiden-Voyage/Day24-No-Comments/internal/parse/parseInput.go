package parse

import (
	"bufio"
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-No-Comments/pkg/tools"
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-No-Comments/pkg/types"
	"os"
	"strings"
)

type Hailstone = types.Hailstone
type XYZ = types.XYZIntegerCoordinates

func ParseInput(filePath string) []Hailstone {
	var hailstones []Hailstone = []Hailstone{}

	input, err := os.Open(filePath)
	tools.Check(err)
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
		velocitySplit := strings.Split(velocityString, ", ")

		hailstone := Hailstone{
			ID: i,
			Position: XYZ{
				X: tools.GetIntFromStringInput(positionSplit[0]),
				Y: tools.GetIntFromStringInput(positionSplit[1]),
				Z: tools.GetIntFromStringInput(positionSplit[2]),
			},
			Velocity: XYZ{
				X: tools.GetIntFromStringInput(velocitySplit[0]),
				Y: tools.GetIntFromStringInput(velocitySplit[1]),
				Z: tools.GetIntFromStringInput(velocitySplit[2]),
			},
		}

		hailstones = append(hailstones, hailstone)
		i++
	}

	return hailstones
}
