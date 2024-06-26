package intersections

func Explain2DIntersectionEquationReduction() {
	println("Getting the 2D trajectory for the rock:")

	println("Since we know the rock and all the hailstones will collide, we ",
		"can just take a few of their trajectories and solve for the line ",
		"of intersection")

	println("Rock.Position.X + CollisionTime1 * Rock.Velocity.X ",
		"= Hailstone1.Position.X + CollisionTime1 * Hailstone1.Velocity.X")

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

	println("R.P.X * H2.V.Y ",
		"- R.P.X * H1.V.Y ",
		"+ R.P.Y * H1.V.X ",
		"- R.P.Y * H2.V.X ",
		"+ H1.P.Y * R.V.X ",
		"- H2.P.Y * R.V.X ",
		"+ H2.P.X * R.V.Y ",
		"- H1.P.X * R.V.Y ",
		"= H1.P.Y * H1.V.X ",
		"- H1.P.X * H1.V.Y ",
		"+ H2.P.X * H2.V.Y ",
		"- H2.P.Y * H2.V.X")

	println("Extract the Rock-specific terms - we now have the first of a ",
		" system of equations")

	println("R.P.X * (H2.V.Y - H1.V.Y) ",
		"+ R.P.Y * (H1.V.X - H2.V.X) ",
		"+ R.V.X * (H1.P.Y - H2.P.Y) ",
		"+ R.V.Y * (H2.P.X - H1.P.X) ",
		"= H1.P.Y * H1.V.X ",
		"- H1.P.X * H1.V.Y ",
		"+ H2.P.X * H2.V.Y ",
		"- H2.P.Y * H2.V.X")
}

func ExplainTimeUntilImpactEquationReduction() {
	println("Getting the time until the rock will impact a hailstone:")

	println("For the position, a coordinate on any axis will do. ",
		"This program uses the X axis)")

	println("Rock Position + Rock Velocity * Time ",
		"= Hailstone Position + Hailstone Velocity * Time")

	println("For readibility we will abbreviate the terms in the equation: ",
		"R.P = Rock Position, R.V = Rock Velocity, t = Time, ",
		"H.P = Hailstone Position, and H.V = Hailstone Velocity)")

	println("R.P.X + t*R.V.X = H1.P.X + t*H1.V.X")

	println("t*H.V.X - t*R.V.X = R.P.X - H.P.X")

	println("t(H.V.X - R.V.X) = R.P.X - H.P.X")

	println("t = (R.P.X - H1.P.X) / (H.V.X - R.V.X)")

	println("Time Until Impact = (Rock Position - Hailstone Position) ",
		"/ (Hailstone Velocity - Rock Velocity)")
}
