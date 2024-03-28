package tools

import (
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/pkg/types"
	"math"
)

type XY = types.XYFloatCoordinates

func GetIntersectionOfTwo2DLines(line1, line2 types.Line2D) (bool, XY) {
	xIntersection := (line2.YIntercept - line1.YIntercept) / (line1.Slope - line2.Slope)
	yIntersection := line1.Slope*xIntersection + line1.YIntercept

	if !math.IsNaN(xIntersection) && !math.IsNaN(yIntersection) {
		return true, XY{xIntersection, yIntersection}
	}

	return false, XY{}
}

func Get2DLineEquationFromPositionAndVelocity(position, velocity XY) types.Line2D {
	slope := velocity.Y / velocity.X
	yIntercept := position.Y - slope*position.X

	return types.Line2D{slope, yIntercept}
}
