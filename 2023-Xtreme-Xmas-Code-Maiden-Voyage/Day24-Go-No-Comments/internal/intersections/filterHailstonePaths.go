package intersections

import (
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/pkg/tools"
)

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

	intersectionIsInTheFuturePathOfHailstone1 := tools.IsAApproachingB(intersection.Hailstone1.Position.X, intersection.Intersection.X, intersection.Hailstone1.Velocity.X)
	intersectionIsInTheFuturePathOfHailstone2 := tools.IsAApproachingB(intersection.Hailstone2.Position.X, intersection.Intersection.X, intersection.Hailstone2.Velocity.X)

	return intersectionIsInTheFuturePathOfHailstone1 || intersectionIsInTheFuturePathOfHailstone2
}
