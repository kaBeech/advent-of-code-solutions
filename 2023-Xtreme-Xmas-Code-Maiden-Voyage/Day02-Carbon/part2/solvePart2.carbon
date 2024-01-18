package ExplorerTest api;

// Replace these numbers with the sums obtained from solvePart2_[0-9].carbon
let sums: [i32; 10] = (42, 0, 1, 143, 1337, 360, 24, 7, 365, 1234567890);

var totalSum: i32 = 0;


fn Main() -> i32 {
  for (sum: i32 in sums) {
    totalSum = totalSum + sum;
  }

  Print("Sum of all possible games: {0}", totalSum);
  return totalSum;
}