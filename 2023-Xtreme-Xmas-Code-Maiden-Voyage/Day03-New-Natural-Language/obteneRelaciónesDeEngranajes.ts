import { Baldosa, MapaDeBaldosas } from "./tipos.ts";
import obteneNúmeroDePieza from "./obteneNúmeroDePieza.ts";

export default function (
  mapaDeBaldosas: MapaDeBaldosas,
  baldosa: Baldosa,
): number {
  let númerosAdyacentes = 0;
  let relacióneDeEngranajes = 1;
  mapaDeBaldosas.forEach((filaDeBaldosas) => {
    filaDeBaldosas.forEach((baldosaComprobada) => {
      const baldosaComprobadaEstaAdyacenteALaBaldosa =
        Math.abs(baldosaComprobada.coordinadas.x - baldosa.coordinadas.x) <=
          1 &&
        Math.abs(baldosaComprobada.coordinadas.y - baldosa.coordinadas.y) <=
          1;
      if (
        baldosaComprobadaEstaAdyacenteALaBaldosa &&
        !baldosaComprobada.agregadaALaSuma
      ) {
        númerosAdyacentes++;
        relacióneDeEngranajes *= obteneNúmeroDePieza(
          baldosaComprobada,
          filaDeBaldosas,
        );
      }
    });
  });

  console.log(relacióneDeEngranajes);

  if (númerosAdyacentes === 2) {
    return relacióneDeEngranajes;
  } else {
    return 0;
  }
}
