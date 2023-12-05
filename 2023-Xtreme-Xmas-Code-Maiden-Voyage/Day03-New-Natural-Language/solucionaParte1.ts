import { analizaEntrada } from "./analizaEntrada.ts";
import comprobaBaldosasAdyacentes from "./comprobaBaldosasAdyacentes.ts";
import { Baldosa, MapaDeBaldosas } from "./tipos.ts";

const obteneNúmeroDePieza = (
  baldosa: Baldosa,
  filaDeBaldosas: Baldosa[],
): number => {
  let baldosaAnterior = filaDeBaldosas[baldosa.coordinadas.x - 1];
  let baldosaSiguiente = filaDeBaldosas[baldosa.coordinadas.x + 1];
  let númeroDePieza = `${baldosa.valor}`;
  while (!isNaN(+baldosaAnterior)) {
    númeroDePieza = `${baldosaAnterior.valor}` +
      númeroDePieza;
    baldosaAnterior = filaDeBaldosas[baldosaAnterior.coordinadas.x - 1];
  }
  while (!isNaN(+baldosaSiguiente)) {
    númeroDePieza = númeroDePieza +
      `${baldosaSiguiente.valor}`;
    baldosaSiguiente = filaDeBaldosas[baldosaSiguiente.coordinadas.x + 1];
  }
  return +númeroDePieza;
};

export const solucionaParte1 = (async (): Promise<number> => {
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
