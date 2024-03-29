package main

import (
	"fmt"
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/internal/intersections"
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/internal/parse"
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/pkg/types"
)

func main() {
	filePath := "testInput.dat"
	testArea := types.TestArea{Min: 7, Max: 27}
	var hailstones []types.Hailstone = parse.ParseInput(filePath)
	var hailstoneIntersections []types.Hailstone2DPathIntersection = intersections.Get2DHailstonePathIntersections(hailstones)
	var futureIntersectionsInTestArea []types.Hailstone2DPathIntersection = intersections.GetFutureIntersectionsInTestArea(hailstoneIntersections, testArea)
	fmt.Println("Part 1:", len(futureIntersectionsInTestArea), "intersections occur in the test area")
}
