package tools

import (
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-No-Comments/pkg/types"
	"math"
)

type XY = types.XYFloatCoordinates

func FindIntersectionOfTwoLines(line1, line2 types.Line2D) (bool, XY) {
	xIntersection := (line2.YIntercept - line1.YIntercept) / (line1.Slope - line2.Slope)
	yIntersection := line1.Slope*xIntersection + line1.YIntercept

	if !math.IsNaN(xIntersection) && !math.IsNaN(yIntersection) {
		return true, XY{xIntersection, yIntersection}
	}

	return false, XY{}
}
