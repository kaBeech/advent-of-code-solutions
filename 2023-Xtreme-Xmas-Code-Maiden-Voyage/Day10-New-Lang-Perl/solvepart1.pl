#!/usr/bin/perl
use v5.32;
use strict;
use warnings;

open(my $input,  "<",  "testInput.dat")  or die "Can't open testInput.dat: $!";

my @values = ["|" , "-" , "7" , "F" , "J" , "L"];
my @directions = ["^" , ">" , "v" , "<"];
my @lines = <$input>;
my %startingTile = (
    coordinates => [0,0],
    value => "S",
);

print("Hello, World!\n");

print(@lines);

# Find the starting tile
my $i = 0;
foreach (@lines) {
    if (index($_, "S") != -1) {
        $startingTile{"coordinates"} = [index($_, "S"), $i];
    }
    $i += 1;
}

print("\n");
print("\n");
my $testTile = substr($lines[$startingTile{"coordinates"}[1]], $startingTile{"coordinates"}[0], 1);
print($testTile);

