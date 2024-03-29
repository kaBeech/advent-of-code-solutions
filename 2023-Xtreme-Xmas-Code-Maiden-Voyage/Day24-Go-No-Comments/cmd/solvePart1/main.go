package main

import (
	"fmt"
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/internal/parse"
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/pkg/types"
)

func main() {
	filePath := "testInput.dat"
	var hailstones []types.Hailstone = parse.ParseInput(filePath)
	var hailstoneIntersections []types.HailstoneIntersection = intersections.Get2DHailstonePathIntersections(hailstones)
	fmt.Println(hailstones)
}
