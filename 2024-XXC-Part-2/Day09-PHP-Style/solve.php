<?php
// Uses the PSR-12: Extended Coding Style guide available at
// https://www.php-fig.org/psr/psr-12/

$testInput = file_get_contents('test_input.dat');
$challengeInput = file_get_contents('challenge_input.dat');

$disk = parseInput($testInput);

$compactedDisk = compactDisk($disk);

$checksum = getChecksum($compactedDisk);

echo 'Part 1: What is the resulting filesystem checksum? Answer: ' . $checksum . PHP_EOL;
