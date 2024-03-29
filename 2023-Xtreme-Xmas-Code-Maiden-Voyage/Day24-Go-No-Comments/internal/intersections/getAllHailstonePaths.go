package intersections

import (
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/pkg/tools"
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/pkg/types"
)

type Intersection = types.Hailstone2DPathIntersection
type TestArea = types.TestArea

func Get2DHailstonePathIntersections(hailstones []types.Hailstone) []Intersection {
	var intersections []Intersection

	for i := 0; i < len(hailstones); i++ {
		for j := i + 1; j < len(hailstones); j++ {

			hailstone1 := hailstones[i]
			hailstone2 := hailstones[j]

			position1 := tools.GetXYFromXYZFloatCoordinates(hailstone1.Position)
			position2 := tools.GetXYFromXYZFloatCoordinates(hailstone2.Position)

			velocity1 := tools.GetXYFromXYZFloatCoordinates(hailstone1.Velocity)
			velocity2 := tools.GetXYFromXYZFloatCoordinates(hailstone2.Velocity)

			line1 := tools.Get2DLineEquationFromPositionAndVelocity(position1, velocity1)
			line2 := tools.Get2DLineEquationFromPositionAndVelocity(position2, velocity2)

			isIntersecting, intersection := tools.GetIntersectionOfTwo2DLines(line1, line2)

			if isIntersecting {
				intersections = append(intersections, Intersection{ID: len(intersections), Hailstone1: hailstone1, Hailstone2: hailstone2, Intersection: intersection})
			}
		}
	}

	return intersections
}
