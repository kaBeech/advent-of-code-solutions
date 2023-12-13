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

print(@rows);

# Find the starting tile
my $i = 0;
foreach (@rows) {
    if (index($_, "S") != -1) {
        $startingTile{"coordinates"} = [index($_, "S"), $i];
    }
    $i += 1;
}

print("\n");
print("\n");
my $testTile = substr($rows[$startingTile{"coordinates"}[1]], $startingTile{"coordinates"}[0], 1);
print($testTile);

