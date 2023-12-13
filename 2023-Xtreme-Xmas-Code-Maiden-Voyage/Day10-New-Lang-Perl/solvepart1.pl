#!/usr/bin/perl
use v5.35;
use strict;
use warnings;

open(my $input,  "<",  "testInput.dat")  or die "Can't open testInput.dat: $!";

my @lines = <$input>;

print("Hello World\n");

print(@lines)