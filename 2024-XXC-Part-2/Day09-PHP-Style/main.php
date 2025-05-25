<?php

// Uses the PSR-12: Extended Coding Style guide available at
// https://www.php-fig.org/psr/psr-12/

include 'src/parse.php';
include 'src/compact.php';
include 'src/checksum.php';
include 'src/noFrag/compactNoFrag.php';
include 'src/noFrag/attemptSwap.php';
include 'src/noFrag/freeSpace.php';
include 'src/noFrag/swap.php';

echo 'Part 1: What is the resulting filesystem checksum? Answer: ' .
    getChecksum(
        compactDisk(
            parseInput(
                // file_get_contents('challenge_input.dat')
                file_get_contents('test_input.dat')
            )
        )
    ) . PHP_EOL;

echo 'Part 2: What is the resulting filesystem checksum? Answer: ' .
    getChecksum(
        compactDiskNoFrag(
            parseInput(
                // file_get_contents('challenge_input.dat')
                file_get_contents('test_input.dat')
            )
        )
    ) . PHP_EOL;
