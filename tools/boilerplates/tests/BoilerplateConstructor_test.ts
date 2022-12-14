import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { BoilerplateConstructor } from "../BoilerplateConstructor.ts";

const testBoilerplateConstructor = BoilerplateConstructor(true);
const testBoilerplateConstructor2 = BoilerplateConstructor(false);

Deno.test("get functions work", () => {
  assertEquals(true, testBoilerplateConstructor.getModalBoolean());
  assertEquals(false, testBoilerplateConstructor2.getModalBoolean());
});

Deno.test("setVisibility sets visibility", () => {
  testBoilerplateConstructor.setModalBoolean(null);
  testBoilerplateConstructor2.setModalBoolean(true);
  assertEquals(null, testBoilerplateConstructor.getModalBoolean());
  assertEquals(true, testBoilerplateConstructor2.getModalBoolean());
});
