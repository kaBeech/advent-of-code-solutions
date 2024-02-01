import { Heap } from "npm:heap-js";

const gN = (cN, m) => {
  const ns = [];
  const { x, y } = cN.b.coordinates;
  const min = cN.s > 3;
  const d = cN.d;

  if (y > 0 && d !== "s" && (d === "n" || min)) {
    ns.push({
      b: m[y - 1][x],
      d: "n",
      s: 1,
      h: cN.h + m[y - 1][x].heatLoss,
    });
  }
  if (x < m[0].length - 1 && d !== "w" && (d === "e" || min)) {
    ns.push({
      b: m[y][x + 1],
      d: "e",
      s: 1,
      h: cN.h + m[y][x + 1].heatLoss,
    });
  }
  if (y < m.length - 1 && d !== "n" && (d === "s" || min)) {
    ns.push({
      b: m[y + 1][x],
      d: "s",
      s: 1,
      h: cN.h + m[y + 1][x].heatLoss,
    });
  }
  if (x > 0 && d !== "e" && (d === "w" || min)) {
    ns.push({
      b: m[y][x - 1],
      d: "w",
      s: 1,
      h: cN.h + m[y][x - 1].heatLoss,
    });
  }

  const dN = ns.find((n) => n.d === d);

  if (dN) {
    dN.s = cN.s + 1;
  }

  return ns;
};

const m = [];
const s = await Deno.readTextFile("./t.dat");
const a = [];
s.trimEnd()
  .split(/\n/)
  .forEach((l) => {
    a.push(l.split(""));
  });
let y = 0;

for (const rawCityRow of a) {
  const cityRow = [];
  let x = 0;
  for (const rawCityBlock of rawCityRow) {
    cityRow.push({
      heatLoss: +rawCityBlock,
      minimumRouteHeatLoss: Infinity,
      coordinates: { x, y },
    });
    x++;
  }
  m.push(cityRow);
  y++;
}

export default (function () {
  const fac = m[m.length - 1][m[0].length - 1];
  let end = fac.minimumRouteHeatLoss;
  const v = new Map();
  const nodesToVisit = new Heap((a, b) => a.h - b.h);
  nodesToVisit.push(
    {
      b: m[0][1],
      d: "e",
      s: 1,
      h: m[0][1].heatLoss,
    },
    {
      b: m[1][0],
      d: "s",
      s: 1,
      h: m[1][0].heatLoss,
    }
  );

  while (nodesToVisit.length > 0) {
    const currentNode = nodesToVisit.pop();
    const { b, h, d, s } = currentNode;
    const { x, y } = b.coordinates;

    if (b === fac) {
      if (h < end) {
        fac.finalNode = currentNode;
      }
      end = Math.min(h, end);
      continue;
    }

    const cacheKey = `${x}-${y}-${d}-${s}`;
    if (v.has(cacheKey) && v.get(cacheKey) <= h) {
      continue;
    }
    v.set(cacheKey, h);

    const neighbors = gN(currentNode, m);

    for (const neighborNode of neighbors) {
      if (neighborNode.s < 11 && neighborNode.h < end) {
        const nBlock = neighborNode.b;
        if (nBlock === fac) {
          nBlock.finalNode = currentNode;
        }
        nBlock.minimumRouteHeatLoss = h + nBlock.heatLoss;
        nodesToVisit.push(neighborNode);
      }
    }
  }

  console.log(`Part 2: The lowest possible heat loss is ${end}.`);

  return end;
})();
