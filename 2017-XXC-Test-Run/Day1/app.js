import { p1 } from "./p1.js";
import { p2 } from "./p2.js";

export const app = (async () => {
  const s1 = await p1("ci.txt");
  const s2 = await p2("ci.txt");

  return {
    s1,
    s2,
  };
})();
