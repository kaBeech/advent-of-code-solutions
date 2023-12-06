import { analizaEntrada } from "./analizaEntrada.ts";
import comprobaBaldosasAdyacentes from "./comprobaBaldosasAdyacentes.ts";
import { MapaDeBaldosas } from "./tipos.ts";
import obteneNúmeroDePieza from "./obteneNúmeroDePieza.ts";

export const solucionaParte1 = (async (): Promise<number> => {
  const mapaDeBaldosas: MapaDeBaldosas = await analizaEntrada();
  let sumaDeNúmerosDePiezas = 0;

  mapaDeBaldosas.forEach((filaDeBaldosas) => {
    filaDeBaldosas.forEach((baldosa) => {
      if (isNaN(+baldosa.valor)) {
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
    `Part 2: La suma de los números de piezas es ${sumaDeNúmerosDePiezas}`,
  );

  return sumaDeNúmerosDePiezas;
})();
