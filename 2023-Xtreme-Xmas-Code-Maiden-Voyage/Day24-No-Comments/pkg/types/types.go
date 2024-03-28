package types

type XYZIntegerCoordinates struct {
	X int
	Y int
	Z int
}

type Hailstone struct {
	ID       int
	Position XYZIntegerCoordinates
	Velocity XYZIntegerCoordinates
}
