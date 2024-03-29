package types

type Hailstone struct {
	ID       int
	Position XYZFloatCoordinates
	Velocity XYZFloatCoordinates
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
