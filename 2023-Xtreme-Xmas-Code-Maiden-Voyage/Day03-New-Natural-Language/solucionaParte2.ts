import { analizaEntrada } from "./analizaEntrada.ts";
import comprobaBaldosasAdyacentes from "./comprobaBaldosasAdyacentes.ts";
import { Baldosa, MapaDeBaldosas } from "./tipos.ts";

const obteneNúmeroDePieza = (baldoda: Baldosa, filaDeBaldosas): number => {

export const solucionaParte2 = (async (): Promise<number> => {
  const mapaDeBaldosas: MapaDeBaldosas = await analizaEntrada();
  let sumaDeNúmerosDePiezas = 0;

  mapaDeBaldosas.forEach((filaDeBaldosas) => {
    filaDeBaldosas.forEach((baldosa, índice) => {
      if (baldosa.valor !== ("X" || ".")) {
        // Hace nada
      } else if (baldosa.agregadaALaSuma === false) {
        const adyacenteAUnSímbolo = comprobaBaldosasAdyacentes(
          mapaDeBaldosas,
          baldosa,
        );
        if (adyacenteAUnSímbolo) {
          let númeroDePieza = `${baldosa.valor}`;
          if (!isNaN(+filaDeBaldosas[índice - 1])) {
            númeroDePieza = `${filaDeBaldosas[índice - 1].valor}` +
              númeroDePieza;
          }
        }
      }
    });
  });

  console.log(
    `Part 2: La suma de los números de piezas es ${sumaDeNúmerosDePiezas}`,
  );

  return sumaDeNúmerosDePiezas;
})();
