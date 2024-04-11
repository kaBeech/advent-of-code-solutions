package tools

func SolveSystemOfEquations(matrix [][]float64) []float64 {

	for i := 0; i < len(matrix); i++ {
		EliminateForward(matrix, i)
	}

	solvedEquationValues := SubstituteBackward(matrix)
	println(solvedEquationValues[0], solvedEquationValues[1], solvedEquationValues[2], solvedEquationValues[3])

	return solvedEquationValues
}

func EliminateForward(matrix [][]float64, i int) {
	maxRowIndex := FindRowWithLargestElement(matrix, i)

	if maxRowIndex != i {
		SwapRows(matrix, i, maxRowIndex)
	}

	MakeAllValuesInThisColumnBelowThisValueZero(matrix, i)
}

func FindRowWithLargestElement(matrix [][]float64, i int) int {
	largestElement := matrix[i][i]
	maxRowIndex := i
	for k := i + 1; k < len(matrix); k++ {
		if matrix[k][i] > largestElement {
			largestElement = matrix[k][i]
			maxRowIndex = k
		}
	}
	return maxRowIndex
}

func SwapRows(matrix [][]float64, i int, j int) {
	for k := i; k < len(matrix)+1; k++ {
		temporaryValue := matrix[j][k]
		matrix[j][k] = matrix[i][k]
		matrix[i][k] = temporaryValue
	}

}

func MakeAllValuesInThisColumnBelowThisValueZero(matrix [][]float64, i int) {
	for k := i + 1; k < len(matrix); k++ {
		c := -matrix[k][i] / matrix[i][i]
		for j := i; j < len(matrix)+1; j++ {
			if i == j {
				matrix[k][j] = 0
			} else {
				matrix[k][j] += c * matrix[i][j]
			}
		}
	}
}

func SubstituteBackward(matrix [][]float64) []float64 {
	solvedEquationValues := make([]float64, len(matrix))
	var result []float64
	if result == nil {
		println("result is true")
	}
	var solvedEquationValuesi float64
	for i := len(matrix) - 1; i >= 0; i-- {
		solvedEquationValuesi = matrix[i][len(matrix)] / matrix[i][i]
		result = append(result, solvedEquationValuesi)
		println(solvedEquationValuesi)
		for k := i - 1; k >= 0; k-- {
			matrix[k][len(matrix)] -= matrix[k][i] * solvedEquationValuesi
		}
	}

	println(result[0], result[1], result[2], result[3])
	println(solvedEquationValues[0], solvedEquationValues[1], solvedEquationValues[2], solvedEquationValues[3])

	return solvedEquationValues
}
