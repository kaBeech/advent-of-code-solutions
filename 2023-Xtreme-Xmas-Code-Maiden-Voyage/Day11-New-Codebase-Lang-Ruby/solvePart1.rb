$map = Array.new

File.foreach('challengeInput.dat') { 
  |row|
  puts row
  
  $processedRow = Array.new
  row.each_char { |c|
    $processedRow.push(c)
  }
  $map.push($processedRow)
}

# puts $map[1][7]