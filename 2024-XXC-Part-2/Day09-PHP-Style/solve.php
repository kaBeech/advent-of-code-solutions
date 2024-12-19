<?php
// Uses the PSR-12: Extended Coding Style guide available at
// https://www.php-fig.org/psr/psr-12/

$testInput = file_get_contents('test_input.dat');
$challengeInput = file_get_contents('challenge_input.dat');

// $disk = parseInput($challengeInput);
$disk = parseInput($testInput);
$diskCopy = $disk;

$compactedDisk1 = compactDisk($disk);

$checksum1 = getChecksum($compactedDisk1);

echo 'Part 1: What is the resulting filesystem checksum? Answer: ' . $checksum1 . PHP_EOL;

$compactedDisk2 = compactDiskNoFrag($diskCopy);

$checksum2 = getChecksum($compactedDisk2);

echo 'Part 2: What is the resulting filesystem checksum? Answer: ' . $checksum2 . PHP_EOL;

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

function compactDisk(array $disk): array
{
    $compactedDisk = [];
    $i = 0;
    while ($i < count($disk)) {
        if ($disk[$i] == '.') {
            while (end($disk) == '.' && $i < count($disk)) {
                array_pop($disk);
            }
            $compactedDisk[] = (integer) array_pop($disk);
        } else {
            $compactedDisk[] = (integer) $disk[$i];
        }
            $i++;
    }
    return $compactedDisk;
}

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

// TODO: Make sure this $disk arg isn't interfering with the global $disk variable
function compactDiskNoFrag(array $disk): array
{
    $compactedDisk = $disk;
    $i = count($compactedDisk) - 1;
    while ($i > 0) {
        if ($compactedDisk[$i] == '.') {
            $i--;
        } else {
            // TODO: Make sure this destructuring works how I think it does
            [$compactedDisk, $i] = attemptSwap($compactedDisk, $i);
        }
    }
    return $compactedDisk;
}

function attemptSwap(array $disk, int $fileEnd): array
{
    $fileID = $disk[$fileEnd];
    $fileStart = $fileEnd;
    while ($disk[$fileStart] == $fileID) {
        $fileStart--;
    }
    $fileStart++;
    $fileSize = $fileEnd - $fileStart + 1;
    $freeSpaceStart = findFreeSpace($disk, $fileStart, $fileSize);
    if ($freeSpaceStart < 0) {
        return $disk;
    } else {
        return swap($disk, $fileStart, $fileSize, $freeSpaceStart);
    }
}


function findFreeSpace(array $disk, int $fileStart, int $fileSize): int
{
    $i = 0;
    while ($i < $fileStart) {
        if ($disk[$i] == '.' && $i + $fileSize < $fileStart) {
            $j = 1;
            while ($j < $fileSize) {
                if ($disk[$i + $j] != '.') {
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

function swap(array $disk, int $fileStart, int $fileSize, int $freeSpaceStart): array
{
    $left = array_slice($disk, 0, $fileStart);
    $swap1 = array_slice($disk, $freeSpaceStart, $fileSize);
    $middleStart = $fileStart + $fileSize;
    $middle = array_slice($disk, $middleStart, $freeSpaceStart - $middleStart);
    $swap2 = array_slice($disk, $fileStart, $fileSize);
    $right = array_slice($disk, $freeSpaceStart + $fileSize);
    return array_merge($left, $swap2, $middle, $swap1, $right);
}
