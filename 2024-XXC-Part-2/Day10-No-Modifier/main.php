
<?php

include 'src/parse.php';
include 'src/scoreMap.php';

echo 'Part 1: What is the sum of the scores of all trailheads on your topographic map? Answer: ' .
    parseInput(
        // file_get_contents('challenge_input.dat')
        scoreMap(
            file_get_contents('test_input.dat')
        )
    ) . PHP_EOL;
