package main

import (
	"fmt"
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/internal/parse"
)

func main() {
	filePath := "testInput.dat"
	var hailstones []parse.Hailstone = parse.ParseInput(filePath)
	fmt.Println(hailstones)
}
