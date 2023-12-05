// Carbon doesn't have much string manipulation or a way to open files built
// out yet, so I'm using Deno to parse the input into a tuple of tuples.
// Example input: "abc/ndef/nghi"
// Example output: `(("a", "b", "c"), ("d", "e", "f"), ("g", "h", "i"))`

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

// Parse the raw string into a pseudo-array
// Example input: `abcde`
// Example output: `("a", "b", "c", "d", "e")`
const parseLine = (line: string): string => {
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
