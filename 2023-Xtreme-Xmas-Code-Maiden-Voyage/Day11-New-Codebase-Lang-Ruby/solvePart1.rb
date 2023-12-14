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

$verticallyExpandedMap.each { |row|
  puts row.join
}

# puts $map[1][7]