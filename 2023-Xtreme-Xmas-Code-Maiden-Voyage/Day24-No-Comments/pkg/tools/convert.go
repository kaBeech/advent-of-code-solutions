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
