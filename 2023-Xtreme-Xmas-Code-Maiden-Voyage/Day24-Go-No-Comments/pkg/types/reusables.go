package types

type XYIntegerCoordinates struct {
	X int
	Y int
}

type XYZIntegerCoordinates struct {
	X int
	Y int
	Z int
}

type XYFloatCoordinates struct {
	X float64
	Y float64
}

type XYZFloatCoordinates struct {
	X float64
	Y float64
	Z float64
}

type Line2D struct {
	Slope      float64
	YIntercept float64
}

type Line3D struct {
	Position XYZFloatCoordinates
	Velocity XYZFloatCoordinates
}
