const a = (await Deno.readTextFile("ci.txt")).split("");
export const p1 = (() => {
  let r;
  let s = 0;
  a.forEach((c) => {
    r === c ? (s += +c) : (r = c);
  });
  a[0] === a[a.length - 1] && (s += +a[0]);
  return {
    s,
  };
})();
