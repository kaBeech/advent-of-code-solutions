export default function sortRow(row: string[]): string[] {
  return row.sort((a, b) => {
    return +a - +b;
  });
}
