package tools

import (
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/pkg/types"
	"strconv"
	"strings"
)

func GetIntFromStringInput(input string) int {
	trimmedInput := strings.TrimSpace(input)
	result, err := strconv.Atoi(trimmedInput)
	Check(err)
	return result
}

func GetFloatFromStringInput(input string) float64 {
	trimmedInput := strings.TrimSpace(input)
	result, err := strconv.ParseFloat(trimmedInput, 64)
	Check(err)
	return result
}

func GetXYFromXYZFloatCoordinates(xyzCoordinates types.XYZFloatCoordinates) types.XYFloatCoordinates {
	return types.XYFloatCoordinates{xyzCoordinates.X, xyzCoordinates.Y}
}
