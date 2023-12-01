export default function (
  possibleInteger: string,
): boolean {
  if (isNaN(+possibleInteger)) {
    return false;
  } else {
    return true;
  }
}
