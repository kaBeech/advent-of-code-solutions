import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { BoilerplateConstructor } from "../BoilerplateConstructor.ts";

const testBoilerplateConstructor = BoilerplateConstructor(true);
const testBoilerplateConstructor2 = BoilerplateConstructor(false);

Deno.test("get functions work", () => {
  assertEquals(testBoilerplateConstructor.getModalBoolean(), true);
  assertEquals(testBoilerplateConstructor2.getModalBoolean(), false);
});

Deno.test("setVisibility sets visibility", () => {
  testBoilerplateConstructor.setModalBoolean(null);
  testBoilerplateConstructor2.setModalBoolean(true);
  assertEquals(testBoilerplateConstructor.getModalBoolean(), null);
  assertEquals(testBoilerplateConstructor2.getModalBoolean(), true);
});
