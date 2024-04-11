package intersections

import (
	"github.com/kaBeech/advent-of-code-solutions/2023-Xtreme-Xmas-Code-Maiden-Voyage/Day24-Go-No-Comments/pkg/types"
)

func GetEquationValuesForMatrix(hailstone1 types.Hailstone, hailstone2 types.Hailstone) types.IntersectionMatrixRowValues {
	ExplainEquationReduction()

	rockPositionXCoeffiecient := hailstone2.Velocity.Y - hailstone1.Velocity.Y
	rockPositionYCoeffiecient := hailstone1.Velocity.X - hailstone2.Velocity.X
	rockVelocityXCoeffiecient := hailstone1.Position.Y - hailstone2.Position.Y
	rockVelocityYCoeffiecient := hailstone2.Position.X - hailstone1.Position.X
	constant := hailstone1.Position.Y*hailstone1.Velocity.X -
		hailstone1.Position.X*hailstone1.Velocity.Y +
		hailstone2.Position.X*hailstone2.Velocity.Y -
		hailstone2.Position.Y*hailstone2.Velocity.X

	return types.IntersectionMatrixRowValues{
		RockPositionXCoeffiecient: rockPositionXCoeffiecient,
		RockPositionYCoeffiecient: rockPositionYCoeffiecient,
		RockVelocityXCoeffiecient: rockVelocityXCoeffiecient,
		RockVelocityYCoeffiecient: rockVelocityYCoeffiecient,
		Constant:                  constant}
}
