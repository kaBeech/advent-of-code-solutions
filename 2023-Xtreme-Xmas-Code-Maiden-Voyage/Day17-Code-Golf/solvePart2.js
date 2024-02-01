import { Heap } from "npm:heap-js";

let gN = (cN, m) => {
  let ns = [];
  let { x, y } = cN.b.c;
  let n = cN.s > 3;
  let d = cN.d;

  y > 0 &&
    d !== "s" &&
    (d === "n" || n) &&
    ns.push({ b: m[y - 1][x], d: "n", s: 1, h: cN.h + m[y - 1][x].h });
  x < m[0].length - 1 &&
    d !== "w" &&
    (d === "e" || n) &&
    ns.push({ b: m[y][x + 1], d: "e", s: 1, h: cN.h + m[y][x + 1].h });
  y < m.length - 1 &&
    d !== "n" &&
    (d === "s" || n) &&
    ns.push({ b: m[y + 1][x], d: "s", s: 1, h: cN.h + m[y + 1][x].h });
  x > 0 &&
    d !== "e" &&
    (d === "w" || n) &&
    ns.push({ b: m[y][x - 1], d: "w", s: 1, h: cN.h + m[y][x - 1].h });

  let dN = ns.find((n) => n.d === d);
  dN && (dN.s = cN.s + 1);
  return ns;
};

let m = [];
let s = await Deno.readTextFile("./t.dat");
let a = [];
s.trimEnd()
  .split(/\n/)
  .forEach((l) => {
    a.push(l.split(""));
  });
let y = 0;
for (let rR of a) {
  let r = [];
  let x = 0;
  for (let rB of rR) {
    r.push({
      h: +rB,
      m: Infinity,
      c: { x, y },
    });
    x++;
  }
  m.push(r);
  y++;
}

export default () => {
  let f = m[m.length - 1][m[0].length - 1];
  let z = f.m;
  let v = new Map();
  let q = new Heap((a, b) => a.h - b.h);
  for (let n of gN({ b: m[0][1], d: "e", s: 1, h: m[0][1].h }, m)) {
    q.push(n);
  }
  while (q.length > 0) {
    let cN = q.pop();
    let { b, h, d, s } = cN;
    let { x, y } = b.c;
    let k = `${x}-${y}-${d}-${s}`;
    if (b === f) {
      z = Math.min(h, z);
      continue;
    }
    if (v.has(k) && v.get(k) <= h) continue;
    v.set(k, h);
    for (let nN of gN(cN, m)) {
      if (nN.s < 11 && nN.h < z) {
        nN.b.m = h + nN.b.h;
        q.push(nN);
      }
    }
  }

  return z;
};
