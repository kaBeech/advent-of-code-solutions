<?php

function scoreMap(array $trailMap): int
{
    $score = 0;
    $maxX = count($trailMap[0]) - 1;
    $maxY = count($trailMap) - 1;
    $x = 0;
    $y = 0;
    while ($y <= $maxY) {
        if ($trailMap[$y][$x] === '0') {
            $score += scoreTrail($trailMap, $x, $y, 0, 0);
        }
        $x++;
        if ($x > $maxX) {
            $x = 0;
            $y++;
        }
    }
    return $score;
}
