package intersections

import (
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/pkg/types"
)

func GetPerfectRockTrajectoryZPosition(hailstone types.Hailstone, perfectRockTrajectory types.PerfectRockTrajectory) float64 {
	timeUntilImpact := (perfectRockTrajectory.Position.X - hailstone.Position.X) / (perfectRockTrajectory.Velocity.X - hailstone.Velocity.X)
	impactZPosition := hailstone.Position.Z + hailstone.Velocity.Z*timeUntilImpact
	perfectRockTrajectoryZPosition := impactZPosition - perfectRockTrajectory.Velocity.Z*timeUntilImpact
	return perfectRockTrajectoryZPosition
}
