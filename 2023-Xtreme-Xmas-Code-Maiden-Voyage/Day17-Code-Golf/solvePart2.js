import { Heap } from "npm:heap-js";

const gN = (cN, m) => {
  const ns = [];
  const { x, y } = cN.b.c;
  const n = cN.s > 3;
  const d = cN.d;

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

  const dN = ns.find((n) => n.d === d);
  dN && (dN.s = cN.s + 1);
  return ns;
};

const m = [];
const s = await Deno.readTextFile("./i.dat");
const a = [];
s.trimEnd()
  .split(/\n/)
  .forEach((l) => {
    a.push(l.split(""));
  });
let y = 0;
for (const rR of a) {
  const r = [];
  let x = 0;
  for (const rB of rR) {
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
  const f = m[m.length - 1][m[0].length - 1];
  let z = f.m;
  const v = new Map();
  const q = new Heap((a, b) => a.h - b.h);
  q.push(
    {
      b: m[0][1],
      d: "e",
      s: 1,
      h: m[0][1].h,
    },
    {
      b: m[1][0],
      d: "s",
      s: 1,
      h: m[1][0].h,
    }
  );
  while (q.length > 0) {
    const cN = q.pop();
    const { b, h, d, s } = cN;
    const { x, y } = b.c;
    const k = `${x}-${y}-${d}-${s}`;
    if (b === f) {
      z = Math.min(h, z);
      continue;
    }
    if (v.has(k) && v.get(k) <= h) continue;
    v.set(k, h);
    for (const nN of gN(cN, m)) {
      if (nN.s < 11 && nN.h < z) {
        nN.b.m = h + nN.b.h;
        q.push(nN);
      }
    }
  }
  return z;
};
