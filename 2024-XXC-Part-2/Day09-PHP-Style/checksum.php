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
