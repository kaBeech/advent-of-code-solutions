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

$i = 0
$expandedMap = Array.new
$map.each { |row|
  $expandedMap.push(row)
  if row.all? { |c| c == '.'}
    $expandedMap.push(row)
  end
}

$expandedMap.each { |row|
  puts row.join
}

# puts $map[1][7]