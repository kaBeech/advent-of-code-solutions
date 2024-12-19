<?php

function getChecksum(array $disk): int
{
    $checksum = 0;
    $i = 0;
    while ($i < count($disk)) {
        if (gettype($disk[$i]) == 'integer') {
            $checksum += $disk[$i] * $i;
        }
        $i++;
    }
    return $checksum;
}

function compactDiskNoFrag(array $disk): array
{
    $compactedDisk = $disk;
    $i = count($compactedDisk) - 1;
    while ($i > 0) {
        if (gettype($compactedDisk[$i]) != 'integer') {
            $i--;
        } else {
            [$compactedDisk, $i] = attemptSwap($compactedDisk, $i);
        }
    }
    return $compactedDisk;
}

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
