import { Heap } from "npm:heap-js";

const gN = (cN, m) => {
  const ns = [];
  const { x, y } = cN.block.coordinates;
  const min = cN.consecutiveStepsInSameDirection > 3;
  const d = cN.direction;

  if (y > 0 && d !== "s" && (d === "n" || min)) {
    ns.push({
      block: m[y - 1][x],
      direction: "n",
      consecutiveStepsInSameDirection: 1,
      routeHeatLoss: cN.routeHeatLoss + m[y - 1][x].heatLoss,
    });
  }
  if (x < m[0].length - 1 && d !== "w" && (d === "e" || min)) {
    ns.push({
      block: m[y][x + 1],
      direction: "e",
      consecutiveStepsInSameDirection: 1,
      routeHeatLoss: cN.routeHeatLoss + m[y][x + 1].heatLoss,
    });
  }
  if (y < m.length - 1 && d !== "n" && (d === "s" || min)) {
    ns.push({
      block: m[y + 1][x],
      direction: "s",
      consecutiveStepsInSameDirection: 1,
      routeHeatLoss: cN.routeHeatLoss + m[y + 1][x].heatLoss,
    });
  }
  if (x > 0 && d !== "e" && (d === "w" || min)) {
    ns.push({
      block: m[y][x - 1],
      direction: "w",
      consecutiveStepsInSameDirection: 1,
      routeHeatLoss: cN.routeHeatLoss + m[y][x - 1].heatLoss,
    });
  }

  const dN = ns.find((n) => n.direction === d);

  if (dN) {
    dN.consecutiveStepsInSameDirection = cN.consecutiveStepsInSameDirection + 1;
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
  const visited = new Map();
  const nodesToVisit = new Heap((a, b) => a.routeHeatLoss - b.routeHeatLoss);
  nodesToVisit.push(
    {
      block: m[0][1],
      direction: "e",
      consecutiveStepsInSameDirection: 1,
      routeHeatLoss: m[0][1].heatLoss,
    },
    {
      block: m[1][0],
      direction: "s",
      consecutiveStepsInSameDirection: 1,
      routeHeatLoss: m[1][0].heatLoss,
    }
  );

  while (nodesToVisit.length > 0) {
    const currentNode = nodesToVisit.pop();
    const { block, routeHeatLoss, direction, consecutiveStepsInSameDirection } =
      currentNode;
    const { x, y } = block.coordinates;

    if (block === fac) {
      if (routeHeatLoss < end) {
        fac.finalNode = currentNode;
      }
      end = Math.min(routeHeatLoss, end);
      continue;
    }

    const cacheKey = `${x}-${y}-${direction}-${consecutiveStepsInSameDirection}`;
    if (visited.has(cacheKey) && visited.get(cacheKey) <= routeHeatLoss) {
      continue;
    }
    visited.set(cacheKey, routeHeatLoss);

    const neighbors = gN(currentNode, m);

    for (const neighborNode of neighbors) {
      if (
        neighborNode.consecutiveStepsInSameDirection < 11 &&
        neighborNode.routeHeatLoss < end
      ) {
        const nBlock = neighborNode.block;
        if (nBlock === fac) {
          nBlock.finalNode = currentNode;
        }
        nBlock.minimumRouteHeatLoss = routeHeatLoss + nBlock.heatLoss;
        nodesToVisit.push(neighborNode);
      }
    }
  }

  console.log(`Part 2: The lowest possible heat loss is ${end}.`);

  return end;
})();
