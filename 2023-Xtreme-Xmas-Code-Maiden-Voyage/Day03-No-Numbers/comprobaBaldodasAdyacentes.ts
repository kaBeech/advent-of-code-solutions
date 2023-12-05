import { Baldosa, MapaDeBaldosas } from "./tipos.ts";

export default function (
  mapaDeBaldosas: MapaDeBaldosas,
  baldosa: Baldosa,
): boolean {
  let baldosaEstaAdyacenteAUnSímbolo = false;
  while (!baldosaEstaAdyacenteAUnSímbolo) {
    mapaDeBaldosas.forEach((filaDaBaldosa) => {
      filaDaBaldosa.forEach((baldosaComprobada) => {
        if (
          Math.abs(baldosaComprobada.coordinadas.x - baldosa.coordinadas.x) <=
            1 &&
          Math.abs(baldosaComprobada.coordinadas.y - baldosa.coordinadas.y) <=
            1 &&
          baldosaComprobada.valor === ("X")
        ) {
          baldosaEstaAdyacenteAUnSímbolo = true;
        }
      });
    });
  }

  return baldosaEstaAdyacenteAUnSímbolo;
}
