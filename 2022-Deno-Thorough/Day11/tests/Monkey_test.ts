import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { testMonkeys, testMonkeysPart2 } from "./testMonkeys.ts";

Deno.test("getTotalItemsInspected returns 0 for each monkey", () => {
  testMonkeys.forEach((monkey) => {
    assertEquals(monkey.getTotalItemsInspected(), 0);
  });
});

Deno.test("Receiving item adds it to itemsByWorryLevel", () => {
  assertEquals(testMonkeys[3].receiveThrownItem(5n), 5n);
});

Deno.test("inspectItems returns correct items and destinations using numeric operand", () => {
  assertEquals(testMonkeys[0].inspectItems(testMonkeys, 96577), [
    { itemByWorryLevel: 500n, destination: 3 },
    { itemByWorryLevel: 620n, destination: 3 },
  ]);
});

Deno.test("inspectItems returns correct items and destinations when sorting and using 'old' operand", () => {
  assertEquals(testMonkeys[2].inspectItems(testMonkeys, 96577), [
    { itemByWorryLevel: 2080n, destination: 1 },
    { itemByWorryLevel: 1200n, destination: 3 },
    { itemByWorryLevel: 3136n, destination: 3 },
  ]);
});

Deno.test("inspectItems returns correct items and destinations during extraWorrying conditions", () => {
  assertEquals(testMonkeysPart2[0].inspectItems(testMonkeysPart2, 96577), [
    { itemByWorryLevel: 1501n, destination: 3 },
    { itemByWorryLevel: 1862n, destination: 3 },
  ]);

  assertEquals(testMonkeysPart2[2].inspectItems(testMonkeysPart2, 96577), [
    { itemByWorryLevel: 6241n, destination: 3 },
    { itemByWorryLevel: 3600n, destination: 3 },
    { itemByWorryLevel: 9409n, destination: 3 },
  ]);
});
