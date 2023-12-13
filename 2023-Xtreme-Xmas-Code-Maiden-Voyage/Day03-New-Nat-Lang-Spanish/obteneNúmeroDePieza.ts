import { Baldosa } from "./tipos.ts";

export default function (baldosa: Baldosa, filaDeBaldosas: Baldosa[]): number {
  let baldosaAnterior = filaDeBaldosas[baldosa.coordinadas.x - 1];
  let baldosaSiguiente = filaDeBaldosas[baldosa.coordinadas.x + 1];
  let númeroDePieza = `${baldosa.valor}`;
  while (!isNaN(+baldosaAnterior.valor)) {
    númeroDePieza = `${baldosaAnterior.valor}` +
      númeroDePieza;
    baldosaAnterior.agregadaALaSuma = true;
    if (filaDeBaldosas[baldosaAnterior.coordinadas.x - 1]) {
      baldosaAnterior = filaDeBaldosas[baldosaAnterior.coordinadas.x - 1];
    } else {
      break;
    }
  }
  while (!isNaN(+baldosaSiguiente.valor)) {
    númeroDePieza = númeroDePieza +
      `${baldosaSiguiente.valor}`;
    baldosaSiguiente.agregadaALaSuma = true;
    if (filaDeBaldosas[baldosaSiguiente.coordinadas.x + 1]) {
      baldosaSiguiente = filaDeBaldosas[baldosaSiguiente.coordinadas.x + 1];
    } else {
      break;
    }
  }
  return +númeroDePieza;
}
