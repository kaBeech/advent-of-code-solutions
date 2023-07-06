import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { testMonkeys, testMonkeysPart2 } from "./testMonkeys.ts";

Deno.test("getTotalItemsInspected returns 0 for each monkey", () => {
  testMonkeys.forEach((monkey) => {
    assertEquals(monkey.getTotalItemsInspected(), 0);
  });
});

Deno.test("Receiving item adds it to itemsByWorryLevel", () => {
  assertEquals(testMonkeys[3].receiveThrownItem(5), 5);
});

Deno.test("inspectItems returns correct items and destinations using numeric operand", () => {
  assertEquals(testMonkeys[0].inspectItems(testMonkeys, 96577), [
    { itemByWorryLevel: 500, destination: 3 },
    { itemByWorryLevel: 620, destination: 3 },
  ]);
});

Deno.test("inspectItems returns correct items and destinations when sorting and using 'old' operand", () => {
  assertEquals(testMonkeys[2].inspectItems(testMonkeys, 96577), [
    { itemByWorryLevel: 2080, destination: 1 },
    { itemByWorryLevel: 1200, destination: 3 },
    { itemByWorryLevel: 3136, destination: 3 },
  ]);
});

Deno.test("inspectItems returns correct items and destinations during extraWorrying conditions", () => {
  assertEquals(testMonkeysPart2[0].inspectItems(testMonkeysPart2, 96577), [
    { itemByWorryLevel: 1501, destination: 3 },
    { itemByWorryLevel: 1862, destination: 3 },
  ]);

  assertEquals(testMonkeysPart2[2].inspectItems(testMonkeysPart2, 96577), [
    { itemByWorryLevel: 6241, destination: 3 },
    { itemByWorryLevel: 3600, destination: 3 },
    { itemByWorryLevel: 9409, destination: 3 },
  ]);
});
