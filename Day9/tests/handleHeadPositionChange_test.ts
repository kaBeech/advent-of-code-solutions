import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { handleHeadPositionChange } from "../handleHeadPositionChange.ts";
import { XYCoordinate } from "../../tools/commonTypes.ts";

const testCurrentPosition1: XYCoordinate = [0, 0];
const testCurrentPosition2: XYCoordinate = [24, -37];

Deno.test("input positions too far away throws error", () => {
  assertThrows(
    () => {
      handleHeadPositionChange(testCurrentPosition1, [-3, 0], 2);
    },
    `Head position is too far away from (i.e. not adjacent to) current tail position! Received currentTailPosition: [0, 0], headPosition: [-2, 0]`,
  );
  assertThrows(
    () => {
      handleHeadPositionChange(testCurrentPosition2, [23, -380], 2);
    },
    `Head position is too far away from (i.e. not adjacent to) current tail position! Received currentTailPosition: [24, -37], headPosition: [23, -380]`,
  );
});

Deno.test("close input positions result in no movement", () => {
  const result1 = handleHeadPositionChange(testCurrentPosition1, [0, 1], 2);
  const result2 = handleHeadPositionChange(testCurrentPosition2, [23, -38], 2);

  assertEquals(result1, testCurrentPosition1);
  assertEquals(result2, testCurrentPosition2);
});

Deno.test("orthagonal moves work", () => {
  const result1A = handleHeadPositionChange(testCurrentPosition1, [-2, 0], 2);
  const result1B = handleHeadPositionChange(testCurrentPosition1, [0, 2], 2);
  const result2A = handleHeadPositionChange(testCurrentPosition2, [26, -37], 2);
  const result2B = handleHeadPositionChange(testCurrentPosition2, [24, -39], 2);

  assertEquals(result1A, [-1, 0]);
  assertEquals(result1B, [0, 1]);
  assertEquals(result2A, [25, -37]);
  assertEquals(result2B, [24, -38]);
});

Deno.test("diagonal moves work", () => {
  const result1A = handleHeadPositionChange(testCurrentPosition1, [-2, -1], 2);
  const result1B = handleHeadPositionChange(testCurrentPosition1, [1, 2], 2);
  const result2A = handleHeadPositionChange(testCurrentPosition2, [26, -36], 2);
  const result2B = handleHeadPositionChange(testCurrentPosition2, [25, -39], 2);

  assertEquals(result1A, [-1, -1]);
  assertEquals(result1B, [1, 1]);
  assertEquals(result2A, [25, -36]);
  assertEquals(result2B, [25, -38]);
});
