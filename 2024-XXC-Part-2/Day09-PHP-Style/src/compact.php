<?php

function compactDisk(array $disk): array
{
    $compactedDisk = [];
    $i = 0;
    while ($i < count($disk)) {
        if ($disk[$i] == '.') {
            while (end($disk) == '.' && $i < count($disk)) {
                array_pop($disk);
            }
            $compactedDisk[] = (int) array_pop($disk);
        } else {
            $compactedDisk[] = (int) $disk[$i];
        }
            $i++;
    }
    return $compactedDisk;
}
