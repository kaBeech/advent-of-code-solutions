const a = (await Deno.readTextFile("ci.txt")).split("");
export const p2 = (() => {
  let r;
  let s = 0;
  const l = a.length / 2;
  a.forEach((c, i) => {
    r = a[(i + l) % a.length];
    r === c && (s += +c);
  });
  return {
    s,
  };
})();
