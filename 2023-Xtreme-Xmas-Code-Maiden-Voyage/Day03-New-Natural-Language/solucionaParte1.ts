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
  while (!isNaN(+baldosaAnterior.valor)) {
    númeroDePieza = `${baldosaAnterior.valor}` +
      númeroDePieza;
    if (filaDeBaldosas[baldosaAnterior.coordinadas.x - 1]) {
      baldosaAnterior = filaDeBaldosas[baldosaAnterior.coordinadas.x - 1];
    } else {
      baldosaAnterior.valor = ".";
    }
  }
  while (!isNaN(+baldosaSiguiente.valor)) {
    númeroDePieza = númeroDePieza +
      `${baldosaSiguiente.valor}`;
    if (filaDeBaldosas[baldosaSiguiente.coordinadas.x + 1]) {
      baldosaSiguiente = filaDeBaldosas[baldosaSiguiente.coordinadas.x + 1];
    } else {
      baldosaSiguiente.valor = ".";
    }
  }
  console.log(`Part 2: La pieza es ${númeroDePieza}`);
  return +númeroDePieza;
};

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
