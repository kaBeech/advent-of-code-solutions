# Start Day 6

https://adventofcode.com/2023/day/6

## Pseudocode

D = Distance
T = Time
X = Milliseconds holding button
N = number of options to beat the best time

D = X • (T - X)
D = T • X - X^2
D = -(X^2) + T • X

<!-- This is a quadratic equation -->

0 = -(X^2) + T • X - D

<!-- Use the Quadratic Formula -->

X = (-T - Math.absolute(sqrt(T^2 - 4 • -1 • -D))) / 2 • -1

<!-- Calculate the number of options to beat the best time -->

N = T - (Math.floor(X) • 2) - 1

<!-- Calculate solution -->

Solution = N[1] • N[2] • N[3] • N[4]

## Solutions

N[1] = 30
N[2] = 51
N[3] = 42
N[4] = 22
