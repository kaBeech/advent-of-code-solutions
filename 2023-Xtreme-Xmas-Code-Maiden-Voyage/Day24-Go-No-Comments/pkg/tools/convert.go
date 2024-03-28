package tools

import (
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
