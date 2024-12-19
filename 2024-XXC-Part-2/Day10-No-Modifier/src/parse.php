<?php

function parseInput(string $input): array
{
    $trailMap = [];
    $lines = explode("\n", $input);
    foreach ($lines as $line) {
        $trailMap[] = str_split($line);
    }
    return $trailMap;
}
