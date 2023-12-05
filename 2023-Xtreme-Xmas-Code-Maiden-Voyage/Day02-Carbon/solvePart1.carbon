package ExplorerTest api;

// These sums were gotten from solvePart1_[0-9].carbon
let sums: [i32; 10] = (43, 82, 178, 208, 236, 223, 387, 452, 431, 377);

var totalSum: i32 = 0;


fn Main() -> i32 {
  for (sum: i32 in sums) {
    totalSum = totalSum + sum;
  }

  Print("Sum of all possible games: {0}", totalSum);
  return totalSum;
}