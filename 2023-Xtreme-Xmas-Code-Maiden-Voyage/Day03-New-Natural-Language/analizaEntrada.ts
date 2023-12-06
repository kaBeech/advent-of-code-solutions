import { converteArchivoDeVariasLíneasADobleFormación } from "./converteArchivoAFormación.ts";
import { Baldosa, MapaDeBaldosas, ValorDeBaldosa } from "./tipos.ts";

export const analizaEntrada = async (): Promise<MapaDeBaldosas> => {
  const mapaDeBaldosasCruda: string[][] =
    await converteArchivoDeVariasLíneasADobleFormación(
      `./entradaDelDesafío.txt`,
    );
  const mapaDeBaldosas: MapaDeBaldosas = [];
  mapaDeBaldosasCruda.forEach((filaDeMapaDeBaldosasCrudas, coordinadaY) => {
    const filaDeMapaDeBaldosas: Baldosa[] = [];
    filaDeMapaDeBaldosasCrudas.forEach((baldosaCruda, coordinadaX) => {
      let valor: ValorDeBaldosa;
      if (!Number.isNaN(+baldosaCruda)) {
        valor = +baldosaCruda;
      } else if (baldosaCruda === ".") {
        valor = ".";
      } else if (baldosaCruda === "*") {
        valor = "*";
      } else {
        valor = "X";
      }
      filaDeMapaDeBaldosas.push({
        valor,
        coordinadas: { x: coordinadaX, y: coordinadaY },
        agregadaALaSuma: false,
      });
    });
    mapaDeBaldosas.push(filaDeMapaDeBaldosas);
  });
  return mapaDeBaldosas;
};
