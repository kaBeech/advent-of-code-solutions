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
  List(0, 3, 0, 1, -3)

def currentIndex = 0

def numberOfStepsTaken = 0

def jumpUntilOutOfBounds(
    currentIndex: Int,
    maze: List[Int],
    numberOfStepsTaken: Int
): Int =
  if (currentIndex >= maze.length || currentIndex < 0) numberOfStepsTaken
  else if (maze(currentIndex) >= 3)
    val newIndex = currentIndex + maze(currentIndex)
    jumpUntilOutOfBounds(
      newIndex,
      maze.updated(currentIndex, maze(currentIndex) - 1),
      numberOfStepsTaken + 1
    )
  else
    val newIndex = currentIndex + maze(currentIndex)
    jumpUntilOutOfBounds(
      newIndex,
      maze.updated(currentIndex, maze(currentIndex) + 1),
      numberOfStepsTaken + 1
    )
