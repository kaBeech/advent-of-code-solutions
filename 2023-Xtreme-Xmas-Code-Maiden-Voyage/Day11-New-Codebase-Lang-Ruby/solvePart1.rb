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
    $verticallyExpandedMap.push(row)
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
    $flippedFullyExpandedMap.push(row)
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

# puts $map[1][7]