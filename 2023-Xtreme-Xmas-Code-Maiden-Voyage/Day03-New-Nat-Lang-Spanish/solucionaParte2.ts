import { analizaEntrada } from "./analizaEntrada.ts";
import { MapaDeBaldosas } from "./tipos.ts";
import obteneRelaciónesDeEngranajes from "./obteneRelaciónesDeEngranajes.ts";

export const solucionaParte2 = (async (): Promise<number> => {
  const mapaDeBaldosas: MapaDeBaldosas = await analizaEntrada();
  let sumaDeRelaciónesDeEngranajes = 0;

  mapaDeBaldosas.forEach((filaDeBaldosas) => {
    filaDeBaldosas.forEach((baldosa) => {
      if (baldosa.valor === "*") {
        sumaDeRelaciónesDeEngranajes += obteneRelaciónesDeEngranajes(
          mapaDeBaldosas,
          baldosa,
        );
      }
    });
  });

  console.log(
    `Part 2: La suma de los relaciónes de los engranajes es ${sumaDeRelaciónesDeEngranajes}`,
  );

  return sumaDeRelaciónesDeEngranajes;
})();
