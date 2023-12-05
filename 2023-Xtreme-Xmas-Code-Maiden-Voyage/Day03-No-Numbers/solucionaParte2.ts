import { analizaEntrada } from "./analizaEntrada.ts";
import { MapaDeBaldosas } from "./tipos.ts";

export const solucionaParte2 = (async (): Promise<number> => {
  const mapaDeBaldosas: MapaDeBaldosas = await analizaEntrada();
  let sumaDeNúmerosDePiezas = 0;

  mapaDeBaldosas.forEach((filaDaBaldosa) => {
    filaDaBaldosa.forEach((baldosa) => {
      if (baldosa.valor !== ("X" || ".")) {
        // Hace nada
      } else if (baldosa.agregadaALaSuma === false) {
        const adyacenteAUnSímbolo = comprobaBaldosasAdyacentes(
          mapaDeBaldosas,
          baldosa,
        );
      }
    });
  });

  console.log(
    `Part 2: La suma de los números de piezas es ${sumaDeNúmerosDePiezas}`,
  );

  return sumaDeNúmerosDePiezas;
})();
