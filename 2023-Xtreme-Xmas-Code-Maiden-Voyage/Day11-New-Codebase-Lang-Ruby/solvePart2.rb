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

puts "Input parsed."

$emptyRows = Array.new
$i = 0
$map.each { |row|
  if row.all? { |c| c == '.'}
      $emptyRows.push($i)
  end
  $i += 1
}

puts "Empty Rows found."

$flippedMap = Array.new
$i = 0
while $i < $map[0].length do
  $flippedColumn = Array.new
  $map.each { |row|
    $flippedColumn.push(row[$i])
  }
  $flippedMap.push($flippedColumn)
  $i += 1
end

puts "Map flipped once."
$flippedMap.each { |row|
  puts row.join
}

$emptyColumns = Array.new
$i = 0
$flippedMap.each { |row|
  if row.all? { |c| c == '.'}
    $emptyColumns.push($i)
  end
  $i += 1
}

puts "Empty Columns found."

$galaxies = Array.new
$y = 0
$map.each { |row|
  $x = 0
  row.each { |c|
    if c == '#'
      $galaxies.push([$x, $y])
    end
    $x += 1
  }
  $y += 1
}

puts "Galaxies found."

$totalDistanceBetweenAllGalaxies = 0
$unprocessedGalaxies = $galaxies.dup
$galaxies.each { |galaxy|
  $unprocessedGalaxies.delete(galaxy)
  $unprocessedGalaxies.each { |unprocessedGalaxy|
    $yDistanceBetweenGalaxies = (galaxy[0] - unprocessedGalaxy[0]).abs
    $xDistanceBetweenGalaxies = (galaxy[1] - unprocessedGalaxy[1]).abs
    $emptyRows.each { |emptyRow|
      if galaxy[1] < emptyRow and unprocessedGalaxy[1] > emptyRow
        $yDistanceBetweenGalaxies += 99
      end
      if galaxy[1] > emptyRow and unprocessedGalaxy[1] < emptyRow
        $yDistanceBetweenGalaxies += 99
      end
    }
    $emptyColumns.each { |emptyColumn|
      if galaxy[0] < emptyColumn and unprocessedGalaxy[0] > emptyColumn
        $xDistanceBetweenGalaxies += 99
      end
      if galaxy[0] > emptyColumn and unprocessedGalaxy[0] < emptyColumn
        $xDistanceBetweenGalaxies += 99
      end
    }
    $distanceBetweenGalaxies = $yDistanceBetweenGalaxies + $xDistanceBetweenGalaxies
    $totalDistanceBetweenAllGalaxies += $distanceBetweenGalaxies
  }
}

puts "Part 2: The total distance between all galaxies is: " + $totalDistanceBetweenAllGalaxies.to_s