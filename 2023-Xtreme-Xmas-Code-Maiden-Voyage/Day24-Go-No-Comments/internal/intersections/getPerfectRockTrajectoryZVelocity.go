package intersections

import (
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/pkg/types"
)

func GetPerfectRockTrajectoryZVelocity(hailstone1 types.Hailstone, hailstone2 types.Hailstone, perfectRockTrajectory types.PerfectRockTrajectory) float64 {
	ExplainTimeUntilImpactEquationReduction()
	timeUntilImpact1 := (perfectRockTrajectory.Position.X - hailstone1.Position.X) / (hailstone1.Velocity.X - perfectRockTrajectory.Velocity.X)
	timeUntilImpact2 := (perfectRockTrajectory.Position.X - hailstone2.Position.X) / (hailstone2.Velocity.X - perfectRockTrajectory.Velocity.X)
	impact1ZPosition := hailstone1.Position.Z + hailstone1.Velocity.Z*timeUntilImpact1
	impact2ZPosition := hailstone2.Position.Z + hailstone2.Velocity.Z*timeUntilImpact2
	var perfectRockTrajectoryZVelocity float64
	if timeUntilImpact1 < timeUntilImpact2 {
		perfectRockTrajectoryZVelocity = (impact2ZPosition - impact1ZPosition) / (timeUntilImpact2 - timeUntilImpact1)
	} else {
		perfectRockTrajectoryZVelocity = (impact1ZPosition - impact2ZPosition) / (timeUntilImpact1 - timeUntilImpact2)
	}
	return perfectRockTrajectoryZVelocity
}
