// Carbon doesn't have much string manipulation or a way to open files built
// out yet, so I'm using Deno to parse the input into a tuple of tuples that
// can cast into an array of arrays.
// Example input: "abc/ndef/nghi"
// Example output: `(("a", "b", "c", "X"...), ("d", "e", "f", "X"...), ("g", "h", "i", "X"...))`

export const parseInput = (async (): Promise<string> => {
  const input: string = await Deno.readTextFile("./challengeInput.txt");
  const inputArray: string[] = input.split("\n");
  let result = `(`;
  inputArray.forEach((line) => {
    result += `${parseLine(line)}, `;
  });
  result = result.slice(0, -2);
  result += `)`;
  console.log(result);
  Deno.writeTextFile("./parsedInput.txt", result);

  return result;
})();

const parseLine = (line: string): string => {
  // Carbon also doesn't allow tuple access by index yet, so I'm forcing every line
  // to be the same length by padding the ending with X's. This way, we can cast
  // the string to a fixed-length array.
  while (line.length < 200) {
    line += "X";
  }

  let parsedLine = `(`;
  const lineArray = line.split("");
  lineArray.forEach((char) => {
    parsedLine += `"${char}", `;
  });
  parsedLine = parsedLine.slice(0, -2);
  parsedLine += `)`;
  console.log(parsedLine);
  return parsedLine;
};
