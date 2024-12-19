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

// TODO: Make sure this $disk arg isn't interfering with the global $disk variable
function compactDiskNoFrag(array $disk): array
{
    $compactedDisk = $disk
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
