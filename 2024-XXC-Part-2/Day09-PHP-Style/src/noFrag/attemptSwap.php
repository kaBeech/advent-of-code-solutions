<?php

function attemptSwap(array $disk, int $fileEnd): array
{
    $fileID = $disk[$fileEnd];
    $fileStart = $fileEnd;
    while ($fileStart >= 0 && $disk[$fileStart] == $fileID) {
        $fileStart--;
    }
    $fileStart++;
    $fileSize = $fileEnd - $fileStart + 1;
    $freeSpaceStart = findFreeSpace($disk, $fileStart, $fileSize);
    if ($freeSpaceStart < 0) {
        return [$disk, $fileStart - 1];
    } else {
        return [
            swap($disk, $fileStart, $fileSize, $freeSpaceStart),
            $fileStart - 1
        ];
    }
}
