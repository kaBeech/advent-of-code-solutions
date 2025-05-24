<?php

function getTrails(
    array $trailMap,
    int $x,
    int $y,
    int $maxX,
    int $maxY,
    int $prevElevation,
    ?array $trailheads
): array {
    if ($x < 0 || $x > $maxX || $y < 0 || $y > $maxY) {
        return 0;
    }
    [$elevation, $reachableTrailheads] = $trailMap[$y][$x];
    if ($elevation !== $prevElevation + 1) {
        return [$trailMap, []];
    }
    if ($elevation === 9) {
        return [$trailMap, [[$x, $y]]];
    }
    if (count($reachableTrailheads) > 0) {
        return [$trailMap, $reachableTrailheads];
    }+
    [$trailMap, $returnedTrailheads] = getTrails($trailMap, $x, $y - 1, $maxX, $maxY, $elevation, $score);
    $trailheads = array_merge($trailheads, $returnedTrailheads);
    [$trailMap, $returnedTrailheads] = getTrails($trailMap, $x + 1, $y, $maxX, $maxY, $elevation, $score);
    $trailheads = array_merge($trailheads, $returnedTrailheads);
    [$trailMap, $returnedTrailheads] = getTrails($trailMap, $x, $y + 1, $maxX, $maxY, $elevation, $score);
    $trailheads = array_merge($trailheads, $returnedTrailheads);
    [$trailMap, $returnedTrailheads] = getTrails($trailMap, $x - 1, $y, $maxX, $maxY, $elevation, $score);
    $trailheads = array_merge($trailheads, $returnedTrailheads);
    $trailMap[$y][$x][1] = $trailheads;
    return [$trailMap, $trailheads];
}
