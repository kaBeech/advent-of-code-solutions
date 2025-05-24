<?php

function parseInput(string $input): array
{
    $trailMap = [];
    $lines = explode("\n", $input);
    foreach ($lines as $line) {
        $chars = str_split($line);
        $row = [];
        foreach ($chars as $char) {
            // [elevation, [trailheads reachable from this tile]]
            $row[] = [(int) $char, []];
        }
        $trailMap[] = $row;
    }
    return $trailMap;
}
