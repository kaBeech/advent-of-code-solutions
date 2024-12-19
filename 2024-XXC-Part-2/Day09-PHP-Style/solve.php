<?php

function findFreeSpace(array $disk, int $fileStart, int $fileSize): int
{
    $i = 0;
    while ($i + $fileSize <= $fileStart) {
        assert($i >= 0);
        if (gettype($disk[$i]) != 'integer') {
            $j = 1;
            while ($j < $fileSize) {
                if (gettype($disk[$i + $j]) == 'integer') {
                    break;
                }
                $j++;
            }
            if ($j == $fileSize) {
                return $i;
            }
        }
        $i++;
    }
    return -1;
}

function swap(
    array $disk,
    int $fileStart,
    int $fileSize,
    int $freeSpaceStart
): array {
    $left = array_slice($disk, 0, $freeSpaceStart);
    $swap1 = array_slice($disk, $freeSpaceStart, $fileSize);
    $middleStart = $freeSpaceStart + $fileSize;
    $middle = array_slice($disk, $middleStart, $fileStart - $middleStart);
    $swap2 = array_slice($disk, $fileStart, $fileSize);
    $right = array_slice($disk, $fileStart + $fileSize);
    $swappedDisk = array_merge($left, $swap2, $middle, $swap1, $right);
    return $swappedDisk;
}
