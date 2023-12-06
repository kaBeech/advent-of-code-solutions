import { analizaEntrada } from "./analizaEntrada.ts";
import comprobaBaldosasAdyacentes from "./comprobaBaldosasAdyacentes.ts";
import { MapaDeBaldosas } from "./tipos.ts";
import obteneNúmeroDePieza from "./obteneNúmeroDePieza.ts";

export const solucionaParte2 = (async (): Promise<number> => {
  const mapaDeBaldosas: MapaDeBaldosas = await analizaEntrada();
  let sumaDeRelaciónesDeEngranajes = 0;

  mapaDeBaldosas.forEach((filaDeBaldosas) => {
    filaDeBaldosas.forEach((baldosa) => {
      if (baldosa.valor !== "*") {
        // Hace nada
      } else if (baldosa.agregadaALaSuma === false) {
        const adyacenteAUnSímbolo = comprobaBaldosasAdyacentes(
          mapaDeBaldosas,
          baldosa,
        );
        if (adyacenteAUnSímbolo) {
          const númeroDePieza = obteneNúmeroDePieza(baldosa, filaDeBaldosas);
          sumaDeNúmerosDePiezas += númeroDePieza;
        }
      }
    });
  });

  console.log(
    `Part 2: La suma de los relaciónes de los engranajes es ${sumaDeRelaciónesDeEngranajes}`,
  );

  return sumaDeRelaciónesDeEngranajes;
})();
