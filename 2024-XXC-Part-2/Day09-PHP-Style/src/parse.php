<?php

function parseInput(string $input): array
{
    $segments = str_split($input);
    $disk = [];
    $i = 0;
    $freeSpace = False;
    foreach ($segments as $segment) {
        $size = (int) $segment;
        while ($size > 0) {
            if ($freeSpace) {
                $disk[] = '.';
            } else {
                $disk[] = $i;
            }
            $size--;
        }
        $freeSpace = !$freeSpace;
        if ($freeSpace) {
            $i++;
        }
    }
    return $disk;
}
