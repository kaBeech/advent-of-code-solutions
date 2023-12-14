#!/usr/bin/perl
use v5.32;
use strict;
use warnings;
use Switch;

open(my $input,  "<",  "testInput.dat")  or die "Can't open testInput.dat: $!";

my @values = ["|" , "-" , "7" , "F" , "J" , "L"];
my @directions = ["^" , ">" , "v" , "<"];
my @rows = <$input>;
my %startingTile = (
    coordinates => [0,0],
    value => "S",
);
my $currentDirection = "^";
my $currentTileValue = "S";
my $currentCoordinates = [0,0];
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

    print(substr($rows[$startingTile{"coordinates"}[1] - 1], $startingTile{"coordinates"}[0], 1));

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
            print("\nTEST", $neighborTileValue, $currentDirection);
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
$currentCoordinates = $startingTile{"coordinates"};

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

print("\n");
print("\n");
print("\n");
print($startingTile{"value"});
print("\n");
print($currentDirection);
# my $test = $possibleStartingTileValues[2];
# print($test); 
my $testTile = substr($rows[$startingTile{"coordinates"}[1]], $startingTile{"coordinates"}[0], 1);
print($testTile);

