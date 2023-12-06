interface CoordinadasXY {
  x: number;
  y: number;
}

export type ValorDeBaldosa = number | "X" | "." | "*";

export interface Baldosa {
  valor: ValorDeBaldosa;
  coordinadas: CoordinadasXY;
  agregadaALaSuma: boolean;
}

export type MapaDeBaldosas = Baldosa[][];
