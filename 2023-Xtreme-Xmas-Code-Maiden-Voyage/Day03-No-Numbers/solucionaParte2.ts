import { analizaEntrada } from "./analizaEntrada.ts";
import { MapaDeBaldosas } from "./tipos.ts";

export const solucionaParte2 = (async (): Promise<number> => {
  const mapaDeBaldosas: MapaDeBaldosas = await analizaEntrada();
  let sumaDeNúmerosDePiezas = 0;

  mapaDeBaldosas.forEach((filaDaBolsados) => {
    filaDaBolsados.forEach((bolsado) => {
      if (bolsado.valor !== ("X" || ".")) {
        bolsado.agregadaALaSuma = false;
      }
    });
  });

  console.log(
    `Part 2: La suma de los números de piezas es ${sumaDeNúmerosDePiezas}`,
  );

  return sumaDeNúmerosDePiezas;
})();
