<?php

function scoreMap(array $trailMap): int
{
    $trailheads = [];
    $maxX = count($trailMap[0]) - 1;
    $maxY = count($trailMap) - 1;
    $x = 0;
    $y = 0;
    while ($y <= $maxY) {
        // echo "x: $x, y: $y elevation: " . $trailMap[$y][$x] . PHP_EOL;
        if ($trailMap[$y][$x][0] === 0) {
            [$trailMap, $returnedTrailheads] = getTrails($trailMap, $x, $y, $maxX, $maxY, -1, []);
            $trailheads = array_merge($trailheads, $returnedTrailheads);
        }
        $x++;
        if ($x > $maxX) {
            $x = 0;
            $y++;
        }
    }
    $uniqueTrailheads = array_unique($trailheads);
    $score = count($uniqueTrailheads);
    return $score;
}
