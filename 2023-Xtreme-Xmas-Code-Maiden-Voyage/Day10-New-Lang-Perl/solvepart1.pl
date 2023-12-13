#!/usr/bin/perl
use v5.32;
use strict;
use warnings;

open(my $input,  "<",  "testInput.dat")  or die "Can't open testInput.dat: $!";

my @lines = <$input>;
my @values = ["|" , "-" , "7" , "F" , "J" , "L"];

print("Hello, World!\n");

print(@lines);

my $line = @lines[0];

print("\n");
print("\n");
my $nth = substr($line, 0, 1);
print($nth);