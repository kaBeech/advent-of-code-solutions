package intersections

import (
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/pkg/types"
)

func GetPerfectRockTrajectory(hailstones []types.Hailstone) types.PerfectRockTrajectory {
	var perfectRockTrajectory types.PerfectRockTrajectory = types.PerfectRockTrajectory{Position: types.XYZFloatCoordinates{X: 0, Y: 0, Z: 0}, Velocity: types.XYZFloatCoordinates{X: 0, Y: 0, Z: 0}}
	hailstone1 := hailstones[0]
	var collisionTime1 float64

	println("Since we know the rock and all the hailstones will collide, we ",
		"can just solve for their trajectories")

	println("Rock.Position.X + CollisionTime1 * Rock.Velocity.X = ",
		"Hailstone1.Position.X + CollisionTime1 * Hailstone1.Velocity.X")
	println(perfectRockTrajectory.Position.X+collisionTime1*
		perfectRockTrajectory.Velocity.X, " = ",
		hailstone1.Position.X+collisionTime1*hailstone1.Velocity.X)

	println("Move the Collision Time to the left hand side of the equation...")

	println("Rock.Position.X - Hailstone1.Position.X = ",
		"CollisionTime1 * Hailstone1.Velocity.X - ",
		"CollisionTime1 * Rock.Velocity.X")

	println("Rock.Position.X - Hailstone1.Position.X = ",
		"CollisionTime1 * ",
		"(Hailstone1.Velocity.X - Rock.Velocity.X)")

	println("CollisionTime1 = ",
		"(Rock.Position.X - Hailstone1.Position.X) / ",
		"(Hailstone1.Velocity.X - Rock.Velocity.X)")

	println("A similar equation can be used for the Y coordinates. ",
		"Since we know that the rock will collide with all the hailstones ",
		"in a straight trajectory, we can assume that once the X and Y ",
		"trajectories are set, the Z trajectory will line up as well. ",
		"This means that we can treat this essentially as a 2D problem ",
		"instead of a 3D one, and then extrapolate the Z trajectory later")

	println("CollisionTime1 = ",
		"(Rock.Position.Y - Hailstone1.Position.Y) / ",
		"(Hailstone1.Velocity.Y - Rock.Velocity.Y)")

	println("Set these equations as equal to each other")

	println("CollisionTime1 = ",
		"(Rock.Position.X - Hailstone1.Position.X) / ",
		"(Hailstone1.Velocity.X - Rock.Velocity.X) = ",
		"(Rock.Position.Y - Hailstone1.Position.Y) / ",
		"(Hailstone1.Velocity.Y - Rock.Velocity.Y)")

	println("Move all the Hailstone-specific terms to the right hand side ",
		"of the equation")

	println("(Rock.Position.X - Hailstone1.Position.X) * ",
		"(Hailstone1.Velocity.Y - Rock.Velocity.Y) = ",
		"(Rock.Position.Y - Hailstone1.Position.Y) * ",
		"(Hailstone1.Velocity.X - Rock.Velocity.X)")

	println("Rock.Position.X * Hailstone1.Velocity.Y - ",
		"Rock.Position.X * Rock.Velocity.Y - ",
		"Hailstone1.Position.X * Hailstone1.Velocity.Y + ",
		"Hailstone1.Position.X * Rock.Velocity.Y = ",
		"Rock.Position.Y * Hailstone1.Velocity.X - ",
		"Rock.Position.Y * Rock.Velocity.X - ",
		"Hailstone1.Position.Y * Hailstone1.Velocity.X + ",
		"Hailstone1.Position.Y * Rock.Velocity.X")

	println("Rock.Position.X * Hailstone1.Velocity.Y - ",
		"Hailstone1.Position.X * Hailstone1.Velocity.Y + ",
		"Hailstone1.Position.X * Rock.Velocity.Y - ",
		"Rock.Position.Y * Hailstone1.Velocity.X + ",
		"Hailstone1.Position.Y * Hailstone1.Velocity.X - ",
		"Hailstone1.Position.Y * Rock.Velocity.X = ",
		"Rock.Position.X * Rock.Velocity.Y - ",
		"Rock.Position.Y * Rock.Velocity.X")

	println("Rock.Position.X * Rock.Velocity.Y - ",
		"Rock.Position.Y * Rock.Velocity.X  = ",
		"Rock.Position.X * Hailstone1.Velocity.Y - ",
		"Hailstone1.Position.X * Hailstone1.Velocity.Y + ",
		"Hailstone1.Position.X * Rock.Velocity.Y - ",
		"Rock.Position.Y * Hailstone1.Velocity.X + ",
		"Hailstone1.Position.Y * Hailstone1.Velocity.X - ",
		"Hailstone1.Position.Y * Rock.Velocity.X")

	println("Use this same equation for a second hailstone")

	println("Rock.Position.X * Rock.Velocity.Y - ",
		"Rock.Position.Y * Rock.Velocity.X  = ",
		"Rock.Position.X * Hailstone2.Velocity.Y - ",
		"Hailstone2.Position.X * Hailstone2.Velocity.Y + ",
		"Hailstone2.Position.X * Rock.Velocity.Y - ",
		"Rock.Position.Y * Hailstone1.Velocity.X + ",
		"Hailstone2.Position.Y * Hailstone2.Velocity.X - ",
		"Hailstone2.Position.Y * Rock.Velocity.X")

	println("Set these two equations as equal to each other")

	println("Rock.Position.X * Rock.Velocity.Y - ",
		"Rock.Position.Y * Rock.Velocity.X  = ",
		"Rock.Position.X * Hailstone1.Velocity.Y - ",
		"Hailstone1.Position.X * Hailstone1.Velocity.Y + ",
		"Hailstone1.Position.X * Rock.Velocity.Y - ",
		"Rock.Position.Y * Hailstone1.Velocity.X + ",
		"Hailstone1.Position.Y * Hailstone1.Velocity.X - ",
		"Hailstone1.Position.Y * Rock.Velocity.X = ",
		"Rock.Position.X * Hailstone2.Velocity.Y - ",
		"Hailstone2.Position.X * Hailstone2.Velocity.Y + ",
		"Hailstone2.Position.X * Rock.Velocity.Y - ",
		"Rock.Position.Y * Hailstone1.Velocity.X + ",
		"Hailstone2.Position.Y * Hailstone2.Velocity.X - ",
		"Hailstone2.Position.Y * Rock.Velocity.X")

	println("Move all the Rock-specific terms to the right hand side ",
		"of the equation")

	println(collisionTime1, " = ",
		(perfectRockTrajectory.Position.X-hailstone1.Position.X)/
			(hailstone1.Velocity.X-perfectRockTrajectory.Velocity.X))

	return perfectRockTrajectory
}
