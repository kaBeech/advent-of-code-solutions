package intersections

import (
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/pkg/types"
)

func GetPerfectRockTrajectory(hailstones []types.Hailstone) types.PerfectRockTrajectory {

	// println(hailstones[0].Position.X, hailstones[0].Position.Y, hailstones[0].Position.Z, hailstones[0].Velocity.X, hailstones[0].Velocity.Y, hailstones[0].Velocity.Z)

	var perfectRockTrajectory types.PerfectRockTrajectory = types.PerfectRockTrajectory{Position: types.XYZFloatCoordinates{X: 0, Y: 0, Z: 0}, Velocity: types.XYZFloatCoordinates{X: 0, Y: 0, Z: 0}}

	var matrixRow1 types.IntersectionMatrixRowValues = GetEquationValuesForMatrix(hailstones[0], hailstones[1])
	var matrixRow2 types.IntersectionMatrixRowValues = GetEquationValuesForMatrix(hailstones[0], hailstones[2])
	var matrixRow3 types.IntersectionMatrixRowValues = GetEquationValuesForMatrix(hailstones[1], hailstones[2])
	var matrixRow4 types.IntersectionMatrixRowValues = GetEquationValuesForMatrix(hailstones[1], hailstones[3])
	var matrix = [][]float64{
		{matrixRow1.RockPositionXCoeffiecient, matrixRow1.RockPositionYCoeffiecient, matrixRow1.RockVelocityXCoeffiecient, matrixRow1.RockVelocityYCoeffiecient, matrixRow1.Constant},
		{matrixRow2.RockPositionXCoeffiecient, matrixRow2.RockPositionYCoeffiecient, matrixRow2.RockVelocityXCoeffiecient, matrixRow2.RockVelocityYCoeffiecient, matrixRow2.Constant},
		{matrixRow3.RockPositionXCoeffiecient, matrixRow3.RockPositionYCoeffiecient, matrixRow3.RockVelocityXCoeffiecient, matrixRow3.RockVelocityYCoeffiecient, matrixRow3.Constant},
		{matrixRow4.RockPositionXCoeffiecient, matrixRow4.RockPositionYCoeffiecient, matrixRow4.RockVelocityXCoeffiecient, matrixRow4.RockVelocityYCoeffiecient, matrixRow4.Constant},
	}

	// println(matrixRow1.RockPositionXCoeffiecient, matrixRow1.RockPositionYCoeffiecient, matrixRow1.RockVelocityXCoeffiecient, matrixRow1.RockVelocityYCoeffiecient, matrixRow1.Constant)

	perfectRockTrajectory2D := GetPerfectRockTrajectory2D(matrix)

	println(perfectRockTrajectory2D.Position.X, perfectRockTrajectory2D.Position.Y, perfectRockTrajectory2D.Velocity.X, perfectRockTrajectory2D.Velocity.Y)

	perfectRockTrajectory.Position.X = perfectRockTrajectory2D.Position.X
	perfectRockTrajectory.Velocity.X = perfectRockTrajectory2D.Velocity.X
	perfectRockTrajectory.Position.Y = perfectRockTrajectory2D.Position.Y
	perfectRockTrajectory.Velocity.Y = perfectRockTrajectory2D.Velocity.Y

	perfectRockTrajectory.Velocity.Z = GetPerfectRockTrajectoryZVelocity(hailstones[0], hailstones[1], perfectRockTrajectory)
	perfectRockTrajectory.Position.Z = GetPerfectRockTrajectoryZPosition(hailstones[0], perfectRockTrajectory)

	return perfectRockTrajectory
}
