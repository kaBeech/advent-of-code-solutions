# Start Day 6

https://adventofcode.com/2023/day/6

## Pseudocode

D = Distance
T = Time
X = Milliseconds holding button

D = X • (T - X)
D = T • X - X^2
D = -(X^2) + T • X

<!-- This is a quadratic equation -->

0 = -(X^2) + T • X - D

<!-- Use the Quadratic Formula -->

X = (-T +/- sqrt(T^2 - 4 • -1 • D)) / 2 • -1

<!-- Calculate solution -->

Solution = T - (X • 2)
