package main

import (
	"fmt"
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-No-Comments/internal/tools"
)

func main() {
	filePath := "testInput.dat"
	var hailstones []tools.Hailstone = tools.ParseInput(filePath)
	fmt.Println(hailstones)
}
