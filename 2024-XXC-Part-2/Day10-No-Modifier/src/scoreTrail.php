<?php

function scoreTrail(
    array $trailMap,
    int $x,
    int $y,
    int $maxX,
    int $maxY,
    int $prevElevation,
    int $score
): int {
    if ($x < 0 || $x > $maxX || $y < 0 || $y > $maxY) {
        return 0;
    }
    $elevation = (int) $trailMap[$y][$x];
    if ($elevation !== $prevElevation + 1) {
        return 0;
    }
    if ($elevation === 9) {
        return 1;
    }
    return $score
        + scoreTrail($trailMap, $x, $y - 1, $maxX, $maxY, $elevation, $score)
        + scoreTrail($trailMap, $x + 1, $y, $maxX, $maxY, $elevation, $score)
        + scoreTrail($trailMap, $x, $y + 1, $maxX, $maxY, $elevation, $score)
        + scoreTrail($trailMap, $x - 1, $y, $maxX, $maxY, $elevation, $score);
}
