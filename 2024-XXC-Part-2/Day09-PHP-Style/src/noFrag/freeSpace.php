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
