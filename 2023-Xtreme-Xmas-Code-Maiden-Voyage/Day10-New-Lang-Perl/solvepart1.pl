#!/usr/bin/perl
use v5.32;
use strict;
use warnings;

open(my $input,  "<",  "testInput.dat")  or die "Can't open testInput.dat: $!";

my @values = ["|" , "-" , "7" , "F" , "J" , "L"];
my @directions = ["^" , ">" , "v" , "<"];
my @rows = <$input>;
my %startingTile = (
    coordinates => [0,0],
    value => "S",
);
my @possibleStartingTileValues = ["|" , "-" , "7" , "F" , "J" , "L"];

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
sub checkNeighbor {
    for (@_) {
        if ($neighborTileValue eq $_) {
            print("\n", $neighborTileValue);
        }
    }
}
checkNeighbor( "|" , "7" , "F");
$neighborTileValue = substr($rows[$startingY], $startingX + 1, 1);
checkNeighbor( "-" , "7" , "J");
$neighborTileValue = substr($rows[$startingY + 1], $startingX, 1);
checkNeighbor( "|" , "J" , "L");
$neighborTileValue = substr($rows[$startingY], $startingX - 1, 1);
checkNeighbor( "-" , "F" , "L");

print("\n");
print("\n");
my $testTile = substr($rows[$startingTile{"coordinates"}[1]], $startingTile{"coordinates"}[0], 1);
print($testTile);

