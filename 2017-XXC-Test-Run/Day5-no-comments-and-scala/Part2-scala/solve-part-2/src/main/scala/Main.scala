import scala.io.Source

@main def solvePart2: Unit =
  println(
    "Part 2: " + jumpUntilOutOfBounds(
      currentIndex,
      maze,
      numberOfStepsTaken
    )
  )

def maze =
  Source.fromFile("../../challengeInput.txt").getLines.map(_.toInt).toList

def currentIndex = 0

def numberOfStepsTaken = 0

def jumpUntilOutOfBounds(
    currentIndex: Int,
    maze: List[Int],
    numberOfStepsTaken: Int
): Int =
  if (currentIndex >= maze.length || currentIndex < 0) numberOfStepsTaken
  else
    val newIndex = currentIndex + maze(currentIndex)
    jumpUntilOutOfBounds(
      newIndex,
      maze.updated(currentIndex, maze(currentIndex) + 1),
      numberOfStepsTaken + 1
    )
