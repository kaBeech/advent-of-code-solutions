#!/usr/bin/perl
use v5.32;
use strict;
use warnings;
use Switch;

open(my $input,  "<",  "challengeInput.dat")  or die "Can't open challengeInput.dat: $!";

my @values = ["|" , "-" , "7" , "F" , "J" , "L"];
my @directions = ["^" , ">" , "v" , "<"];
my @rows = <$input>;
my $loopLength = 0;
my %startingTile = (
    coordinates => [0,0],
    value => "S",
);
my $currentDirection = "^";
my $currentTileValue = "S";
my @currentCoordinates = [0,0];
my @possibleStartingTileValues = ("|" , "-" , "7" , "F" , "J" , "L");

print("Hello, World!\n");

print(@rows, "\n");

# Find the starting tile
my $i = 0;
foreach (@rows) {
    if (index($_, "S") != -1) {
        $startingTile{"coordinates"} = [index($_, "S"), $i];
    }
    $i += 1;
}


# Find the starting tile's value
my $startingX = $startingTile{"coordinates"}[0];
my $startingY = $startingTile{"coordinates"}[1];
my $neighborTileValue = substr($rows[$startingY - 1], $startingX, 1);


sub removeImpossibleStartingValues {
    for (@_) {
        my $index = 0;
        my $count = scalar @possibleStartingTileValues;
        $index++ until $possibleStartingTileValues[$index] eq $_ or $index==$count;
        splice(@possibleStartingTileValues, $index, 1);
    }
}

sub checkNeighbor {
    for (@_) {
        if ($neighborTileValue eq $_) {
            switch ($currentDirection) {
                case "^" {
                    removeImpossibleStartingValues("-", "F", "7");
                }
                case ">" {
                    removeImpossibleStartingValues("|", "J", "7");
                }
                case "v" {
                    removeImpossibleStartingValues("-", "J", "L");
                }
                case "<" {
                    removeImpossibleStartingValues("|", "F", "L");
                }
            }
        }
    }
}
checkNeighbor( "|" , "7" , "F");

$currentDirection = ">";
$neighborTileValue = substr($rows[$startingY], $startingX + 1, 1);
checkNeighbor( "-" , "7" , "J");

$currentDirection = "v";
$neighborTileValue = substr($rows[$startingY + 1], $startingX, 1);
checkNeighbor( "|" , "J" , "L");

$currentDirection = "<";
$neighborTileValue = substr($rows[$startingY], $startingX - 1, 1);
checkNeighbor( "-" , "F" , "L");

$startingTile{"value"} = $possibleStartingTileValues[0];
$currentTileValue = $startingTile{"value"};
$currentCoordinates[0][0] = $startingTile{"coordinates"}[0];
$currentCoordinates[0][1] = $startingTile{"coordinates"}[1];

# Set starting direction
sub setCurrentDirection {
    switch ($currentTileValue) {
        case "|" {
            if ($currentDirection eq "^") {
                $currentDirection = "^"
            } else {
                $currentDirection = "v"
            }
        }
        case "F" {
            if ($currentDirection eq "^") {
                $currentDirection = ">"
            } else {
                $currentDirection = "v"
            }
        }
        case "-" {
            if ($currentDirection eq ">") {
                $currentDirection = ">"
            } else {
                $currentDirection = "<"
            }
        }
        case "7" {
            if ($currentDirection eq "^") {
                $currentDirection = "<"
            } else {
                $currentDirection = "v"
            }
        }
        case "J" {
            if ($currentDirection eq ">") {
                $currentDirection = "^"
            } else {
                $currentDirection = "<"
            }
        }
        case "L" {
            if ($currentDirection eq "<") {
                $currentDirection = "^"
            } else {
                $currentDirection = ">"
            }
        }
    }
}

setCurrentDirection();

sub moveAlongLoop {
    switch ($currentDirection) {
        case "^" {
            $currentCoordinates[0][1] -= 1;
        }
        case ">" {
            $currentCoordinates[0][0] += 1;
        }
        case "v" {
            $currentCoordinates[0][1] += 1;
        }
        case "<" {
            $currentCoordinates[0][0] -= 1;
        }
    }
    $currentTileValue = substr($rows[$currentCoordinates[0][1]], $currentCoordinates[0][0], 1);
    if ($currentTileValue eq "S") {
        $currentTileValue = $startingTile{"value"};
    }
    setCurrentDirection();
}

my %loopTiles = (
    $loopLength => {
        x => $currentCoordinates[0][0],
        y => $currentCoordinates[0][1],
        value => $currentTileValue,
    }
);

until ($currentCoordinates[0][0] == $startingTile{"coordinates"}[0] and $currentCoordinates[0][1] == $startingTile{"coordinates"}[1] and $loopLength > 0) {
    moveAlongLoop();
    $loopLength += 1;
    $loopTiles{$loopLength} = {
        x => $currentCoordinates[0][0],
        y => $currentCoordinates[0][1],
        value => $currentTileValue,
    }
}

print($loopTiles{0}{"value"}, "\n");

# Find tiles inside the loop
my $tilesInsideLoop = 0;
my $numberOfBordersCrossed = 0;
my $borderEncounteredFromSouth = 0;
my $borderEncounteredFromNorth = 0;
my $i = 0;

sub processSouthgoingBorderTile {
    if ($borderEncounteredFromSouth) {
        $borderEncounteredFromSouth = 0;
    } else {
        $borderEncounteredFromSouth = 1;
    }
    if ($borderEncounteredFromNorth) {
        $numberOfBordersCrossed += 1;
        $borderEncounteredFromNorth = 0;
        $borderEncounteredFromSouth = 0;
    }
}

sub processNorthgoingBorderTile {
    if ($borderEncounteredFromNorth) {
        $borderEncounteredFromNorth = 0;
    } else {
        $borderEncounteredFromNorth = 1;
    }
    if ($borderEncounteredFromSouth) {
        $numberOfBordersCrossed += 1;
        $borderEncounteredFromNorth = 0;
        $borderEncounteredFromSouth = 0;
    }
}

sub findLoopTileKey {
    my ($x, $y) = @_;

    for my $key (keys %loopTiles) {
        if ($loopTiles{$key}{x} == $x && $loopTiles{$key}{y} == $y) {
            return $key;
        }
    }

    return undef;
}


foreach (@rows) {
    print($i, "   ", $tilesInsideLoop, "\n");
    for (my $j = 0; $j < length($_); $j++) {
        my $currentLoopTileKey = findLoopTileKey($j, $i);
        if (!$currentLoopTileKey) {
            if ($numberOfBordersCrossed % 2 == 1) {
                $tilesInsideLoop += 1;
            }
        } else {
            switch ($loopTiles{$currentLoopTileKey}{"value"}) {
                case "|" {
                    $numberOfBordersCrossed += 1;
                }
                case "-" {
                    # Do nothing
                }
                case "7" {
                    processSouthgoingBorderTile();
                }
                case "F" {
                    processSouthgoingBorderTile();
                }
                case "J" {
                    processNorthgoingBorderTile();
                }
                case "L" {
                    processNorthgoingBorderTile();
                }
            }
        }
    }
    $i += 1;
}

print("\nPart 2: The number of tiles inside the loop is: ", $tilesInsideLoop) 

