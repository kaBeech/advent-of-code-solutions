import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { Rope } from "../Rope.ts";

const rope = Rope(1);
const rope2 = Rope(1);

Deno.test("inital get functions work", () => {
  assertEquals(rope.getVisitedTailLocations(), []);
  assertEquals(rope2.getVisitedTailLocations(), []);
});

Deno.test(
  "handleMovementInstruction throws error on improperly-formatted input",
  () => {
    assertThrows(
      () => {
        rope.handleMovementInstruction("G 9");
      },
      `Invalid movement instruction received. Expected input: a string consisting of one of the letters "U", "D", "L", and "R", followed by a space, followed by an integer. Example: "U 9". Input received: "G 9"`,
    );
    assertThrows(
      () => {
        rope2.handleMovementInstruction("U, 9");
      },
      `Invalid movement instruction received. Expected input: a string consisting of one of the letters "U", "D", "L", and "R", followed by a space, followed by an integer. Example: "U 9". Input received: "U, 9"`,
    );
  },
);

Deno.test("handleMovementInstruction moves rope", () => {
  rope.handleMovementInstruction("U 9");
  rope2.handleMovementInstruction("R 8");
  assertEquals(rope.getVisitedTailLocations(), [
    "0,0",
    "0,1",
    "0,2",
    "0,3",
    "0,4",
    "0,5",
    "0,6",
    "0,7",
    "0,8",
  ]);
  assertEquals(rope2.getVisitedTailLocations(), [
    "0,0",
    "1,0",
    "2,0",
    "3,0",
    "4,0",
    "5,0",
    "6,0",
    "7,0",
  ]);
});
