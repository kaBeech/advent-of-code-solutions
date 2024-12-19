<?php

// Uses the PSR-12: Extended Coding Style guide available at
// https://www.php-fig.org/psr/psr-12/

include 'attemptSwap.php';
include 'checksum.php';
include 'compact.php';
include 'compactNoFrag.php';
include 'freeSpace.php';
include 'parse.php';
include 'solve.php';

echo 'Part 1: What is the resulting filesystem checksum? Answer: ' . 
    getChecksum(compactDisk(parseInput(
        file_get_contents('challenge_input.dat')
    ))) . PHP_EOL;

echo 'Part 2: What is the resulting filesystem checksum? Answer: ' . 
    getChecksum(compactDiskNoFrag(parseInput(
        file_get_contents('challenge_input.dat'))
    )) . PHP_EOL;
