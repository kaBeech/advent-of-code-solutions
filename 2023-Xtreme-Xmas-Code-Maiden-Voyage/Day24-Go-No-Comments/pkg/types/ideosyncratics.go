package types

type Hailstone struct {
	ID       int
	Position XYZFloatCoordinates
	Velocity XYZFloatCoordinates
}

type Hailstone2DPathIntersection struct {
	ID           int
	Hailstone1ID int
	Hailstone2ID int
	Intersection XYFloatCoordinates
}
