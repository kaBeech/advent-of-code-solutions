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

func GetFutureIntersectionsInTestArea(intersections []Intersection, testArea TestArea) []Intersection {
	var futureIntersections []Intersection

	for _, intersection := range intersections {
		if checkIfIntersectionIsInTestArea(intersection, testArea) && checkIfIntersectionIsInEitherHailstonesFuturePath(intersection) {
			futureIntersections = append(futureIntersections, intersection)
		}
	}

	return futureIntersections
}

func checkIfIntersectionIsInTestArea(intersection Intersection, testArea TestArea) bool {
	return intersection.Intersection.X >= float64(testArea.Min) && intersection.Intersection.X <= float64(testArea.Max) && intersection.Intersection.Y >= float64(testArea.Min) && intersection.Intersection.Y <= float64(testArea.Max)
}

func checkIfIntersectionIsInEitherHailstonesFuturePath(intersection Intersection) bool {

	intersectionIsInTheFuturePathOfHailstone1 := tools.IsAApproachingB(hailstone1Coordinates, intersection.Intersection, hailstone1Velocity)
	intersectionIsInTheFuturePathOfHailstone2 := tools.IsAApproachingB(hailstone2Coordinates, intersection.Intersection, hailstone2Velocity)

	return intersectionIsInTheFuturePathOfHailstone1 || intersectionIsInTheFuturePathOfHailstone2
}

