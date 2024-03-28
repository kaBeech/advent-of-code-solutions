import { Baldosa, MapaDeBaldosas } from "./tipos.ts";

export default function (
  mapaDeBaldosas: MapaDeBaldosas,
  baldosa: Baldosa,
  buscandoDeNúmerosDePiezas?: boolean,
): boolean {
  let baldosaEstaAdyacenteAUnSímbolo = false;
  let baldosaEstaAdyacenteAUnNúmero = false;
  mapaDeBaldosas.forEach((filaDeBaldosas) => {
    filaDeBaldosas.forEach((baldosaComprobada) => {
      const baldosaComprobadaEstaAdyacenteALaBaldosa =
        Math.abs(baldosaComprobada.coordinadas.x - baldosa.coordinadas.x) <=
          1 &&
        Math.abs(baldosaComprobada.coordinadas.y - baldosa.coordinadas.y) <=
          1;
      if (baldosaComprobadaEstaAdyacenteALaBaldosa) {
        if (
          baldosaComprobada.valor === ("X" || "*")
        ) {
          baldosaEstaAdyacenteAUnSímbolo = true;
        }
        if (
          !isNaN(+baldosaComprobada.valor)
        ) {
          baldosaEstaAdyacenteAUnNúmero = true;
        }
      }
    });
  });

  if (buscandoDeNúmerosDePiezas) {
    return baldosaEstaAdyacenteAUnNúmero;
  } else {
    return baldosaEstaAdyacenteAUnSímbolo;
  }
}
