package main

import (
	"fmt"
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/internal/intersections"
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/internal/parse"
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/pkg/types"
)

func main() {
	filePath := "testInput.dat"
	// filePath := "challengeInput.dat"
	var hailstones []types.Hailstone = parse.ParseInput(filePath)
	var perfectRockTrajectory types.PerfectRockTrajectory = intersections.GetPerfectRockTrajectory(hailstones)
	var result float64 = perfectRockTrajectory.Position.X + perfectRockTrajectory.Position.Y + perfectRockTrajectory.Position.Z
	fmt.Println("Part 2: The sum of the coordinates of th perfect rock trajectory's starting position is", result)
}
