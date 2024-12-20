<?php

function parseInput(string $input): array
{
    $trailMap = [];
    $lines = explode("\n", $input);
    foreach ($lines as $line) {
        $chars = str_split($line);
        foreach ($chars as $char) {
            // [elevation, [trailheads reachable from this tile]]
            $trailMap[] = [(int) $char, []];
        }
    }
    return $trailMap;
}
