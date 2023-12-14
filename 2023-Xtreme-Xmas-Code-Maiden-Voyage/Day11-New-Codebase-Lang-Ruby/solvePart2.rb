$map = Array.new

File.foreach('testInput.dat') { |row|
  puts row
  
  $processedRow = Array.new
  row.each_char { |c|
    if c == '#' or c == '.'
      $processedRow.push(c)
    end
  }
  $map.push($processedRow)
}

$verticallyExpandedMap = Array.new
$map.each { |row|
  $verticallyExpandedMap.push(row)
  if row.all? { |c| c == '.'}
    3.times do
      $verticallyExpandedMap.push(row)
    end
  end
}

$flippedVerticallyExpandedMap = Array.new
$i = 0
while $i < $verticallyExpandedMap[0].length do
  $flippedColumn = Array.new
  $verticallyExpandedMap.each { |row|
    $flippedColumn.push(row[$i])
  }
  $flippedVerticallyExpandedMap.push($flippedColumn)
  $i += 1
end

$flippedFullyExpandedMap = Array.new
$flippedVerticallyExpandedMap.each { |row|
  $flippedFullyExpandedMap.push(row)
  if row.all? { |c| c == '.'}
    3.times do
      $flippedFullyExpandedMap.push(row)
    end
  end
}

$fullyExpandedMap = Array.new
$i = 0
while $i < $flippedFullyExpandedMap[0].length do
  $row = Array.new
  $flippedFullyExpandedMap.each { |flippedColumn|
    $row.push(flippedColumn[$i])
  }
  $fullyExpandedMap.push($row)
  $i += 1
end

$fullyExpandedMap.each { |row|
  puts row.join
}

$galaxies = Array.new
$y = 0
$fullyExpandedMap.each { |row|
  $x = 0
  row.each { |c|
    if c == '#'
      $galaxies.push([$x, $y])
    end
    $x += 1
  }
  $y += 1
}

$totalDistanceBetweenAllGalaxies = 0
$unprocessedGalaxies = $galaxies.dup
$galaxies.each { |galaxy|
  $unprocessedGalaxies.delete(galaxy)
  $unprocessedGalaxies.each { |unprocessedGalaxy|
    $distanceBetweenGalaxies = (galaxy[0] - unprocessedGalaxy[0]).abs + (galaxy[1] - unprocessedGalaxy[1]).abs
    $totalDistanceBetweenAllGalaxies += $distanceBetweenGalaxies
  }
}

puts $totalDistanceBetweenAllGalaxies