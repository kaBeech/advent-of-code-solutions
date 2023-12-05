package ExplorerTest api;

// These sums were obtained from solvePart2_[0-9].carbon
let sums: [i32; 10] = (5215, 3820, 4779, 5827, 6021, 7579, 5708, 8170, 6889, 5787);

var totalSum: i32 = 0;


fn Main() -> i32 {
  for (sum: i32 in sums) {
    totalSum = totalSum + sum;
  }

  Print("Sum of all possible games: {0}", totalSum);
  return totalSum;
}