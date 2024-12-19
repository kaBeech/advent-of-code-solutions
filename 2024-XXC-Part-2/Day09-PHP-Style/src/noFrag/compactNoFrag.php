<?php

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
