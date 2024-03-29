package intersections

import (
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/pkg/tools"
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/pkg/types"
)

func Get2DHailstonePathIntersections(hailstones []types.Hailstone) []types.Hailstone2DPathIntersection {
	var intersections []types.Hailstone2DPathIntersection

	for i := 0; i < len(hailstones); i++ {
		for j := i + 1; j < len(hailstones); j++ {

			position1 := tools.GetXYFromXYZFloatCoordinates(hailstones[i].Position)
			position2 := tools.GetXYFromXYZFloatCoordinates(hailstones[j].Position)

			velocity1 := tools.GetXYFromXYZFloatCoordinates(hailstones[i].Velocity)
			velocity2 := tools.GetXYFromXYZFloatCoordinates(hailstones[j].Velocity)

			line1 := tools.Get2DLineEquationFromPositionAndVelocity(position1, velocity1)
			line2 := tools.Get2DLineEquationFromPositionAndVelocity(position2, velocity2)

			isIntersecting, intersection := tools.GetIntersectionOfTwo2DLines(line1, line2)

			if isIntersecting {
				intersections = append(intersections, types.Hailstone2DPathIntersection{len(intersections), i, j, intersection})
			}
		}
	}

	return intersections
}

