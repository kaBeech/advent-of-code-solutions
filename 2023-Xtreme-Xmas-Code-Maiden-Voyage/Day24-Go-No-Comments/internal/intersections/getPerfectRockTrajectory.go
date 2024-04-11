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

	println("Rock.Position.X + CollisionTime1 * Rock.Velocity.X ",
		"= Hailstone1.Position.X + CollisionTime1 * Hailstone1.Velocity.X")
	println(perfectRockTrajectory.Position.X+collisionTime1*
		perfectRockTrajectory.Velocity.X, " = ",
		hailstone1.Position.X+collisionTime1*hailstone1.Velocity.X)

	println("For readibility we will abbreviate the terms in the equation: ",
		"R.P.X = Rock.Position.X, CT1 = CollisionTime1, ",
		"R.V.X = Rock.Velocity.X, H1.P.X = Hailstone1.Position.X, ",
		"H1.V.X = Hailstone1.Velocity.X, and so on")

	println("R.P.X + CT1 * R.V.X ",
		"= H1.P.X + CT1 * H1.V.X")

	println("Move the Collision Time to the left hand side of the equation...")

	println("R.P.X - H1.P.X ",
		"= CT1 * H1.V.X ",
		"- CT1 * R.V.X")

	println("R.P.X - H1.P.X ",
		"= CT1 ",
		"* (H1.V.X - R.V.X)")

	println("CT1 ",
		"= (R.P.X - H1.P.X) ",
		"/ (H1.V.X - R.V.X)")

	println("A similar equation can be used for the Y coordinates. ",
		"Since we know that the rock will collide with all the hailstones ",
		"in a straight trajectory, we can assume that once the X and Y ",
		"trajectories are set, the Z trajectory will line up as well. ",
		"This means that we can treat this essentially as a 2D problem ",
		"instead of a 3D one, and then extrapolate the Z trajectory later")

	println("CT1 ",
		"= (R.P.Y - H1.P.Y) ",
		"/ (H1.V.Y - R.V.Y)")

	println("Set these equations as equal to each other")

	println("CT1 ",
		"= (R.P.X - H1.P.X) ",
		"/ (H1.V.X - R.V.X) ",
		"= (R.P.Y - H1.P.Y) ",
		"/ (H1.V.Y - R.V.Y)")

	println("Move all the Hailstone-specific terms to the right hand side ",
		"of the equation")

	println("(R.P.X - H1.P.X) ",
		"* (H1.V.Y - R.V.Y) ",
		"= (R.P.Y - H1.P.Y) ",
		"* (H1.V.X - R.V.X)")

	println("R.P.X * H1.V.Y ",
		"- R.P.X * R.V.Y ",
		"- H1.P.X * H1.V.Y ",
		"+ H1.P.X * R.V.Y ",
		"= R.P.Y * H1.V.X ",
		"- R.P.Y * R.V.X ",
		"- H1.P.Y * H1.V.X ",
		"+ H1.P.Y * R.V.X")

	println("R.P.X * H1.V.Y ",
		"- H1.P.X * H1.V.Y ",
		"+ H1.P.X * R.V.Y ",
		"- R.P.Y * H1.V.X ",
		"+ H1.P.Y * H1.V.X ",
		"- H1.P.Y * R.V.X ",
		"= R.P.X * R.V.Y ",
		"- R.P.Y * R.V.X")

	println("R.P.X * R.V.Y ",
		"- R.P.Y * R.V.X  ",
		"= R.P.X * H1.V.Y ",
		"- H1.P.X * H1.V.Y ",
		"+ H1.P.X * R.V.Y ",
		"- R.P.Y * H1.V.X ",
		"+ H1.P.Y * H1.V.X ",
		"- H1.P.Y * R.V.X")

	println("Use this same equation for a second hailstone")

	println("R.P.X * R.V.Y ",
		"- R.P.Y * R.V.X  ",
		"= R.P.X * H2.V.Y ",
		"- H2.P.X * H2.V.Y ",
		"+ H2.P.X * R.V.Y ",
		"- R.P.Y * H2.V.X ",
		"+ H2.P.Y * H2.V.X ",
		"- H2.P.Y * R.V.X")

	println("Set these two equations as equal to each other")

	println("R.P.X * H1.V.Y ",
		"- H1.P.X * H1.V.Y ",
		"+ H1.P.X * R.V.Y ",
		"- R.P.Y * H1.V.X ",
		"+ H1.P.Y * H1.V.X ",
		"- H1.P.Y * R.V.X ",
		"= R.P.X * H2.V.Y ",
		"- H2.P.X * H2.V.Y ",
		"+ H2.P.X * R.V.Y ",
		"- R.P.Y * H2.V.X ",
		"+ H2.P.Y * H2.V.X ",
		"- H2.P.Y * R.V.X")

	println("Move all the Rock-specific terms to the left hand side ",
		"of the equation")

	println("R.P.Y * H1.V.X ",
		"- R.P.Y * H2.V.X ",
		"+ R.P.X * H2.V.Y ",
		"- R.P.X * H1.V.Y ",
		"+ H1.P.Y * R.V.X ",
		"- H2.P.Y * R.V.X ",
		"+ H2.P.X * R.V.Y ",
		"- H1.P.X * R.V.Y ",
		"= H1.P.Y * H1.V.X ",
		"- H1.P.X * H1.V.Y ",
		"+ H2.P.X * H2.V.Y ",
		"- H2.P.Y * H2.V.X")

	println("Now ")

	println(collisionTime1, " = ",
		(perfectRockTrajectory.Position.X-hailstone1.Position.X)/
			(hailstone1.Velocity.X-perfectRockTrajectory.Velocity.X))

	return perfectRockTrajectory
}
