package parse

import (
	"bufio"
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/pkg/tools"
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/pkg/types"
	"os"
	"strings"
)

type Hailstone = types.Hailstone
type XYZ = types.XYZFloatCoordinates

func ParseInput(filePath string) []Hailstone {
	var hailstones []Hailstone = []Hailstone{}

	input, err := os.Open(filePath)
	tools.Check(err)
	scanner := bufio.NewScanner(input)
	const maxLinesInFile int = 1024
	buffer := make([]byte, maxLinesInFile)
	scanner.Buffer(buffer, maxLinesInFile)

	var currentID int = 0
	for scanner.Scan() {
		rawHailstoneString := scanner.Text()
		rawHailstoneSplit := strings.Split(rawHailstoneString, " @ ")

		positionString := rawHailstoneSplit[0]
		velocityString := rawHailstoneSplit[1]

		positionSplit := strings.Split(positionString, ", ")
		velocitySplit := strings.Split(velocityString, ", ")

		hailstone := Hailstone{
			ID: currentID,
			Position: XYZ{
				X: tools.GetFloatFromStringInput(positionSplit[0]),
				Y: tools.GetFloatFromStringInput(positionSplit[1]),
				Z: tools.GetFloatFromStringInput(positionSplit[2]),
			},
			Velocity: XYZ{
				X: tools.GetFloatFromStringInput(velocitySplit[0]),
				Y: tools.GetFloatFromStringInput(velocitySplit[1]),
				Z: tools.GetFloatFromStringInput(velocitySplit[2]),
			},
		}

		hailstones = append(hailstones, hailstone)
		currentID++
	}

	return hailstones
}
