package types

type Hailstone struct {
	ID       int
	Position XYZFloatCoordinates
	Velocity XYZFloatCoordinates
}

type PerfectRockTrajectory struct {
	Position XYZFloatCoordinates
	Velocity XYZFloatCoordinates
}

type PerfectRockTrajectory2D struct {
	Position XYFloatCoordinates
	Velocity XYFloatCoordinates
}

type Hailstone2DPathIntersection struct {
	ID           int
	Hailstone1   Hailstone
	Hailstone2   Hailstone
	Intersection XYFloatCoordinates
}

type TestArea struct {
	Min int
	Max int
}

type IntersectionMatrixRowValues struct {
	RockPositionXCoeffiecient float64
	RockPositionYCoeffiecient float64
	RockVelocityXCoeffiecient float64
	RockVelocityYCoeffiecient float64
	Constant                  float64
}

type LinearEquation struct {
	Variables []float64
	Constant  float64
}
