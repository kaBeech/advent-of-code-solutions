package intersections

import (
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/pkg/types"
)

func GetPerfectRockTrajectory(hailstones []types.Hailstone) types.PerfectRockTrajectory {
	var perfectRockTrajectory types.PerfectRockTrajectory = types.PerfectRockTrajectory{Position: types.XYZFloatCoordinates{X: 0, Y: 0, Z: 0}, Velocity: types.XYZFloatCoordinates{X: 0, Y: 0, Z: 0}}
	hailstone1 := hailstones[0]
	var collisionTime1 float64

	ExplainEquationReduction()

	println(collisionTime1, " = ",
		(perfectRockTrajectory.Position.X-hailstone1.Position.X)/
			(hailstone1.Velocity.X-perfectRockTrajectory.Velocity.X))

	return perfectRockTrajectory
}
