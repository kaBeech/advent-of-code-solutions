
<?php

include 'src/parse.php';
include 'src/scoreMap.php';
include 'src/scoreTrail.php';

echo 'Part 1: What is the sum of the scores of all trailheads on your topographic map? Answer: ' .
        scoreMap(
            parseInput(
                // file_get_contents('challenge_input.dat')
                    file_get_contents('test_input.dat')
            )
    ) . PHP_EOL;
