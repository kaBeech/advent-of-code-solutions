package intersections

import (
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/pkg/matrix"
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/pkg/types"
)

func GetPerfectRockTrajectory2D(inputMatrix [][]float64) types.PerfectRockTrajectory2D {
	result := matrix.SolveSystemOfEquations(inputMatrix)
	return types.PerfectRockTrajectory2D{Position: types.XYFloatCoordinates{X: result[0], Y: result[1]}, Velocity: types.XYFloatCoordinates{X: result[2], Y: result[3]}}
}
